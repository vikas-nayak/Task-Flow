import React, { useState, useCallback } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { ConnectionProviderProps } from '@/providers/connection-provider';
import { onCreateNewPageInDatabase } from '@/app/(main)/(pages)/dashboard/connections/_actions/notion-connection';
import { Option } from '../ui/multiple-selector';
import { postMessageToSlack } from '@/app/(main)/(pages)/dashboard/connections/_actions/slack-connection';

interface RenderAccordionProps {
    selectedNode: any;
    nodeConnection: ConnectionProviderProps | null; // Allow null or undefined
}

const RenderAccordion: React.FC<RenderAccordionProps> = ({ selectedNode, nodeConnection }) => {
    const [isListening, setIsListening] = useState(false);
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);

    const onStoreSlackContent = useCallback(async () => {
        const response = await postMessageToSlack(
          nodeConnection?.slackNode.slackAccessToken, // Assuming this still contains the access token for legacy reasons
          [{ label: 'taskflow', value: 'C07KHJ1KWA0' }], // Hardcoded channel with the channel ID for taskflow
          'ganpati bappa morya!!' // Hardcoded content
        )
      
        if (response.message === 'Success') {
          toast.success('Message sent successfully')
          nodeConnection?.setSlackNode((prev: any) => ({
            ...prev,
            content: '', // Clear content after message is sent, though it's hardcoded
          }))
          // Comment out the dynamic channel logic if not in use
          // setChannels!([])
        } else {
          toast.error(response.message)
        }
      }, [nodeConnection?.slackNode])
      
      

    const onStoreNotionContent = useCallback(async () => {
        console.log('onStoreNotionContent');
        if (!nodeConnection || !nodeConnection.notionNode) {
            console.error('nodeConnection or nodeConnection.notionNode is undefined');
            return;
        }

        console.log(
            nodeConnection.notionNode.databaseId,
            nodeConnection.notionNode.accessToken,
            nodeConnection.notionNode.content
        );

        try {
            const response = await onCreateNewPageInDatabase(
                nodeConnection.notionNode.databaseId,
                nodeConnection.notionNode.accessToken,
                nodeConnection.notionNode.content
            );

            if (response) {
                nodeConnection.setNotionNode((prev: any) => ({
                    ...prev,
                    content: '',
                }));
                toast.success('New page created in database');
            }
        } catch (error) {
            toast.error(error.message);
            console.error('Error creating new page in database:', error);
        }
    }, [nodeConnection?.notionNode]);

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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };

    if (!nodeConnection) {
        return <div>Loading...</div>; // Handle loading state or default message
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
                                        onClick={onStoreSlackContent} 
                                        variant='outline' 
                                        className='w-full'>
                                        Test Message
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
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
