import express from 'express';
import { emailQueue } from '../lib/emailQueue.js';

const router = express.Router();

router.post('/premium-request', async (req, res) => {
  try {
    const {
      toolName,
      fileName,
      brokerCode,
      brokerName,
      accountType,
      tradingExperience,
      specificRequirements,
      requestedAt
    } = req.body;

    // Validation
    if (!toolName || !brokerCode || !brokerName || !accountType || !tradingExperience) {
      return res.status(400).json({ error: 'All required fields must be filled' });
    }

    // Email to admin
    const adminEmailHtml = `
      <h2>New Premium Tool Request</h2>
      <p><strong>Tool:</strong> ${toolName} (${fileName})</p>
      <p><strong>Broker Code:</strong> ${brokerCode}</p>
      <p><strong>Broker Name:</strong> ${brokerName}</p>
      <p><strong>Account Type:</strong> ${accountType}</p>
      <p><strong>Trading Experience:</strong> ${tradingExperience}</p>
      <p><strong>Specific Requirements:</strong> ${specificRequirements || 'None'}</p>
      <p><strong>Requested At:</strong> ${new Date(requestedAt).toLocaleString()}</p>
      <hr>
      <p>Please contact the user to proceed with the premium tool setup.</p>
    `;

    await emailQueue.addToQueue({
      to: process.env.ADMIN_EMAIL || 'xauusdalgotrader@gmail.com',
      subject: `Premium Tool Request: ${toolName}`,
      html: adminEmailHtml
    });

    // Confirmation email to user
    const userEmailHtml = `
      <h2>Thank You for Your Premium Tool Request!</h2>
      <p>Dear Valued Trader,</p>
      <p>We've received your request for <strong>${toolName}</strong> and our team is reviewing it.</p>
      
      <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
        <h3>Request Details:</h3>
        <p><strong>Tool:</strong> ${toolName}</p>
        <p><strong>Broker:</strong> ${brokerName} (${brokerCode})</p>
        <p><strong>Account Type:</strong> ${accountType}</p>
        <p><strong>Experience:</strong> ${tradingExperience}</p>
        ${specificRequirements ? `<p><strong>Your Requirements:</strong> ${specificRequirements}</p>` : ''}
      </div>

      <p>Our support team will contact you within 24 hours to discuss your requirements and proceed with the setup.</p>
      
      <p>Thank you for choosing XAU/USD Algo Trader!</p>
      <p><strong>Happy Trading! 📈</strong></p>
    `;

    await emailQueue.addToQueue({
      to: req.user?.email || 'user@example.com', // In real implementation, get from auth
      subject: `Premium Tool Request Received: ${toolName}`,
      html: userEmailHtml
    });

    res.json({ message: 'Premium tool request submitted successfully' });

  } catch (error) {
    console.error('Premium request error:', error);
    res.status(500).json({ error: 'Failed to process premium request' });
  }
});

export default router;