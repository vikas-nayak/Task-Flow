import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { gmail } from '@/lib/gmail-instance';

export async function GET() {
  try {
    // 1. Check authentication
    const user = await currentUser();
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: 'Authentication required' }), 
        { status: 401 }
      );
    }

    // 2. Generate OAuth URL
    const authUrl = gmail.getAuthUrl();

    // 3. Return the authorization URL
    return NextResponse.json({ authUrl });

  } catch (error) {
    console.error('Gmail connect error:', error);
    return NextResponse.json(
      { error: 'Failed to initialize Gmail connection' },
      { status: 500 }
    );
  }
}