import axios from 'axios';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');

  if (code) {
    const data = new URLSearchParams();
    data.append('client_id', process.env.DISCORD_CLIENT_ID!);
    data.append('client_secret', process.env.DISCORD_CLIENT_SECRET!);
    data.append('grant_type', 'authorization_code');
    data.append('redirect_uri', 'https://your-ngrok-url/api/auth/callback/discord'); // Use ngrok or actual domain for HTTPS
    data.append('code', code.toString());

    try {
      // Exchange code for access token
      const output = await axios.post(
        'https://discord.com/api/oauth2/token',
        data,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      if (output.data) {
        const access = output.data.access_token;

        // Fetch user guilds
        const UserGuilds = await axios.get(
          `https://discord.com/api/users/@me/guilds`,
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );

        // Example: Fetch webhook separately if needed
        // const webhook = await axios.get('WEBHOOK_API_URL', {
        //   headers: {
        //     Authorization: `Bearer ${access}`,
        //   },
        // });

        return NextResponse.redirect(
          `https://localhost:3000/dashboard/connections?access_token=${access}`
        );
      }

      return NextResponse.redirect('https://localhost:3000/dashboard/connections');
    } catch (error) {
      console.error('Error fetching Discord token or user guilds:', error);
      return NextResponse.json(
        { error: 'Failed to retrieve Discord data' },
        { status: 500 }
      );
    }
  }

  return NextResponse.json(
    { error: 'Authorization code not found' },
    { status: 400 }
  );
}
