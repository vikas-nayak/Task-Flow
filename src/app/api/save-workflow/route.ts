import { NextResponse } from 'next/server';
import db from '@/lib/db'; // Assuming you're using Prisma and this is your database client
import { currentUser } from '@clerk/nextjs/server';

export async function POST(request: Request) {
  try {
    // Parse incoming JSON data
    const { nodes, edges, workflowId, name, description } = await request.json();
    console.log('Received data:', { nodes, edges, workflowId, name, description });

    // Ensure that nodes and edges are valid arrays
    if (!Array.isArray(nodes) || !Array.isArray(edges)) {
      throw new Error('Invalid data format: nodes and edges should be arrays.');
    }

    // Save the workflow data to your database using Prisma
    const savedWorkflow = await db.workflows.update({
      where: {
        id: workflowId,
      },
      data: {
        nodes,         // Store data directly as JSON
        edges,         // Store data directly as JSON
        name,          // Save the name
        description,   // Save the description
      },
    });
    console.log('Saved workflow:', savedWorkflow);

    return NextResponse.json({ message: 'Workflow saved successfully!', savedWorkflow });
  } catch (error) {
    console.error('Error saving workflow:', error);
    return NextResponse.json({ error: 'Failed to save workflow' }, { status: 500 });
  }
}
