'use server'

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';
import { Client } from '@notionhq/client';

// Function to fetch Notion database data
const fetchNotionDatabaseData = async (databaseId: string, accessToken: string) => {
  const notion = new Client({
    auth: accessToken,
  });

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });
    return response;
  } catch (error) {
    console.error("Error fetching data from Notion:", error);
    throw new Error("Failed to fetch data from Notion.");
  }
};

// GET request handler
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const databaseId = searchParams.get('databaseId');

  if (!databaseId) {
    return NextResponse.json({ error: 'Database ID is required' }, { status: 400 });
  }

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

  try {
    const data = await fetchNotionDatabaseData(databaseId, accessToken);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
