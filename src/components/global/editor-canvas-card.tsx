import React from 'react';
import { Card, CardDescription, CardHeader } from '../ui/card';
import { HardDrive, BotMessageSquare, Database, Slack, BrainCircuit, Instagram, Linkedin } from 'lucide-react';
import { useTheme } from 'next-themes';

interface CardData {
    name: string;
    description: string;
    icon: keyof typeof iconMapping; // Ensure that icon matches one of the keys in iconMapping
}

const cardDataArray: CardData[] = [
    { name: "Google Drive", description: "Here goes the card description", icon: 'HardDrive' },
    { name: "Discord", description: "Securely store your files", icon: 'BotMessageSquare' },
    { name: "Notion", description: "Access your files anywhere", icon: 'Database' },
    { name: "Slack", description: "Collaborate efficiently", icon: 'Slack' },
    { name: "Instagram", description: "Post content efficiently", icon: 'Instagram' },
    { name: "Linkedin", description: "Post content efficiently", icon: 'Linkedin' },
    { name: "ChatGPT", description: "AI-powered assistance", icon: 'BrainCircuit' }
];

const iconMapping = {
    HardDrive: HardDrive,
    BotMessageSquare: BotMessageSquare,
    Database: Database,
    Slack: Slack,
    BrainCircuit: BrainCircuit,
    Instagram: Instagram,
    Linkedin: Linkedin,
};

interface DragCardProps {
    onDragStart?: (event: React.DragEvent<HTMLDivElement>, cardData: CardData) => void; // Optional prop
}

function DragCard({ onDragStart }: DragCardProps) {
    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, cardData: CardData) => {
        event.dataTransfer.setData('application/reactflow', JSON.stringify(cardData));
        event.dataTransfer.effectAllowed = 'move';

        if (onDragStart) {
            onDragStart(event, cardData);
        }
    };

    const { theme } = useTheme();
    return (

        <div className="p-3 space-y-4">
            {cardDataArray.map((cardData, index) => {
                const IconComponent = iconMapping[cardData.icon]; // Ensure icon is a React component

                return (
                    <Card
                        key={index}
                        draggable
                        onDragStart={(event) => handleDragStart(event, cardData)}
                        className="flex items-center p-4 border border-gray-200 rounded-lg shadow-sm max-w-xs w-[250px]"
                    >
                        <div className="flex-shrink-0">
                            {IconComponent && <IconComponent className="w-6 h-6 mr-2" />} {/* Render the icon */}
                        </div>
                        <div className="flex-1">
                            <CardHeader
                                className={`text-md font-semibold p-0 ml-3 ${theme === 'light' ? 'text-black' : 'text-white'
                                    }`}
                            >{cardData.name}
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
