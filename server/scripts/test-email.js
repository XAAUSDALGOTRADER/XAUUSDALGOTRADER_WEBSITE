import { emailService } from '../lib/emailService.js';
import { config } from 'dotenv';
import path from 'path';

// Load environment variables
config({ path: path.resolve(process.cwd(), '.env') });

async function testEmail() {
  try {
    console.log('🧪 Testing OAuth 2.0 email service...\n');

    // Check required environment variables
    const requiredVars = [
      'GMAIL_CLIENT_ID',
      'GMAIL_CLIENT_SECRET', 
      'GMAIL_REFRESH_TOKEN',
      'GMAIL_ACCESS_TOKEN',
      'FROM_EMAIL'
    ];

    for (const varName of requiredVars) {
      if (!process.env[varName]) {
        throw new Error(`Missing environment variable: ${varName}`);
      }
    }

    console.log('✅ All required environment variables are set');
    console.log('📧 From email:', process.env.FROM_EMAIL);
    console.log('🔑 Client ID:', process.env.GMAIL_CLIENT_ID ? 'Set' : 'Missing');
    console.log('🔒 Refresh token:', process.env.GMAIL_REFRESH_TOKEN ? 'Set' : 'Missing');
    console.log('🎫 Access token:', process.env.GMAIL_ACCESS_TOKEN ? 'Set' : 'Missing');

    const result = await emailService.sendEmail(
      process.env.FROM_EMAIL, // Send to yourself for testing
      'Test Email from XAU/USD Algo Trader (OAuth 2.0)',
      `
        <h1>Test Email ✅</h1>
        <p>This is a test email from your XAU/USD Algo Trader platform using OAuth 2.0.</p>
        <p>If you received this, your OAuth 2.0 setup is working correctly!</p>
        <p><strong>Time sent:</strong> ${new Date().toLocaleString()}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">
          This is an automated test message. Please do not reply.
        </p>
      `
    );
    
    console.log('\n🎉 Test email sent successfully using OAuth 2.0!');
    
  } catch (error) {
    console.error('\n💥 Test email failed:', error.message);
    
    if (error.message.includes('invalid_grant')) {
      console.log('\n🔑 The refresh token might be invalid or expired.');
      console.log('   Try running: npm run setup-oauth');
    }
    
    process.exit(1);
  }
}

testEmail();