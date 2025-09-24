import express from 'express';
import { emailQueue } from '../lib/emailQueue.js';
import { contactFormEmail } from '../emails/templates.js';

const router = express.Router();

router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, message, type } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
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

    // Add to email queue
    await emailQueue.addToQueue({
      to: process.env.ADMIN_EMAIL || 'xauusdalgotrader@gmail.com', // Send to admin
      subject: `New Contact Form: ${name}`,
      html: adminEmailHtml
    });

    // Optional: Send confirmation email to user
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

    res.json({ message: 'Message sent successfully' });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

export default router;