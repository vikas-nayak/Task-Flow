import React, { useEffect, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { HardDrive, BotMessageSquare, Database, Slack, BrainCircuit, Instagram, Linkedin } from 'lucide-react';

interface IconMapping {
    HardDrive: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    BotMessageSquare: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    Database: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    Slack: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    Instagram: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    Linkedin: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    BrainCircuit: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const iconMapping: IconMapping = {
    HardDrive: HardDrive,
    BotMessageSquare: BotMessageSquare,
    Database: Database,
    Slack: Slack,
    BrainCircuit: BrainCircuit,
    Instagram: Instagram,
    Linkedin: Linkedin,
};

interface CustomNodeData {
    icon: keyof IconMapping;
    name: string;
    description: string;
}

interface CustomNodeProps {
    data: CustomNodeData;
    id: string; // Add id prop
}

const CustomNode: React.FC<CustomNodeProps> = ({ data, id }) => {
    const [nodeData, setNodeData] = useState<CustomNodeData | null>(null);

    // Ensure icon is derived from either the fetched nodeData or initial data prop
    const IconComponent = iconMapping[(nodeData?.icon || data.icon) as keyof IconMapping];

    // Fetch node data based on id
    useEffect(() => {
        const fetchNodeData = async () => {
            try {
                const response = await fetch(`/api/get-workflow?id=${id}`);
                const fetchedData: CustomNodeData = await response.json();
                setNodeData(fetchedData);
            } catch (error) {
                console.error('Error fetching node data:', error);
            }
        };

        fetchNodeData();
    }, [id]);

    useEffect(() => {
        const fetchNodeData = async () => {
            try {
                const response = await fetch(`/api/get-workflow?id=${id}`);
                const fetchedData = await response.json();
                console.log('Fetched node data:', fetchedData);
                setNodeData(fetchedData);
            } catch (error) {
                console.error('Error fetching node data:', error);
            }
        };
    
        fetchNodeData();
    }, [id]);
    
    console.log('Updated node data in state:', nodeData);
    

    return (
        <div className="p-4 border rounded-lg bg-white shadow-md relative" id={id}>
            <Handle
                type="target"
                position={Position.Top}
                id="input"
                style={{ background: '#555' }}
            />
            <div className="flex justify-start">
                {IconComponent && <IconComponent className="w-8 h-8 mb-2 text-gray-700" />}
                <div>
                    {/* Always prioritize fetched nodeData over initial data */}
                    <p className="font-semibold text-gray-900 pl-4">{nodeData?.name || data.name}</p>
                    <p className="text-sm text-gray-500 pl-4">{nodeData?.description || data.description}</p>
                    <p className="text-xs text-gray-400 pl-4">ID: {id}</p>
                </div>
            </div>
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
