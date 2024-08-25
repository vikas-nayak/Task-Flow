import React from 'react';
import { ReactFlow, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import EditorCanvasSidebar from './editor-canvas-sidebar';

function EditorCanvas() {
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
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}

function Flow() {
    return (
        <div className="h-full w-full">
            <ReactFlow style={{ height: '100%', width: '100%' }}>
                <Background />
                <Controls position='top-left' style={{ color: 'black' }} />
            </ReactFlow>
        </div>
    );
}

export default EditorCanvas;
