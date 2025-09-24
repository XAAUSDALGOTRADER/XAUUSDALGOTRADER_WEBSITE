import { google } from 'googleapis';
import { config } from 'dotenv';
import { writeFile } from 'fs/promises';
import path from 'path';

// Load environment variables
config({ path: path.resolve(process.cwd(), '.env') });

async function refreshAccessToken() {
  try {
    console.log('🔄 Refreshing Gmail access token...');

    if (!process.env.GMAIL_CLIENT_ID || !process.env.GMAIL_CLIENT_SECRET || !process.env.GMAIL_REFRESH_TOKEN) {
      throw new Error('OAuth2 credentials not configured. Run setup-oauth first.');
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN
    });

    const { credentials } = await oauth2Client.refreshAccessToken();
    
    console.log('✅ Access token refreshed successfully');
    
    // Update .env file
    const envPath = path.resolve(process.cwd(), '.env');
    let envContent = '';
    
    const fs = await import('fs/promises');
    envContent = await fs.readFile(envPath, 'utf8');
    
    envContent = envContent.replace(
      /GMAIL_ACCESS_TOKEN=.*/,
      `GMAIL_ACCESS_TOKEN=${credentials.access_token}`
    );
    
    await writeFile(envPath, envContent);
    
    console.log('💾 New access token saved to .env file');
    console.log('⏰ Token will be valid for approximately 1 hour');
    
    return credentials.access_token;

  } catch (error) {
    console.error('❌ Error refreshing token:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  refreshAccessToken();
}

export { refreshAccessToken };