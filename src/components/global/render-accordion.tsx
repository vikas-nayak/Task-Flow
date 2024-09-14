import React, { useState, useCallback } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { toast } from 'sonner';

interface RenderAccordionProps {
    selectedNode: any; // Define a more specific type based on your node structure
}

const RenderAccordion: React.FC<RenderAccordionProps> = ({ selectedNode }) => {
    const [isListening, setIsListening] = useState(false);
    const [inputText, setInputText] = useState('');

    const handleListener = useCallback(async () => {

        try {
            const response = await fetch('/api/drive-activity');
            if (!response.ok) throw new Error('Failed to fetch activity');
            setIsListening(true);
            toast.success('Listening to Drive activity');
            
        } catch (error) {
            console.error('Error', error);
        }
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };

    const handleTestMessage = () => {
        // Handle test message functionality
        console.log('Test message:', inputText);
    };

    return (
        <div className='pl-6'>
            <Accordion type="single" collapsible className='w-[200px]'>
                <AccordionItem value="item-1">
                    <AccordionTrigger className='no-underline border-none'>Actions</AccordionTrigger>
                    <AccordionContent>
                        <Card className='h-[100px]'>
                            <CardContent>
                                <p>Message</p>
                                {selectedNode ? (
                                    selectedNode.data.type === 'googledrive' ? (
                                        <p>Google Drive Node</p>
                                    ) : (
                                        <div>
                                            <input
                                                type="text"
                                                value={inputText}
                                                onChange={handleInputChange}
                                                placeholder="Enter your message"
                                                className="border border-gray-300 p-2 mb-2 w-full"
                                            />
                                            <Button onClick={handleTestMessage} variant='ghost'>
                                                Test Message
                                            </Button>
                                        </div>
                                    )
                                ) : (
                                    <Button onClick={handleListener} variant={'ghost'} className='border border-gray-700 p-2 m-6'>
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
