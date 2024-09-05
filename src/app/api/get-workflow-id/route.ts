import { NextResponse } from 'next/server';
import db from '@/lib/db'; // Assuming you're using Prisma and this is your database client
import { currentUser } from '@clerk/nextjs/server';

export async function GET(request: Request) {
  const userId = await currentUser(); // Fetch the current user (if needed for multi-user support)

  try {
    // Fetch workflow IDs from the database using Prisma
    const workflows = await db.workflows.findMany({
      select: { id: true }, // Only select the workflow IDs
    });

    // Map workflow objects to extract just the IDs
    const workflowIds = workflows.map(workflow => workflow.id);

    return NextResponse.json(workflowIds); // Return the array of workflow IDs
  } catch (error) {
    console.error('Error fetching workflow IDs:', error);
    return NextResponse.json({ error: 'Failed to fetch workflow IDs' }, { status: 500 });
  }
}
