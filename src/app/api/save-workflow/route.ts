// pages/api/save-workflow.ts
import { NextApiRequest, NextApiResponse } from 'next';
import  db  from '@/lib/db'; // Import your Prisma client
import { Edge, Node } from '@xyflow/react';



  export async function saveWorkflow(workflowId: string, nodes: Node[], edges: Edge[]) {
    try {
      await fetch('/api/save-workflow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ workflowId, nodes, edges }),
      });
    } catch (error) {
      console.error('Error saving workflow:', error);
    }
  }
