"use client";
import '@xyflow/react/dist/style.css'
import React, { useCallback, useState } from 'react';
import {
    ReactFlow,
    Controls,
    Background,
    MiniMap,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
} from '@xyflow/react';
import CustomNode from './custom-node';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../ui/resizable';
import EditorCanvasSidebar from './editor-canvas-sidebar';
import DragCard from './editor-canvas-card';


const nodeTypes = { customNode: CustomNode };

const initialNodes : any= [];

const initialEdges :any = [];

function EditorCanvas() {
    const handleDragStart = (event, card) => {
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
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        []
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    );

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        []
    );

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();
            const data = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const newNode = {
                id: `${Math.random()}`,
                type: 'customNode',
                position: { x: event.clientX, y: event.clientY },
                data: data,
            };
            setNodes((nds) => nds.concat(newNode));
        },
        []
    );

    const onDragOver = useCallback((event) => {
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
