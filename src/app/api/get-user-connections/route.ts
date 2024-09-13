// src/app/api/get-user-connections/route.ts

import { NextResponse } from 'next/server';
import { getUserData } from '@/app/(main)/(pages)/dashboard/connections/_actions/get-user';
import { currentUser } from '@clerk/nextjs/server';

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const userData = await getUserData(user.id);
    console.log('User data:', userData); // Log user data
    return NextResponse.json({ connections: userData.connections });
  } catch (error) {
    console.error('Error fetching user connections:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
