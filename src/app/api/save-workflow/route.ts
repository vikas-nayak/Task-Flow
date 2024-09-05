import { NextResponse } from 'next/server';
import db from '@/lib/db'; // Assuming you're using Prisma and this is your database client
import { currentUser } from '@clerk/nextjs/server';

export async function POST(request: Request) {
  const userId = await currentUser()
  try {
    const {nodes, edges, workflowId } = await request.json(); // Parse the incoming JSON data
    console.log(nodes, edges)

    // Save the workflow data to your databas using Prisma
    const savedWorkflow = await db.workflows.update({
      where:{
        id: workflowId
      },
      data: {
        nodes,
        edges,
      },
    });
    console.log(savedWorkflow);

    return NextResponse.json({ message: 'Workflow saved successfully!',savedWorkflow});
  } catch (error) {
    console.error('Error saving workflow:', error);
    return NextResponse.json({ error: 'Failed to save workflow' }, { status: 500 });
  }
}
