"use client";
import React, { useCallback } from 'react';
import {
    ReactFlow,
    Controls,
    Background,
    MiniMap,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    NodeChange,
    EdgeChange,
    Connection,
    Node,
    Edge,
} from '@xyflow/react';
import { useFlow } from '@/providers/flow-provider';
import CustomNode from './custom-node';

interface CustomNodeData {
    icon?: string;
    name?: string;
    description?: string;
}

const nodeTypes = { customNode: CustomNode };

const Flow: React.FC = () => {
    const { nodes, setNodes, edges, setEdges } = useFlow();

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );
    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();
            const data: CustomNodeData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const rect = (event.target as HTMLElement).getBoundingClientRect();
            const newNode: Node = {
                id: `${Math.random()}`,
                type: 'customNode',
                position: {
                    x: event.clientX - rect.left,
                    y: event.clientY - rect.top,
                },
                data: {
                    ...data,
                    name: data.name || 'Default Name',
                },
            };
            console.log('New Node created:', newNode); // Log the node creation

            setNodes((nds) => nds.concat(newNode));
        },
        [setNodes]
    );

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
    }, []);

    return (
        <div className="h-full w-full" onDrop={onDrop} onDragOver={onDragOver}>
            <ReactFlow
                nodes={nodes}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                style={{ height: '100%', width: '100%', color: 'black' }}
                nodeTypes={nodeTypes}
            >
                <Background />
                <Controls position="top-left" style={{ color: 'black' }} />
                <MiniMap position="bottom-left" bgColor="black" />
            </ReactFlow>
        </div>
    );
};

export default Flow;
