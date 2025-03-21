import db from '@/lib/db';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { workflowId, content } = await req.json();
        const { to, subject, body } = content;

        if (!workflowId || !to || !subject || !body) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        // Update the workflow directly instead of creating a template
        await db.workflows.update({
            where: {
                id: workflowId,
                userId: userId // Ensure the workflow belongs to the user
            },
            data: {
                gmailTo: to,
                gmailSubject: subject,
                gmailBody: body,
            },
        });

        return NextResponse.json({ message: 'Gmail template saved successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error saving Gmail template:', error);
        return NextResponse.json({ message: 'Failed to save Gmail template' }, { status: 500 });
    }
}