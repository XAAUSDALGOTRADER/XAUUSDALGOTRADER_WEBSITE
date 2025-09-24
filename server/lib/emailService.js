import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { config } from 'dotenv';
import path from 'path';

// Load environment variables
config({ path: path.resolve(process.cwd(), '.env') });

const OAuth2 = google.auth.OAuth2;

class EmailService {
  constructor() {
    this.transporter = null;
    this.oauth2Client = null;
    this.initializeOAuth2();
  }

  initializeOAuth2() {
    try {
      if (!process.env.GMAIL_CLIENT_ID || !process.env.GMAIL_CLIENT_SECRET) {
        throw new Error('Gmail OAuth2 credentials not configured');
      }

      this.oauth2Client = new OAuth2(
        process.env.GMAIL_CLIENT_ID,
        process.env.GMAIL_CLIENT_SECRET,
        'https://developers.google.com/oauthplayground'
      );

      // Set credentials if we have them
      if (process.env.GMAIL_REFRESH_TOKEN) {
        this.oauth2Client.setCredentials({
          refresh_token: process.env.GMAIL_REFRESH_TOKEN,
          access_token: process.env.GMAIL_ACCESS_TOKEN,
        });
      }

      console.log('✅ OAuth2 client initialized');

    } catch (error) {
      console.error('Failed to initialize OAuth2:', error);
    }
  }

  async getAccessToken() {
    try {
      if (!this.oauth2Client) {
        throw new Error('OAuth2 client not initialized');
      }

      const { token } = await this.oauth2Client.getAccessToken();
      return token;

    } catch (error) {
      console.error('Error getting access token:', error);
      throw error;
    }
  }

  async createTransporter() {
    try {
      const accessToken = await this.getAccessToken();
      
      return nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.FROM_EMAIL,
          clientId: process.env.GMAIL_CLIENT_ID,
          clientSecret: process.env.GMAIL_CLIENT_SECRET,
          refreshToken: process.env.GMAIL_REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });
    } catch (error) {
      console.error('Failed to create transporter:', error);
      throw error;
    }
  }

  async sendEmail(to, subject, html, text = null) {
    try {
      if (!this.transporter) {
        this.transporter = await this.createTransporter();
      }

      const mailOptions = {
        from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
        to: Array.isArray(to) ? to.join(', ') : to,
        subject: subject,
        html: html,
        text: text || this.htmlToText(html),
      };

      console.log('📧 Attempting to send email to:', to);
      const info = await this.transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully!');
      console.log('📨 Message ID:', info.messageId);
      return info;

    } catch (error) {
      console.error('❌ Email sending failed:', error.message);
      
      // If token is expired, try to refresh and resend
      if (error.code === 'EAUTH' && process.env.GMAIL_REFRESH_TOKEN) {
        console.log('🔄 Token might be expired, attempting refresh...');
        try {
          // Force token refresh
          this.oauth2Client.setCredentials({
            refresh_token: process.env.GMAIL_REFRESH_TOKEN
          });
          const newToken = await this.getAccessToken();
          
          // Update environment variable
          process.env.GMAIL_ACCESS_TOKEN = newToken;
          
          // Recreate transporter with new token
          this.transporter = await this.createTransporter();
          
          // Retry sending
          return this.sendEmail(to, subject, html, text);
        } catch (refreshError) {
          console.error('Failed to refresh token:', refreshError);
        }
      }
      
      throw error;
    }
  }

  htmlToText(html) {
    return html
      .replace(/<style[^>]*>.*<\/style>/gms, '')
      .replace(/<[^>]*>/g, '')
      .replace(/\n{2,}/g, '\n')
      .replace(/[ \t]{2,}/g, ' ')
      .trim();
  }
}

export const emailService = new EmailService();