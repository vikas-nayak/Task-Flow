"use client";
import '@xyflow/react/dist/style.css';
import React, { useCallback, useEffect, useState } from 'react';
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
import CustomNode from './custom-node';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../ui/resizable';
import EditorCanvasSidebar from './editor-canvas-sidebar';
import DragCard from './editor-canvas-card';
import { useFlow } from '@/providers/flow-provider';

interface CustomNodeData {
  icon?: string;
  name?: string;
  description?: string;
}

const nodeTypes = { customNode: CustomNode };

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

function EditorCanvas() {
    const handleDragStart = (event: React.DragEvent, card: CustomNodeData) => {
        event.dataTransfer.setData('application/reactflow', JSON.stringify(card));
    };

    return (
        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel>
                <div className="h-screen w-screen">
                    <Flow />
                </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel>
                <EditorCanvasSidebar />
                <DragCard onDragStart={handleDragStart} />
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}

function Flow() {
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
            const data = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const rect = (event.target as HTMLElement).getBoundingClientRect();
            const newNode: Node = {
                id: `${Math.random()}`,
                type: 'customNode',
                position: {
                    x: event.clientX - rect.left,
                    y: event.clientY - rect.top,
                },
                data: data,
            };
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
}

export default EditorCanvas;
