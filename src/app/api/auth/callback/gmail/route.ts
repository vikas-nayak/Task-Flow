import { NextResponse } from 'next/server';
import { gmail } from '@/lib/gmail-instance';
import { currentUser } from '@clerk/nextjs/server';

export async function GET(request: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
      return new Response('No code provided', { status: 400 });
    }

    await gmail.handleCallback(code, user.id);
    
    // Redirect back to dashboard or integrations page
    return NextResponse.redirect(`${process.env.NGROK_URI}/dashboard/connections`);
  } catch (error) {
    console.error('Gmail callback error:', error);
    return new Response('Authentication failed', { status: 500 });
  }
}