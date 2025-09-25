import { createServiceRoleClient } from '../../../server/lib/supabase-server.js';
import jwt from 'jsonwebtoken';
import { emailQueue } from '../server/lib/emailQueue.js';

export default async function handler(req, res) {
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
    const { plan, message, contactPreference, token } = req.body;

    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!plan) {
      return res.status(400).json({ error: 'Plan selection is required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const supabase = createServiceRoleClient();

    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.status !== 'approved') {
      return res.status(403).json({ 
        error: 'Your account must be approved before requesting premium services' 
      });
    }

    const { data, error } = await supabase
      .from('premium_requests')
      .insert([
        {
          user_id: userId,
          plan: plan.trim(),
          message: message ? message.trim() : null,
          contact_preference: contactPreference || 'email',
          status: 'pending',
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Premium request error:', error);
      return res.status(500).json({ error: 'Failed to process premium request' });
    }

    // Send notification to admin
    const adminEmailHtml = `
      <h2>New Premium Plan Request</h2>
      <p><strong>User:</strong> ${user.name}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Plan:</strong> ${plan}</p>
      <p><strong>Contact Preference:</strong> ${contactPreference || 'email'}</p>
      <p><strong>Message:</strong> ${message || 'No additional message'}</p>
      <p><strong>Requested:</strong> ${new Date().toLocaleString()}</p>
    `;

    await emailQueue.addToQueue({
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `Premium Plan Request: ${plan} - ${user.name}`,
      html: adminEmailHtml
    });

    // Send confirmation to user
    const userEmailHtml = `
      <h2>Premium Plan Request Received</h2>
      <p>Dear ${user.name},</p>
      <p>Thank you for your interest in our <strong>${plan} Plan</strong>.</p>
      <p>We have received your request and will contact you within 24 hours to discuss the details.</p>
      ${message ? `<p><strong>Your message:</strong> ${message}</p>` : ''}
      <p><strong>Preferred contact method:</strong> ${contactPreference || 'email'}</p>
      <hr>
      <p>We look forward to helping you enhance your trading experience!</p>
    `;

    await emailQueue.addToQueue({
      to: user.email,
      subject: `Premium ${plan} Plan Request Received`,
      html: userEmailHtml
    });

    res.status(200).json({ 
      message: 'Premium plan request submitted successfully. We will contact you soon.',
      requestId: data.id
    });

  } catch (error) {
    console.error('Premium request error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid authentication token' });
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
}