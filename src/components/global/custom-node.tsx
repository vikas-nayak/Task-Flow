import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { HardDrive, BotMessageSquare, Database, Slack, BrainCircuit } from 'lucide-react';

const iconMapping = {
    HardDrive: HardDrive,
    BotMessageSquare: BotMessageSquare,
    Database: Database,
    Slack: Slack,
    BrainCircuit: BrainCircuit,
};

const CustomNode = ({ data }: any) => {
    const IconComponent = iconMapping[data.icon]; // Map string to actual component

    return (
        <div className="p-4 border rounded-lg bg-white shadow-md relative">
            {/* Input Handle - Positioned at the top */}
            <Handle
                type="target"
                position={Position.Top}
                id="input"
                style={{ background: '#555' }}
            />

            {/* Node Content */}
            <div className="flex justify-start">
                {IconComponent && <IconComponent className="w-8 h-8 mb-2 text-gray-700" />} {/* Render the icon */}
                <div>
                    <p className="font-semibold text-gray-900 pl-4">{data.name}</p>
                    <p className="text-sm text-gray-500 pl-4">{data.description}</p>
                </div>
            </div>

            {/* Output Handle - Positioned at the bottom */}
            <Handle
                type="source"
                position={Position.Bottom}
                id="output"
                style={{ background: '#555' }}
            />
        </div>
    );
};

export default CustomNode;
