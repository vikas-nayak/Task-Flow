"use client";
import React from 'react';
import '@xyflow/react/dist/style.css';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../ui/resizable';
import EditorCanvasSidebar from './editor-canvas-sidebar';
import DragCard from './editor-canvas-card';
import {ScrollArea} from '../ui/scroll-area';  // Ensure correct import
import Flow from './flow';

interface CustomNodeData {
  icon?: string;
  name?: string;
  description?: string;
}

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
      <ResizablePanel className="flex flex-col">
        <EditorCanvasSidebar />
        <div className="flex-1 overflow-auto">
          <ScrollArea className="h-[500px]">
            <div className="p-2">
              <DragCard onDragStart={handleDragStart} />
            </div>
          </ScrollArea>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default EditorCanvas;
