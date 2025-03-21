import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

const POLL_INTERVAL = 60000; // 1 minute

async function getGmailClient(userId: string) {
  const integration = await db.gmailIntegration.findUnique({
    where: { userId }
  });

  if (!integration) {
    throw new Error('Gmail integration not found');
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.NEXT_PUBLIC_GMAIL_REDIRECT_URI
  );

  oauth2Client.setCredentials({
    access_token: integration.accessToken,
    refresh_token: integration.refreshToken,
    expiry_date: Number(integration.expiryDate)
  });

  return oauth2Client;
}

export async function GET(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const oauth2Client = await getGmailClient(userId);
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // Make sure GOOGLE_CLOUD_PROJECT_ID is set in your environment variables
    if (!process.env.GOOGLE_CLOUD_PROJECT_ID) {
      throw new Error('GOOGLE_CLOUD_PROJECT_ID environment variable is not set');
    }

    // Start watching for new emails with correct topic name format
    const response = await gmail.users.watch({
      userId: 'me',
      requestBody: {
        labelIds: ['INBOX'],
        topicName: `projects/${process.env.GOOGLE_CLOUD_PROJECT_ID}/topics/gmail-notifications`,
      },
    });

    // Store the watch configuration in the database
    await db.gmailIntegration.update({
      where: { userId },
      data: {
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      message: 'Gmail watch started successfully',
      historyId: response.data.historyId
    }, { status: 200 });

  } catch (error) {
    console.error('Error starting Gmail watch:', error);
    return NextResponse.json(
      { message: 'Failed to start Gmail watch', error: (error as Error).message },
      { status: 500 }
    );
  }
}