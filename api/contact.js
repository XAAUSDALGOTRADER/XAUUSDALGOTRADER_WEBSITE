import { emailQueue } from '../server/lib/emailQueue.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'https://xauusdalgotrader.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Email content for admin notification
    const adminEmailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
      <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
    `;

    await emailQueue.addToQueue({
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `New Contact Form: ${name}`,
      html: adminEmailHtml
    });

    // Send confirmation email to user
    const userEmailHtml = `
      <h2>Thank you for contacting XAU/USD Algo Trader!</h2>
      <p>Dear ${name},</p>
      <p>We've received your message and will get back to you within 24 hours.</p>
      <p><strong>Your message:</strong></p>
      <p>${message}</p>
      <hr>
      <p><em>This is an automated message. Please do not reply.</em></p>
    `;

    await emailQueue.addToQueue({
      to: email,
      subject: 'Thank you for contacting XAU/USD Algo Trader',
      html: userEmailHtml
    });

    res.status(200).json({ message: 'Message sent successfully' });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
}