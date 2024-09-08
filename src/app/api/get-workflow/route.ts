// pages/api/get-workflow.ts
import db from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const workflowId = req.nextUrl.searchParams.get('workflowId');

  if (!workflowId) {
    return NextResponse.json({ error: 'Workflow ID is required' }, { status: 400 });
  }

  try {
    const workflow = await db.workflows.findFirst({
      where: {
        id: workflowId,
      },
    });

    if (!workflow) {
      return NextResponse.json({ error: 'Workflow not found' }, { status: 404 });
    }

    return NextResponse.json(workflow);
  } catch (error) {
    console.error('Error fetching workflow:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
