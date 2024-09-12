import React, { useEffect, useState, useCallback } from 'react';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { useFlow } from '@/providers/flow-provider';  // For node and edge state
import { Node, Edge } from '@xyflow/react';

const EditorCanvasSidebar: React.FC = () => {
  const { nodes, edges, setNodes, setEdges } = useFlow();
  const [workflowId, setWorkflowId] = useState<string>('');

  // Fetch first workflow ID
  const fetchFirstWorkflowId = useCallback(async () => {
    try {
      const response = await fetch('/api/get-workflow-id');
      if (!response.ok) throw new Error('Failed to fetch workflow IDs');
      const workflows: string[] = await response.json();
      if (workflows.length > 0) setWorkflowId(workflows[0]);
    } catch (error) {
      console.error('Error fetching workflow ID:', error);
    }
  }, []);

  // Save current workflow
  const saveFlow = useCallback(async (workflowId: string, nodes: Node[], edges: Edge[]) => {
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
        headers: { 'Content-Type': 'application/json' },
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
  }, []);

  // Fetch workflow based on workflow ID
  const fetchWorkflow = useCallback(async (workflowId: string) => {
    try {
      const response = await fetch(`/api/get-workflow?workflowId=${workflowId}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to fetch workflow: ${errorData.message}`);
      }

      const workflow = await response.json();
      console.log('Fetched workflow:', workflow);

      if (workflow) {
        const desanitizedNodes = workflow.nodes.map((node: any) => ({
          ...node,
          data: {
            ...(node.data || {}),
            icon: node.data?.icon,
            name: node.data?.name,
            description: node.data?.description,
          }
        }));

        const desanitizedEdges = workflow.edges;

        setNodes(desanitizedNodes);
        setEdges(desanitizedEdges);
      }
    } catch (error) {
      console.error('Error fetching workflow:', error);
    }
  }, [setNodes, setEdges]);

  useEffect(() => {
    fetchFirstWorkflowId();
  }, [fetchFirstWorkflowId]);

  useEffect(() => {
    if (workflowId) {
      fetchWorkflow(workflowId);
    }
  }, [workflowId, fetchWorkflow]);

  // Clear nodes and edges
  const handleClear = useCallback(() => {
    setNodes([]);
    setEdges([]);
  }, [setNodes, setEdges]);

  return (
    <div>
      <div className="">
        <div className="ml-4">
          <Button onClick={() => saveFlow(workflowId, nodes, edges)}>Save</Button>
          <Button className="m-3" variant="ghost" onClick={handleClear}>Clear</Button>
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
};

export default EditorCanvasSidebar;
