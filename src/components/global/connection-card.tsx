"use client";
import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Bot, Database, Slack, HardDrive, BrainCircuit } from 'lucide-react';
import { ConnectionTypes } from '@/lib/types';
import { ScrollArea } from '../ui/scroll-area';
import { CONNECTIONS } from '@/lib/constant'; // Import the constants file

type Props = {
    connected: Record<ConnectionTypes, boolean>;
};

const iconMap: Record<string, React.ReactNode> = {
    GoogleDrive: <HardDrive className="w-8 h-8" />,
    Discord: <Bot className="w-8 h-8" />,
    Notion: <Database className="w-8 h-8" />,
    Slack: <Slack className="w-8 h-8" />,
    ChatGPT: <BrainCircuit className="w-8 h-8" />,
};

const ConnectionCard = ({ connected }: Props) => {
    return (
        <div className='h-full'>
            <ScrollArea className='h-full p-4'>
                <div className='w-full min-h-screen p-5'>
                    {CONNECTIONS.map((connection) => (
                        <Card key={connection.connectionKey} className="flex w-full items-center justify-between my-4">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div className="flex flex-row gap-4 items-center">
                                    {iconMap[connection.title]}
                                    <div>
                                        <CardTitle className="text-lg">{connection.title}</CardTitle>
                                        <CardDescription>{connection.description}</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <div className="flex flex-col items-center gap-2 p-4">
                                {connected[connection.title] ? (
                                    <div className="border-bg-primary rounded-lg border-2 px-3 py-2 text-white">
                                        Connected
                                    </div>
                                ) : (
                                    <Link
                                        href={
                                            connection.title === 'Discord'
                                                ? process.env.NEXT_PUBLIC_DISCORD_REDIRECT || '#'
                                                : connection.title === 'Notion'
                                                    ? process.env.NEXT_PUBLIC_NOTION_AUTH_URL || '#'
                                                    : connection.title === 'Slack'
                                                        ? process.env.NEXT_PUBLIC_SLACK_REDIRECT || '#'
                                                        : connection.title === 'ChatGPT'
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

export default ConnectionCard;
