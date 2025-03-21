import { google } from 'googleapis';
import { db } from '@/lib/db';

export async function sendGmailMessage(
  userId: string,
  recipient: string,
  subject: string,
  body: string
) {
  const user = await db.user.findFirst({
    where: {
      clerkId: userId,
    },
    select: {
      gmailAccessToken: true,
      gmailRefreshToken: true,
    },
  });

  if (!user || !user.gmailAccessToken || !user.gmailRefreshToken) {
    throw new Error('User does not have a valid Gmail connection.');
  }

  const auth = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.GOOGLE_REDIRECT_URI,
  });

  auth.setCredentials({
    access_token: user.gmailAccessToken,
    refresh_token: user.gmailRefreshToken,
  });

  const gmail = google.gmail({ version: 'v1', auth });

  const message = {
    to: recipient,
    subject: subject,
    text: body,
  };

  const rawMessage = [
    `To: ${message.to}`,
    `Subject: ${message.subject}`,
    '',
    message.text,
  ].join('\n');

  try {
    const { data } = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: Buffer.from(rawMessage).toString('base64'),
      },
    });

    return data;
  } catch (error) {
    console.error('Error sending Gmail message:', error);
    throw error;
  }
}