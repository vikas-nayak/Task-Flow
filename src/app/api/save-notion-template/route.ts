import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { workflowId, content } = await req.json();

        if (!workflowId || !content) {
            return NextResponse.json({ message: 'Invalid request data' }, { status: 400 });
        }

        const response = await db.workflows.update({
            where: { id: workflowId },
            data: { notionTemplate: content },
        });

        return NextResponse.json({ message: 'Notion template saved successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error saving Notion template:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
