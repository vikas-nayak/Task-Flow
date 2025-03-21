import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { db } from './db';

export class GmailService {
  private oauth2Client: OAuth2Client;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.NEXT_PUBLIC_GMAIL_REDIRECT_URI
    );
  }

  getAuthUrl() {
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: process.env.NEXT_PUBLIC_GMAIL_SCOPES?.split(' '),
      prompt: 'consent',
      redirect_uri: process.env.NEXT_PUBLIC_GMAIL_REDIRECT_URI,
    });
  }

  async handleCallback(code: string, userId: string) {
    try {
      const { tokens } = await this.oauth2Client.getToken({
        code,
        redirect_uri: process.env.NEXT_PUBLIC_GMAIL_REDIRECT_URI
      });

      // Get user's email using the access token
      this.oauth2Client.setCredentials({ access_token: tokens.access_token });
      const gmail = google.gmail({ version: 'v1', auth: this.oauth2Client });
      const profile = await gmail.users.getProfile({ userId: 'me' });
      const email = profile.data.emailAddress;

      // Changed to use the Gmail model
      await db.gmail.upsert({
        where: {
          userId: userId
        },
        create: {
          userId,
          accessToken: tokens.access_token!,
          refreshToken: tokens.refresh_token!,
          expiryDate: BigInt(tokens.expiry_date || 0),
          email,
        },
        update: {
          accessToken: tokens.access_token!,
          refreshToken: tokens.refresh_token!,
          expiryDate: BigInt(tokens.expiry_date || 0),
          email,
        },
      });

      return tokens;
    } catch (error) {
      console.error('Gmail OAuth Error:', error);
      throw error;
    }
  }

  async getGmailService(userId: string) {
    const gmail = await db.gmail.findFirst({
      where: {
        userId: userId
      },
    });

    if (!gmail) {
      throw new Error('Gmail integration not found');
    }

    this.oauth2Client.setCredentials({
      access_token: gmail.accessToken,
      refresh_token: gmail.refreshToken,
      expiry_date: Number(gmail.expiryDate),
    });

    return google.gmail({ version: 'v1', auth: this.oauth2Client });
  }

  // Add a helper method to refresh token if needed
  async refreshTokenIfNeeded(userId: string) {
    const gmail = await db.gmail.findFirst({
      where: {
        userId: userId
      },
    });

    if (!gmail) {
      throw new Error('Gmail integration not found');
    }

    // Check if token is expired or about to expire (within 5 minutes)
    const expiryDate = Number(gmail.expiryDate);
    const fiveMinutes = 5 * 60 * 1000;
    
    if (Date.now() + fiveMinutes >= expiryDate) {
      this.oauth2Client.setCredentials({
        refresh_token: gmail.refreshToken,
      });

      const { credentials } = await this.oauth2Client.refreshAccessToken();
      
      await db.gmail.update({
        where: {
          userId: userId
        },
        data: {
          accessToken: credentials.access_token!,
          expiryDate: BigInt(credentials.expiry_date || 0),
        },
      });

      return credentials;
    }

    return null;
  }
}