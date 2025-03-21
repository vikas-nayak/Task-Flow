import React, { useState, useCallback, useEffect } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Loader2, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { ConnectionProviderProps } from '@/providers/connection-provider';
import { postMessageToSlack } from '@/app/(main)/(pages)/dashboard/connections/_actions/slack-connection';
import { postContentToWebHook } from '@/app/(main)/(pages)/dashboard/connections/_actions/discord-connection';
import { Option } from '@/store';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '../ui/textarea';

interface RenderAccordionProps {
    selectedNode: any;
    nodeConnection: ConnectionProviderProps | null;
}

const RenderAccordion: React.FC<RenderAccordionProps> = ({ selectedNode, nodeConnection }) => {
    const [isListening, setIsListening] = useState(false);
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);
    const [channelLoading, setChannelLoading] = useState(false);
    const [channels, setChannels] = useState<Option[]>([]);
    const [selectedChannel, setSelectedChannel] = useState<string>('');
    const [isMailListening, setMailIsListening] = useState(false);

    // New Gmail-specific state
    const [emailSubject, setEmailSubject] = useState('subject');
    const [emailBody, setEmailBody] = useState('body');
    const [emailTo, setEmailTo] = useState('email');
    const [isCheckingEmails, setIsCheckingEmails] = useState(false);




    // Gmail Functions
    const sendTestEmail = async () => {
        if (!emailTo || !emailSubject || !emailBody) {
            toast.error('Please fill in all email fields');
            return;
        }

        try {
            const response = await fetch('/api/send-gmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: emailTo,
                    subject: emailSubject,
                    body: emailBody,
                }),
            });

            if (response.ok) {
                toast.success('Test email sent successfully');

            } else {
                const error = await response.json();
                toast.error(`Failed to send email: ${error.message}`);
            }
        } catch (error) {
            console.error('Error sending email:', error);
            toast.error('Failed to send test email');
        }
    };

    const onAddTemplateGmail = useCallback(async () => {
        if (!nodeConnection) {
            toast.error('Node connection is missing.');
            return;
        }

        const content = {
            to: emailTo,
            subject: emailSubject,
            body: emailBody,
        };

        let workflowId;

        try {
            const response = await fetch('/api/get-workflow-id');
            const workflowIds = await response.json();
            workflowId = workflowIds[0] || 'be41a851-b67c-4410-8a7f-fc00e7f06496';
        } catch (error) {
            console.error('Error fetching workflow IDs:', error);
            toast.error('Error fetching workflow IDs');
            return;
        }

        try {
            const saveResponse = await fetch('/api/save-gmail-template', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ workflowId, content }),
            });

            if (saveResponse.ok) {
                toast.success('Gmail Template saved');
            } else {
                const errorData = await saveResponse.json();
                toast.error(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error saving Gmail template:', error);
            toast.error('Failed to save Gmail template');
        }
    }, [emailTo, emailSubject, emailBody, nodeConnection]);

    const handleEmailCheck = async () => {
        setIsCheckingEmails(true);
        try {
            const response = await fetch('/api/check-gmail');
            if (!response.ok) throw new Error('Failed to check emails');
            toast.success('Gmail listener activated');
        } catch (error) {
            console.error('Error checking emails:', error);
            toast.error('Failed to activate Gmail listener');
        } finally {
            setIsCheckingEmails(false);
        }
    };






    // Hardcoded Slack Node
    const hardcodedSlackNode = {
        slackAccessToken: process.env.NEXT_PUBLIC_TEMP_SLACK_ACCESS_TOKEN, // Replace with your actual token
    };

    const onSendDiscordMessage = useCallback(async () => {
        const response = await postContentToWebHook(
            inputText,
            nodeConnection?.discordNode.webhookURL || "https://discord.com/api/webhooks/1299226963470454844/Bm1_qiUqZxZuoeCjZmNYbSphKbNsj7Zlh69WG4ite8KBT1zFMNY9KBd0hDrF4MAiGVvD"
        );

        if (response.message === 'success') {
            nodeConnection?.setDiscordNode((prev: any) => ({
                ...prev,
                content: '',
            }));
            toast.success('Message sent to Discord successfully');
        } else {
            toast.error(response.message);
        }
    }, [inputText, nodeConnection?.discordNode]);

    const onAddTemplateDiscord = useCallback(async () => {
        if (!nodeConnection) {
            toast.error('Node connection is missing.');
            return;
        }

        const content = inputText;
        let workflowId;

        try {
            const response = await fetch('/api/get-workflow-id');

            if (!response.ok) {
                throw new Error('Failed to fetch workflow IDs');
            }

            const workflowIds = await response.json();

            if (workflowIds.length > 0) {
                workflowId = workflowIds[0];
            } else {
                workflowId = 'be41a851-b67c-4410-8a7f-fc00e7f06496'; // just in case XD
            }
        } catch (error) {
            console.error('Error fetching workflow IDs:', error);
            toast.error('Error fetching workflow IDs');
            return;
        }

        const saveResponse = await fetch('/api/save-discord-template', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ workflowId, content }),
        });

        if (saveResponse.ok) {
            const data = await saveResponse.json();
            toast.success('Discord Template saved');
        } else {
            const errorData = await saveResponse.json();
            toast.error(`Error: ${errorData.message}`);
        }
    }, [inputText, nodeConnection]);

    const initializeNodeConnection = () => {
        return {
            slackNode: hardcodedSlackNode,
            setSlackNode: (update: any) => {
                console.log("Update Slack Node:", update);
            },
            discordNode: { webhookURL: '' } // Placeholder for Discord Node
        };
    };

    useEffect(() => {
        const conn = initializeNodeConnection();
        setChannels([]); // Initialize channels if needed
    }, []);

    const fetchSlackChannels = async () => {
        setChannelLoading(true);
        // Hardcoded channels for testing
        const hardcodedChannels = [
            { id: 'C07KHJ0EH8C', label: 'social' },
            { id: 'C07KHJ0EH8D', label: 'testing' },
            // Add more channels as needed
        ];
        setChannels(hardcodedChannels.map(channel => ({
            label: channel.label,
            value: channel.id
        })));
        setChannelLoading(false);
    };

    const onStoreSlackContent = useCallback(async () => {
        const selectedChannelLabel = channels.find(channel => channel.value === selectedChannel)?.label || selectedChannel;

        if (!hardcodedSlackNode || !hardcodedSlackNode.slackAccessToken) {
            toast.error('Missing Slack node or access token');
            return;
        }

        if (!selectedChannel) {
            toast.error('Please select a Slack channel');
            return;
        }

        try {
            const response = await postMessageToSlack(
                hardcodedSlackNode.slackAccessToken, // Use hardcoded access token
                [{ label: selectedChannelLabel, value: selectedChannel }], // Pass the selected channel
                inputText // The message to send
            );

            if (response.message === 'Success') {
                toast.success('Message sent successfully to Slack');
                setInputText(''); // Reset input after sending
                setSelectedChannel(''); // Clear selected channel after sending
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error('Error sending message to Slack:', error);
            toast.error('Failed to send message to Slack');
        }
    }, [selectedChannel, inputText, channels]);

    useEffect(() => {
        fetchSlackChannels();
    }, []);




    const onAddTemplateSlack = useCallback(async () => {
        if (!nodeConnection) {
            toast.error('Node connection is missing.');
            return;
        }

        const content = inputText;
        let workflowId;

        try {
            const response = await fetch('/api/get-workflow-id');

            if (!response.ok) {
                throw new Error('Failed to fetch workflow IDs');
            }

            const workflowIds = await response.json();

            if (workflowIds.length > 0) {
                workflowId = workflowIds[0];
            } else {
                workflowId = 'be41a851-b67c-4410-8a7f-fc00e7f06496'; // just in case XD
            }
        } catch (error) {
            console.error('Error fetching workflow IDs:', error);
            toast.error('Error fetching workflow IDs');
            return;
        }

        const saveResponse = await fetch('/api/save-slack-template', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ workflowId, content }),
        });

        if (saveResponse.ok) {
            const data = await saveResponse.json();
            toast.success('Slack Template saved');
        } else {
            const errorData = await saveResponse.json();
            toast.error(`Error: ${errorData.message}`);
        }
    }, [inputText, nodeConnection]);





    const sendDataToNotion = async () => {
        const response = await fetch('/api/send-notion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: inputText,
                content: 'something something',
            }),
        });

        const data = await response.json();
        if (response.ok) {
            console.log('Data sent successfully:', data);
            toast.success('Notion data sent successfully');
        } else {
            console.error('Error sending data:', data.error);
            toast.error('Failed to send data to Notion');
        }
    };

    const onAddTemplateNotion = useCallback(async () => {
        if (!nodeConnection) {
            toast.error('Node connection is missing.');
            return;
        }

        const content = inputText;
        let workflowId;

        try {
            const response = await fetch('/api/get-workflow-id');

            if (!response.ok) {
                throw new Error('Failed to fetch workflow IDs');
            }

            const workflowIds = await response.json();

            if (workflowIds.length > 0) {
                workflowId = workflowIds[0];
            } else {
                workflowId = 'be41a851-b67c-4410-8a7f-fc00e7f06496'; // just in case XD
            }
        } catch (error) {
            console.error('Error fetching workflow IDs:', error);
            toast.error('Error fetching workflow IDs');
            return;
        }

        const saveResponse = await fetch('/api/save-notion-template', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ workflowId, content }),
        });

        if (saveResponse.ok) {
            const data = await saveResponse.json();
            toast.success('Notion Template saved');
        } else {
            const errorData = await saveResponse.json();
            toast.error(`Error: ${errorData.message}`);
        }
    }, [inputText, nodeConnection]);





    const handleListener = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/drive-activity');
            if (!response.ok) throw new Error('Failed to fetch activity');
            setIsListening(true);
            toast.success('Listening to Drive activity');
        } catch (error) {
            console.error('Error', error);
            toast.error('Error while listening to Drive activity');
        } finally {
            setLoading(false);
        }
    }, []);





    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };

    const isNotionNode = selectedNode?.data?.name === 'Notion';
    const isDiscordNode = selectedNode?.data?.name === 'Discord';
    const isSlackNode = selectedNode?.data?.name === 'Slack';
    const isDriveNode = selectedNode?.data?.name === 'Google Drive';
    const isGmailNode = selectedNode?.data?.name === 'Gmail';


    if (!nodeConnection) {
        return <div>Loading...</div>;
    }

    return (
        <div className='p-4'>
            <ScrollArea className='h-[400px]'>
                <Accordion type="single" defaultValue='item' collapsible className='w-[240px]'>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className='no-underline border-none text-lg'>
                            Actions
                        </AccordionTrigger>
                        <AccordionContent>
                            <Card className='mb-4'>
                                <CardContent className='p-4'>
                                    <div className='space-y-4'>

                                        {isDiscordNode && (
                                            <>
                                                <p className='font-semibold mb-2'>Message</p>
                                                <Input
                                                    type="text"
                                                    value={inputText}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter your message"
                                                    className="border border-gray-300 p-2 w-full"
                                                />
                                                <Button onClick={onSendDiscordMessage} variant='outline' className='w-full'>
                                                    Test Discord
                                                </Button>
                                                <Button onClick={onAddTemplateDiscord} variant='default' className='w-full'>
                                                    Save Discord Template
                                                </Button>
                                            </>
                                        )}

                                        {/* Render Notion buttons */}
                                        {isNotionNode && (
                                            <>
                                                <p className='font-semibold mb-2'>Message</p>
                                                <Input
                                                    type="text"
                                                    value={inputText}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter your message"
                                                    className="border border-gray-300 p-2 w-full"
                                                />
                                                <Button onClick={sendDataToNotion} variant='outline' className='w-full'>
                                                    Test Notion
                                                </Button>
                                                <Button onClick={onAddTemplateNotion} variant='default' className='w-full'>
                                                    Save Notion Template
                                                </Button>
                                            </>
                                        )}

                                        {/* Render Slack buttons */}
                                        {isSlackNode && (
                                            <>
                                                <p className='font-semibold mb-2'>Message</p>
                                                <Input
                                                    type="text"
                                                    value={inputText}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter your message"
                                                    className="border border-gray-300 p-2 w-full"
                                                />
                                                <Button onClick={onStoreSlackContent} variant='outline' className='w-full'>
                                                    Test Slack
                                                </Button>
                                                <Button onClick={onAddTemplateSlack} variant='default' className='w-full'>
                                                    Save Slack Template
                                                </Button>
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
                                            </>
                                        )}

                                        {/* Render Drive buttons */}
                                        {isDriveNode && (
                                            <>
                                                {loading ? (
                                                    <Button disabled className='w-full'>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Please wait
                                                    </Button>
                                                ) : (
                                                    <Button onClick={handleListener} variant={'outline'} className='w-full p-2'>
                                                        {isListening ? 'Listening' : 'Create Listener'}
                                                    </Button>
                                                )}
                                            </>
                                        )}



                                        {isGmailNode && (
                                            <>
                                                <p className="font-semibold mb-2">Email Details</p>
                                                <Input
                                                    type="email"
                                                    value={emailTo}
                                                    onChange={(e) => setEmailTo(e.target.value)}
                                                    placeholder="Recipient Email"
                                                    className="mb-2"
                                                />
                                                <Input
                                                    type="text"
                                                    value={emailSubject}
                                                    onChange={(e) => setEmailSubject(e.target.value)}
                                                    placeholder="Subject"
                                                    className="mb-2"
                                                />
                                                <Textarea
                                                    value={emailBody}
                                                    onChange={(e) => setEmailBody(e.target.value)}
                                                    placeholder="Email Body"
                                                    className="mb-2"
                                                    rows={4}
                                                />
                                                <Button
                                                    onClick={sendTestEmail}
                                                    variant="outline"
                                                    className="w-full"
                                                >
                                                    <Mail className="mr-2 h-4 w-4" />
                                                    Test Gmail
                                                </Button>
                                                <Button
                                                    onClick={onAddTemplateGmail}
                                                    variant="default"
                                                    className="w-full"
                                                >
                                                    Save Gmail Template
                                                </Button>
                                                <Button
                                                    onClick={handleEmailCheck}
                                                    variant="outline"
                                                    className="w-full"
                                                    disabled={isCheckingEmails}
                                                >
                                                    {isCheckingEmails ? (
                                                        <>
                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                            Checking Emails...
                                                        </>
                                                    ) : isMailListening ? (
                                                        'Listening...'
                                                    ) : (
                                                        'Create Email Listener'
                                                    )}
                                                </Button>
                                            </>
                                        )}
                                        
                                    </div>
                                </CardContent>
                            </Card>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </ScrollArea>
        </div>
    );
};

export default RenderAccordion;
