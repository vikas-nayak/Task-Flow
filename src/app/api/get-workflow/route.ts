import db from '@/lib/db';
import { useUser } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest, res: NextResponse) {

  const workflowId = req.nextUrl.searchParams.get('workflowId');

  if (!workflowId) {
    return NextResponse.json({ error: 'Workflow not found' });
  }
  // console.log(req.nextUrl.searchParams.get('workflowId'))
  const workflow = await db.workflows.findFirst({
    where: {
      id: workflowId,
    },
  });
  return NextResponse.json(workflow);


}



