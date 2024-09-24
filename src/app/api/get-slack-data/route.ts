import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuth } from '@clerk/nextjs/server';

export async function GET(request: Request) {
  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // First, retrieve the Slack record using any available unique identifier (like `id`)
    const slackData = await db.slack.findFirst({
      where: {
        userId: userId, // Assuming userId is the relationship
      },
    });

    // Check if the data was found
    if (!slackData) {
      return NextResponse.json({ error: 'Slack data not found' }, { status: 404 });
    }

    // If found, return the access token
    return NextResponse.json({ slackAccessToken: slackData.slackAccessToken });
  } catch (error) {
    console.error('Error fetching Slack data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
