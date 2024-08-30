import React from 'react';
import { Card, CardDescription, CardHeader } from '../ui/card';
import { HardDrive, BotMessageSquare, Database, Slack, BrainCircuit } from 'lucide-react';

const cardDataArray = [
    { name: "Google Drive", description: "Here goes the card description", icon: 'HardDrive' },
    { name: "Discord", description: "Securely store your files", icon: 'BotMessageSquare' },
    { name: "Notion", description: "Access your files anywhere", icon: 'Database' },
    { name: "Slack", description: "Collaborate efficiently", icon: 'Slack' },
    { name: "ChatGPT", description: "AI-powered assistance", icon: 'BrainCircuit' }
];

const iconMapping = {
    HardDrive: HardDrive,
    BotMessageSquare: BotMessageSquare,
    Database: Database,
    Slack: Slack,
    BrainCircuit: BrainCircuit,
};

function DragCard({onDragStart} : any) {
    const handleDragStart = (event, cardData) => {
        event.dataTransfer.setData('application/reactflow', JSON.stringify(cardData));
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div className="p-3 space-y-4">
            {cardDataArray.map((cardData, index) => {
             const IconComponent = iconMapping[cardData.icon]; 
                // ure icon is a React component

                return (
                    <Card
                        key={index}
                        draggable
                        onDragStart={(event) => handleDragStart(event, cardData)}
                        className="flex items-center p-4 border border-gray-200 rounded-lg shadow-sm max-w-xs w-[250px]"
                    >
                        <div className="flex-shrink-0">
                        {IconComponent && <IconComponent className="w-6 h-6 mr-2" />} {/* Render the icon */}
                        {/* {cardData.icon} */}
                        </div>
                        <div className="flex-1">
                            <CardHeader className="text-md font-semibold text-white p-0 ml-3">
                                {cardData.name}
                            </CardHeader>
                            <CardDescription className="text-gray-500 text-sm ml-3">
                                {cardData.description}
                            </CardDescription>
                        </div>
                    </Card>
                );
            })}
        </div>
    );
}

export default DragCard;
