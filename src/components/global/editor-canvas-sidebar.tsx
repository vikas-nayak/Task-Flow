import React, { useEffect, useState, useCallback } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import DragCard from './editor-canvas-card';
import { useFlow } from '@/providers/flow-provider';
import { Node, Edge } from '@xyflow/react';
import { CONNECTIONS } from '@/lib/constant';
import ConnectionCard from './connection-card';
import { currentUser } from '@clerk/nextjs/server';
import RenderAccordion from './render-accordion';
import { toast } from 'sonner';
import { useNodeConnections } from '@/providers/connection-provider';
import { useFlowStore } from '@/store';

interface CustomNodeData {
  icon?: string;
  name?: string;
  description?: string;
}

const EditorCanvasSidebar: React.FC = () => {
  const { nodes, edges, setNodes, setEdges, selectedNode, setSelectedNode } = useFlow();
  const [workflowId, setWorkflowId] = useState<string>('');
  const [connections, setConnections] = useState<Record<string, boolean>>({});
  const [filteredConnections, setFilteredConnections] = useState<Record<string, boolean>>({});
  const { slackChannels, selectedSlackChannels, setSelectedSlackChannels } = useFlowStore()

  const handleDragStart = (event: React.DragEvent, card: CustomNodeData) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(card));
    event.dataTransfer.effectAllowed = 'move';
  };

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

  const generateFlowPath = (nodes: Node[], edges: Edge[]) => {
    // Simple approach: Just using the node IDs for the flowPath
    return nodes.map(node => node.id);
  };
  

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

    const flowPath = generateFlowPath(nodes, edges);

    try {
      const response = await fetch('/api/save-workflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workflowId,
          nodes: sanitizedNodes,
          edges: sanitizedEdges,
          flowPath,
        }),
      });


      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to save flow: ${errorData.message}`);
      }

      toast.success('Flow saved successfully');
      console.log('Flow saved successfully');
    } catch (error) {
      toast.error('Failed to save flow');
      console.error('Error saving flow:', error);
    }
  }, []);

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

  const fetchNodeConnections = useCallback(async (nodeId: string) => {
    try {
      const response = await fetch(`/api/get-node-connections?nodeId=${nodeId}`);
      if (!response.ok) throw new Error('Failed to fetch node connections');
      const { connections } = await response.json();
      console.log('Fetched node connections:', connections);

      const connectionsMap = connections.reduce((acc: Record<string, boolean>, conn: { type: string }) => {
        acc[conn.type] = true;
        return acc;
      }, {});

      setFilteredConnections(connectionsMap);
    } catch (error) {
      console.error('Error fetching node connections:', error);
    }
  }, []);

  useEffect(() => {
    if (selectedNode) {
      fetchNodeConnections(selectedNode.id);
    } else {
      setFilteredConnections({});
    }
  }, [selectedNode, fetchNodeConnections]);

  const handleClear = useCallback(() => {
    setNodes([]);
    setEdges([]);
  }, [setNodes, setEdges]);

  const { nodeConnection } = useNodeConnections();


  return (
    <div>
      <div className="ml-4">
        <Button onClick={() => saveFlow(workflowId, nodes, edges)}>Save</Button>
        <Button className="m-3" variant="ghost" onClick={handleClear}>Clear</Button>
      </div>

      <Tabs defaultValue='actions' className='w-full'>
        <TabsList className="bg-transparent">
          <TabsTrigger value="actions">Actions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="actions">
          <Separator />
          <ScrollArea className="h-[500px]">
            <div className="p-2">
              <DragCard onDragStart={handleDragStart} />
            </div>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="settings">
          <Separator />
          <div className="p-2">
            <p className='text-2xl font-bold pl-2'>{selectedNode ? selectedNode.data.name : 'No node selected'}</p>
            {Object.keys(filteredConnections).length > 0 ? (
              CONNECTIONS.filter(connection =>
                filteredConnections[connection.title]
              ).map((connection) => (
                <ConnectionCard
                  key={connection.title}
                  connected={filteredConnections[connection.title]}
                />
              ))
            ) : (
              <p></p> //will be showing connection card here
            )}
            <RenderAccordion 
            selectedNode={selectedNode}
            nodeConnection={nodeConnection}
            setChannels={setSelectedSlackChannels}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EditorCanvasSidebar;