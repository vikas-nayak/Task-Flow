import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';
// import DragCard from './drag-card';

function EditorCanvasSidebar() {
  return (
    <div>
        <div className="">
        <Tabs>
        <TabsList className="bg-transparent">
          <TabsTrigger value="actions">Actions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        </Tabs>
        </div>
        <Separator/>
        {/* <DragCard/> */}
    </div>
  );
}

export default EditorCanvasSidebar;
