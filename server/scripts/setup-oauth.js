import { google } from 'googleapis';
import readline from 'readline';
import { config } from 'dotenv';
import { writeFile } from 'fs/promises';
import path from 'path';

// Load environment variables
config({ path: path.resolve(process.cwd(), '.env') });

const OAuth2 = google.auth.OAuth2;
const SCOPES = ['https://mail.google.com/'];

async function setupOAuth() {
  try {
    console.log('🔧 Setting up Gmail OAuth 2.0...\n');

    // Check if client ID and secret are set
    if (!process.env.GMAIL_CLIENT_ID || !process.env.GMAIL_CLIENT_SECRET) {
      throw new Error('Please set GMAIL_CLIENT_ID and GMAIL_CLIENT_SECRET in your .env file first');
    }

    const oauth2Client = new OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      'https://developers.google.com/oauthplayground'
    );

    // Generate auth URL
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
      prompt: 'consent' // Force consent to get refresh token
    });

    console.log('🔗 Authorize this app by visiting this URL:');
    console.log(authUrl);
    console.log('\n');

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const code = await new Promise((resolve) => {
      rl.question('📋 Enter the authorization code from the page: ', (answer) => {
        rl.close();
        resolve(answer);
      });
    });

    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    
    console.log('\n✅ OAuth 2.0 Setup Complete!');
    console.log('\n📝 Add these to your .env file:');
    console.log(`GMAIL_REFRESH_TOKEN=${tokens.refresh_token}`);
    console.log(`GMAIL_ACCESS_TOKEN=${tokens.access_token}`);
    
    // Update .env file
    const envPath = path.resolve(process.cwd(), '.env');
    let envContent = '';
    
    try {
      const fs = await import('fs/promises');
      envContent = await fs.readFile(envPath, 'utf8');
    } catch (error) {
      console.log('Creating new .env file...');
    }

    // Remove existing tokens
    envContent = envContent
      .replace(/GMAIL_REFRESH_TOKEN=.*\n/g, '')
      .replace(/GMAIL_ACCESS_TOKEN=.*\n/g, '');

    // Add new tokens
    envContent += `\nGMAIL_REFRESH_TOKEN=${tokens.refresh_token}`;
    envContent += `\nGMAIL_ACCESS_TOKEN=${tokens.access_token}\n`;

    await writeFile(envPath, envContent);
    
    console.log('\n💾 Tokens saved to .env file');
    console.log('\n🎉 Setup complete! You can now send emails using OAuth 2.0');

  } catch (error) {
    console.error('❌ OAuth setup failed:', error.message);
    process.exit(1);
  }
}

setupOAuth();