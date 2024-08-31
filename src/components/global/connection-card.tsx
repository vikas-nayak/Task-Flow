"use client"
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';
import { HardDrive, BotMessageSquare, Database, Slack, BrainCircuit, Instagram, Linkedin } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { useState } from 'react';
import { useTheme } from 'next-themes';



// Define the type for card data
type CardData = {
    name: string;
    description: string;
    icon: React.ReactNode;
    }
    
    // Map icon names to components
    const iconMap: Record<string, React.ReactNode> = {
        HardDrive: <HardDrive className='w-8 h-8' />,
        BotMessageSquare: <BotMessageSquare className='w-8 h-8' />,
    Database: <Database className='w-8 h-8' />,
    Slack: <Slack className='w-8 h-8' />,
    BrainCircuit: <BrainCircuit className='w-8 h-8' />,
    Instagram: <Instagram className='w-8 h-8' />,
    Linkedin: <Linkedin className='w-8 h-8' />,
};

const cardDataArray: CardData[] = [
    { name: "Google Drive", description: "Here goes the card description", icon: iconMap.HardDrive },
    { name: "Discord", description: "Securely store your files", icon: iconMap.BotMessageSquare },
    { name: "Notion", description: "Access your files anywhere", icon: iconMap.Database },
    { name: "Slack", description: "Collaborate efficiently", icon: iconMap.Slack },
    { name: "Instagram", description: "Post content efficiently", icon: iconMap.Instagram },
    { name: "Linkedin", description: "Post content efficiently", icon: iconMap.Linkedin },
    { name: "ChatGPT", description: "AI-powered assistance", icon: iconMap.BrainCircuit }
];

function ConnectionCard() {
    // State to manage button text and style
    const [connected, setConnected] = useState<Record<number, boolean>>({});
    const { theme } = useTheme();

    // Toggle button state
    const handleButtonClick = (index: number) => {
        setConnected((prevState) => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };
    return (
        <div className='h-screen'>
            <ScrollArea className='h-full p-4'>
                <div className='w-full min-h-screen p-5'>
                    <div className='flex justify-between w-full items-center mb-5'>
                        <h1 className='text-2xl'>Workflows</h1>
                    </div>
                    <div>
                        {cardDataArray.map((cardData, index) => (
                            <Card key={index} className='relative m-4'>
                                <div className='flex justify-between items-center'>
                                    <CardHeader>
                                        <CardContent className='flex justify-start pl-0 pb-2'>
                                            {cardData.icon}
                                        </CardContent>
                                        <CardTitle>{cardData.name}</CardTitle>
                                        <CardDescription>{cardData.description}</CardDescription>
                                    </CardHeader>
                                    <Button
                                        className={`mr-4 ${connected[index]
                                                ? `bg-transparent ${theme === 'light'
                                                    ? 'text-black border-black hover:bg-gray-200'
                                                    : 'text-white border-white hover:bg-black'
                                                } border-solid border-[1px]`
                                                : 'variant: outline'
                                            }`}
                                        onClick={() => handleButtonClick(index)}
                                    >
                                        {connected[index] ? 'Connected' : 'Connect'}
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
}

export default ConnectionCard;
