import React from 'react';
import { HardDrive, BotMessageSquare, Database, Slack, BrainCircuit } from 'lucide-react';

const iconMapping = {
    HardDrive: HardDrive,
    BotMessageSquare: BotMessageSquare,
    Database: Database,
    Slack: Slack,
    BrainCircuit: BrainCircuit,
};

const CustomNode = ({ data } : any) => {
    const IconComponent = iconMapping[data.icon]; // Map string to actual component

    return (
        <div className="p-2 border rounded bg-white">
            <div className="flex items-center">
                {IconComponent && <IconComponent className="w-6 h-6 mr-2" />} {/* Render the icon */}
                <div>
                    <p className="font-bold">{data.name}</p>
                    <p className="text-sm text-gray-500">{data.description}</p>
                </div>
            </div>
        </div>
    );
};

export default CustomNode;
