// pages/api/get-workflow.ts
import { NextApiRequest, NextApiResponse } from 'next';
import db from '@/lib/db'; 
import { Node,Edge } from '@xyflow/react';


export async function loadWorkflow(workflowId: string) {
    try {
      const response = await fetch(`/api/get-workflow/${workflowId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error loading workflow:', error);
      return { nodes: [], edges: [] };
    }
  }

  

  