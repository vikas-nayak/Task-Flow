import { NextResponse } from 'next/server';
import db from '@/lib/db';


export async function POST(request: Request) {
  try {

    const { nodes, edges, workflowId, name, description, flowPath } = await request.json();
    console.log('Received data:', { nodes, edges, workflowId, name, description, flowPath });


    if (!Array.isArray(nodes) || !Array.isArray(edges)) {
      throw new Error('Invalid data format: nodes and edges should be arrays.');
    }


    const flowPathString = JSON.stringify(flowPath);

    const savedWorkflow = await db.workflows.update({
      where: {
        id: workflowId,
      },
      data: {
        nodes,
        edges,
        name,
        description,
        flowPath: flowPathString,
      },
    });
    console.log('Saved workflow:', savedWorkflow);

    return NextResponse.json({ message: 'Workflow saved successfully!', savedWorkflow });
  } catch (error) {
    console.error('Error saving workflow:', error);
    return NextResponse.json({ error: 'Failed to save workflow' }, { status: 500 });
  }
}
