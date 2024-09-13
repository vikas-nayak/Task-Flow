'use client';
import React from 'react';
import '@xyflow/react/dist/style.css';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../ui/resizable';
import EditorCanvasSidebar from './editor-canvas-sidebar';
import { ScrollArea } from '../ui/scroll-area';  
import Flow from './flow';

function EditorCanvas() {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel>
        <div className="h-screen w-screen">
          <Flow />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="flex flex-col w-[400px]">
        <EditorCanvasSidebar />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default EditorCanvas;
