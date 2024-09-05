import React, { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { useFlow } from '@/providers/flow-provider';
import { useUser } from '@clerk/nextjs';
import { Edge, Node } from '@xyflow/react';

interface EditorCanvasSidebarProps {}

function EditorCanvasSidebar() {
  const { nodes, edges, setNodes, setEdges } = useFlow();
  const { user } = useUser();

  // Temporary workflowId - replace with actual workflowId fetching logic
  const [workflowId, setWorkflowId] = useState('c8602ca9-473e-4c41-ad29-9c9fe35e8957');

  const fetchFirstWorkflowId = async () => {
    try {
      const response = await fetch('/api/get-workflow-id'); // API to fetch workflow IDs
      if (!response.ok) {
        throw new Error('Failed to fetch workflow IDs');
      }
      const workflows = await response.json();
      if (workflows.length > 0) {
        setWorkflowId(workflows[0]); // Set the first workflow ID
      }
    } catch (error) {
      console.error('Error fetching workflow ID:', error);
    }
  };

  const saveFlow = async (workflowId: string, nodes: Node[], edges: Edge[]) => {
    const sanitizedNodes = nodes.map(node => ({
      id: node.id,
      position: node.position,
      data: node.data,
    }));

    const sanitizedEdges = edges.map(edge => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      type: edge.type,
    }));

    try {
      const response = await fetch('/api/save-workflow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workflowId,
          nodes: sanitizedNodes,
          edges: sanitizedEdges,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to save flow: ${errorData.message}`);
      }

      console.log('Flow saved successfully');
    } catch (error) {
      console.error('Error saving flow:', error);
    }
  };

  const fetchWorkflow = async (workflowId: string) => {
    try {
        const response = await fetch(`/api/get-workflow?workflowId=${workflowId}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to fetch workflow: ${errorData.message}`);
        }
    
        const workflow = await response.json();
        console.log('Fetched workflow:', workflow); // Debugging line
    
        if (workflow) {
            const desanitizedNodes = workflow.nodes.map(node => ({
                ...node,
                data: {
                    ...node.data,
                    // Ensure data structure matches CustomNodeData
                    icon: node.data.icon,
                    name: node.data.name,
                    description: node.data.description
                }
            }));
    
            const desanitizedEdges = workflow.edges;
    
            console.log('Desanitized nodes:', desanitizedNodes); // Debugging line
            console.log('Desanitized edges:', desanitizedEdges); // Debugging line
    
            setNodes(desanitizedNodes);
            setEdges(desanitizedEdges);
        }
    } catch (error) {
        console.error('Error fetching workflow:', error);
    }
};

useEffect(() => {
  fetchFirstWorkflowId();
}, []);

  useEffect(() => {
    if (workflowId) {
      fetchWorkflow(workflowId);
    }
  }, [workflowId]);

  return (
    <div>
      <div className="">
        <div className="">
          <Button onClick={() => saveFlow(workflowId, nodes, edges)}>Save</Button>
          <Button className="m-3" variant={'ghost'}>Clear</Button>
        </div>

        <Tabs>
          <TabsList className="bg-transparent">
            <TabsTrigger value="actions">Actions</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <Separator />
    </div>
  );
}

export default EditorCanvasSidebar;
