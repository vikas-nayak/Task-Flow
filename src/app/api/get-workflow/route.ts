import db from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const workflowId = req.nextUrl.searchParams.get('workflowId');
  const name = req.nextUrl.searchParams.get('name');

  if (!workflowId) {
    return NextResponse.json({ error: 'Workflow ID is required' }, { status: 400 });
  }

  try {
    const query: any = {
      where: {
        id: workflowId,
      },
    };

    if (name) {
      query.where.name = name;
    }

    const workflow = await db.workflows.findFirst(query);

    if (!workflow) {
      return NextResponse.json({ error: 'Workflow not found' }, { status: 404 });
    }

    return NextResponse.json(workflow);
  } catch (error) {
    console.error('Error fetching workflow:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
