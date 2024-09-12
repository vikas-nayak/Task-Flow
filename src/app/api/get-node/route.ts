import db from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const workflowId = req.nextUrl.searchParams.get('workflowId');
  const nodeId = req.nextUrl.searchParams.get('nodeId');  // Fetch nodeId from query params

  if (!workflowId) {
    return NextResponse.json({ error: 'Workflow ID is required' }, { status: 400 });
  }

  if (!nodeId) {
    return NextResponse.json({ error: 'Node ID is required' }, { status: 400 });
  }

  try {
    // Find the workflow by its ID
    const workflow = await db.workflows.findFirst({
      where: {
        id: workflowId,
      },
    });

    if (!workflow) {
      return NextResponse.json({ error: 'Workflow not found' }, { status: 404 });
    }

    // Assuming 'nodes' is a JSON object containing an array of nodes
    const nodes = workflow.nodes as any[];  // Cast 'nodes' to an array of JSON objects
    const node = nodes.find(n => n.id === nodeId);  // Find the specific node by nodeId

    if (!node) {
      return NextResponse.json({ error: 'Node not found in the workflow' }, { status: 404 });
    }

    // Return the node data
    return NextResponse.json(node);
  } catch (error) {
    console.error('Error fetching workflow or node:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
