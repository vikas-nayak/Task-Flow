import { NextResponse } from 'next/server';
import db from '@/lib/db'; // Prisma client import
import { currentUser } from '@clerk/nextjs/server';

export async function GET(request: Request) {
  try {
    const user = await currentUser(); // Fetch the current user

    if (!user) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const workflows = await db.workflows.findMany({
      where: { userId: user.id }, 
      select: { id: true },
    });

    const workflowIds = workflows.map(workflow => workflow.id);

    return NextResponse.json(workflowIds);
  } catch (error) {
    console.error('Error fetching workflow IDs:', error);
    return NextResponse.json({ error: 'Failed to fetch workflow IDs' }, { status: 500 });
  }
}
