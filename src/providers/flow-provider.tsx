"use client";
import React, { createContext, useContext, useState } from 'react';

const FlowContext = createContext();

export const FlowProvider = ({ children }) => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    return (
        <FlowContext.Provider value={{ nodes, setNodes, edges, setEdges }}>
            {children}
        </FlowContext.Provider>
    );
};

export const useFlow = () => useContext(FlowContext);