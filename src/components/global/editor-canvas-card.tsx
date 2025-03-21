import React from 'react';
import { Card, CardDescription, CardHeader } from '../ui/card';
import { HardDrive, BotMessageSquare, Database, Slack, BrainCircuit, Instagram, Linkedin, Mail } from 'lucide-react';
import { useTheme } from 'next-themes';
import { v4 as uuidv4 } from 'uuid'; // Import uuid

const iconMapping = {
    HardDrive: HardDrive,
    BotMessageSquare: BotMessageSquare,
    Database: Database,
    Slack: Slack,
    Gmail: Mail,

};

interface CardData {
    name: string;
    description: string;
    icon: keyof typeof iconMapping;
}

const cardDataArray: CardData[] = [
    { name: "Google Drive", description: "Here goes the card description", icon: 'HardDrive' },
    { name: "Discord", description: "Securely store your files", icon: 'BotMessageSquare' },
    { name: "Notion", description: "Access your files anywhere", icon: 'Database' },
    { name: "Slack", description: "Collaborate efficiently", icon: 'Slack' },
    { name: "Gmail", description: "Global app for sending & reciving e-mails", icon: 'Gmail' },

];

interface DragCardProps {
    onDragStart?: (event: React.DragEvent<HTMLDivElement>, cardData: CardData) => void;
}

function DragCard({ onDragStart }: DragCardProps) {
    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, cardData: CardData) => {
        const nodeId = uuidv4(); // Generate unique ID
        const dataWithId = { ...cardData, id: nodeId }; // Add ID to card data
        event.dataTransfer.setData('application/reactflow', JSON.stringify(dataWithId));
        event.dataTransfer.effectAllowed = 'move';

        if (onDragStart) {
            onDragStart(event, dataWithId);
        }
    };

    const { theme } = useTheme();
    return (
        <div className="p-3 space-y-4">
            {cardDataArray.map((cardData, index) => {
                const IconComponent = iconMapping[cardData.icon];

                return (
                    <Card
                        key={index}
                        draggable
                        onDragStart={(event) => handleDragStart(event, cardData)}
                        className="flex items-center p-4 border border-gray-200 rounded-lg shadow-sm max-w-xs w-[250px]"
                    >
                        <div className="flex-shrink-0">
                            {IconComponent && <IconComponent className="w-6 h-6 mr-2" />}
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
