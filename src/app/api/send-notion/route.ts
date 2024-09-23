import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';
import { Client } from '@notionhq/client';

export async function POST(req: Request) {
  const { title, content } = await req.json();

  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }


  const connection = await db.notion.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!connection) {
    return NextResponse.json({ error: 'No Notion connection found' }, { status: 404 });
  }

  const { accessToken } = connection;

  // Create a Notion client with the user-specific access token
  const notion = new Client({ auth: accessToken });

  try {
    const response = await notion.pages.create({
        parent: { database_id: '102538e3-46a9-80f9-bf05-e7a7316b6fa3' },
        properties: {
            name: {
              title: [
                {
                  text: {
                    content: title,
                  },
                },
              ],
            },
          },
      });
      

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create page in Notion' }, { status: 500 });
  }
}
