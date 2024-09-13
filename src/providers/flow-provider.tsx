"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Node, Edge } from '@xyflow/react';

interface FlowContextType {
  nodes: Node[];
  setNodes: (nodes: Node[]) => void;
  edges: Edge[];
  setEdges: (edges: Edge[]) => void;
  selectedNode: Node | null;
  setSelectedNode: (node: Node | null) => void;
}

const FlowContext = createContext<FlowContextType | undefined>(undefined);

export const FlowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  return (
    <FlowContext.Provider value={{ nodes, setNodes, edges, setEdges, selectedNode, setSelectedNode }}>
      {children}
    </FlowContext.Provider>
  );
};

export const useFlow = (): FlowContextType => {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error('useFlow must be used within a FlowProvider');
  }
  return context;
};
