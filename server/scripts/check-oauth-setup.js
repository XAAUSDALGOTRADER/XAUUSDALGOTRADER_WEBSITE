import { google } from 'googleapis';
import { config } from 'dotenv';
import path from 'path';

config({ path: path.resolve(process.cwd(), '.env') });

async function checkOAuthSetup() {
  console.log('🔍 Checking OAuth 2.0 Setup...\n');

  // Check environment variables
  console.log('📋 Environment Variables:');
  console.log('GMAIL_CLIENT_ID:', process.env.GMAIL_CLIENT_ID ? '✅ Set' : '❌ Missing');
  console.log('GMAIL_CLIENT_SECRET:', process.env.GMAIL_CLIENT_SECRET ? '✅ Set' : '❌ Missing');
  console.log('GMAIL_REFRESH_TOKEN:', process.env.GMAIL_REFRESH_TOKEN ? '✅ Set' : '❌ Missing');
  console.log('GMAIL_ACCESS_TOKEN:', process.env.GMAIL_ACCESS_TOKEN ? '✅ Set' : '❌ Missing');
  console.log('FROM_EMAIL:', process.env.FROM_EMAIL ? '✅ Set' : '❌ Missing');
  console.log('');

  if (!process.env.GMAIL_CLIENT_ID || !process.env.GMAIL_CLIENT_SECRET) {
    console.log('❌ Please set GMAIL_CLIENT_ID and GMAIL_CLIENT_SECRET in your .env file');
    return;
  }

  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      'https://developers.google.com/oauthplayground'
    );

    if (process.env.GMAIL_REFRESH_TOKEN) {
      oauth2Client.setCredentials({
        refresh_token: process.env.GMAIL_REFRESH_TOKEN
      });

      console.log('🔄 Testing token refresh...');
      const token = await oauth2Client.getAccessToken();
      console.log('✅ Token refresh successful:', token ? 'Yes' : 'No');
    }

    console.log('\n🎯 Next Steps:');
    console.log('1. Go to: https://console.cloud.google.com/');
    console.log('2. Select your project');
    console.log('3. Ensure Gmail API is enabled');
    console.log('4. Configure OAuth consent screen properly');
    console.log('5. Add your email as a test user');
    console.log('6. Use correct redirect URI: https://developers.google.com/oauthplayground');

  } catch (error) {
    console.error('❌ Setup check failed:', error.message);
    
    if (error.message.includes('invalid_grant')) {
      console.log('\n🔑 The refresh token is invalid. You need to:');
      console.log('1. Run: npm run setup-oauth');
      console.log('2. Get a new authorization code');
    }
  }
}

checkOAuthSetup();