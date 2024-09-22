import React, { useState, useCallback, useEffect } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { ConnectionProviderProps } from '@/providers/connection-provider';
import { onCreateNewPageInDatabase } from '@/app/(main)/(pages)/dashboard/connections/_actions/notion-connection';
import { postMessageToSlack } from '@/app/(main)/(pages)/dashboard/connections/_actions/slack-connection';
import { postContentToWebHook } from '@/app/(main)/(pages)/dashboard/connections/_actions/discord-connection';
import { Option } from '@/store';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';

interface RenderAccordionProps {
    selectedNode: any;
    nodeConnection: ConnectionProviderProps | null;
}

const RenderAccordion: React.FC<RenderAccordionProps> = ({ selectedNode, nodeConnection }) => {
    const [isListening, setIsListening] = useState(false);
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);
    const [channels, setChannels] = useState<Option[]>([]);
    const [selectedChannel, setSelectedChannel] = useState<string>('');

    const fetchSlackChannels = async () => {
        const res = await fetch('/api/slack-channels');
        const data = await res.json();
        if (res.ok) {
            setChannels(data.channels.map((channel: any) => ({
                label: channel.label,
                value: channel.id
            })));
        } else {
            console.error('Error fetching channels:', data.error);
        }
    };

    const onSendDiscordMessage = useCallback(async () => {
        const response = await postContentToWebHook(
            inputText,
            nodeConnection?.discordNode.webhookURL || 'https://discord.com/api/webhooks/1286008702264021109/mouelrLvazPe-tCVNaWJUc4YtvRfqtt3B9Gjd_cS6kWUYh0KJB5Ig-G2tpl0AKQCgEYT'
        );

        if (response.message === 'success') {
            nodeConnection?.setDiscordNode((prev: any) => ({
                ...prev,
                content: '',
            }));
            toast.success('Message sent successfully');
        } else {
            toast.error(response.message);
        }
    }, [inputText, nodeConnection?.discordNode]);

    const onStoreSlackContent = useCallback(async () => {
        console.log('Node Connection:', nodeConnection);
        console.log('Selected Channel:', selectedChannel);
    
        if (!nodeConnection?.slackNode || !selectedChannel) {
            toast.error('Missing Slack node or channel selection');
            return;
        }
    
        const response = await postMessageToSlack(
            nodeConnection.slackNode.slackAccessToken,
            [{ label: selectedChannel, value: selectedChannel }],
            inputText
        );
    
        if (response.message === 'Success') {
            toast.success('Message sent successfully');
            nodeConnection.setSlackNode((prev: any) => ({
                ...prev,
                content: '',
            }));
            setSelectedChannel('');
        } else {
            toast.error(response.message);
        }
    }, [nodeConnection, selectedChannel, inputText]);
    
    
    

    const handleListener = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/drive-activity');
            if (!response.ok) throw new Error('Failed to fetch activity');
            setIsListening(true);
            toast.success('Listening to Drive activity');
        } catch (error) {
            console.error('Error', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSlackChannels();
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };

    if (!nodeConnection) {
        return <div>Loading...</div>;
    }

    return (
        <div className='p-4'>
            <Accordion type="single" collapsible className='w-[240px]'>
                <AccordionItem value="item-1">
                    <AccordionTrigger className='no-underline border-none text-lg'>
                        Actions
                    </AccordionTrigger>
                    <AccordionContent>
                        <Card className='mb-4'>
                            <CardContent className='p-4'>
                                <p className='font-semibold mb-2'>Message</p>
                                <div className='space-y-4'>
                                    <Input
                                        type="text"
                                        value={inputText}
                                        onChange={handleInputChange}
                                        placeholder="Enter your message"
                                        className="border border-gray-300 p-2 w-full"
                                    />
                                    <Button
                                        onClick={onSendDiscordMessage}
                                        variant='outline'
                                        className='w-full'>
                                        Test Message
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>



                        {/* Slack channel selection */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-full">
                                    {selectedChannel ? `Selected: ${selectedChannel}` : 'Select a Slack Channel'}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 h-56">
                                <DropdownMenuLabel>Select Channel</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup value={selectedChannel} onValueChange={setSelectedChannel} className='h-56'>
                                    {channels.map((channel) => (
                                        <DropdownMenuRadioItem key={channel.value} value={channel.value} className='h-10'>
                                            {channel.label}
                                        </DropdownMenuRadioItem>
                                    ))}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>



                        <Card>
                            <CardContent className='p-4'>
                                {loading ? (
                                    <Button disabled className='w-full'>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleListener}
                                        variant={'outline'}
                                        className='w-full p-2'>
                                        {isListening ? 'Listening' : 'Create Listener'}
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default RenderAccordion;
