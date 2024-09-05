"use client";
import React, { useState } from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Bot, Database, Slack, File, HardDrive, BrainCircuit } from 'lucide-react'; // Importing Lucide icons
import { ConnectionTypes } from '@/lib/types';
import { ScrollArea } from '../ui/scroll-area';

// Define the type for card data
type CardData = {
    name: string;
    description: string;
    icon: React.ReactNode;
    type: ConnectionTypes;
};

// Define an array with Lucide icons for different platforms
const cardDataArray: CardData[] = [
    {
        name: 'Discord',
        description: 'Connect Discord to manage webhooks.',
        icon: <Bot className="w-8 h-8" />, // Lucide Discord Icon
        type: 'Discord',
    },
    {
        name: 'Notion',
        description: 'Sync with Notion workspace.',
        icon: <Database className="w-8 h-8" />, // Lucide Database Icon for Notion
        type: 'Notion',
    },
    {
        name: 'Slack',
        description: 'Integrate Slack for collaboration.',
        icon: <Slack className="w-8 h-8" />, // Lucide Slack Icon
        type: 'Slack',
    },
    {
        name: 'Google Drive',
        description: 'Connect with Google Drive.',
        icon: <HardDrive className="w-8 h-8" />, // Lucide Google Drive Icon
        type: 'GoogleDrive',
    },
    {
        name: 'ChatGPT',
        description: 'Connect with ChatGPT.',
        icon: <BrainCircuit className="w-8 h-8" />, // Lucide File Icon for ChatGPT
        type: 'ChatGPT',
    },
    // Add more platforms here if needed
];

// This is the main ConnectionCard component
type Props = {
    connected: Record<ConnectionTypes, boolean>;
};

const ConnectionCard = ({ connected }: Props) => {
    return (
        <div className='h-full'>
            <ScrollArea className='h-full p-4'>
                <div className='w-full min-h-screen p-5'>
                    <div className='flex justify-between w-full items-center mb-5'>
                        <h1 className='text-2xl'>Workflows</h1>
                    </div>
                    {cardDataArray.map((cardData) => (
                        <Card key={cardData.type} className="flex w-full items-center justify-between my-4">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div className="flex flex-row gap-4 items-center">
                                    {/* Lucide Icon */}
                                    {cardData.icon}
                                    <div>
                                        <CardTitle className="text-lg">{cardData.name}</CardTitle>
                                        <CardDescription>{cardData.description}</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <div className="flex flex-col items-center gap-2 p-4">
                                {/* Check if the platform is connected */}
                                {connected[cardData.type] !== undefined && connected[cardData.type] ? (
                                    <div className="border-bg-primary rounded-lg border-2 px-3 py-2 text-white">
                                        Connected
                                    </div>
                                ) : (
                                    <Link target='_blank'
                                        href={
                                            cardData.type === 'Discord'
                                                ? process.env.NEXT_PUBLIC_DISCORD_REDIRECT || '#'
                                                : cardData.type === 'Notion'
                                                    ? process.env.NEXT_PUBLIC_NOTION_AUTH_URL || '#'
                                                    : cardData.type === 'Slack'
                                                        ? process.env.NEXT_PUBLIC_SLACK_REDIRECT || '#'
                                                        : cardData.type === 'ChatGPT'
                                                            ? process.env.NEXT_PUBLIC_CHATGPT_REDIRECT || '#'
                                                            : '#'
                                        }
                                        className="rounded-lg bg-primary p-2 font-bold text-primary-foreground"
                                    >
                                        Connect
                                    </Link>

                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
};

// Parent component example to initialize the `connected` state
const ParentComponent = () => {
    // Example state that tracks the connection status of each platform
    const [connected, setConnected] = useState<Record<ConnectionTypes, boolean>>({
        Discord: false,
        Notion: false,
        Slack: false,
        GoogleDrive: false,
        ChatGPT: false,
    });

    return <ConnectionCard connected={connected} />;
};

export default ParentComponent;
