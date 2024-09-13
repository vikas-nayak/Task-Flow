import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'

function RenderAccordion() {
    return (
        <div className='pl-6'>
            <Accordion type="single" collapsible className='w-[200px]'>
                <AccordionItem value="item-1">
                    <AccordionTrigger className='no-underline border-none'>Actions</AccordionTrigger>
                    <AccordionContent>
                        <Card className='h-[100px]'>
                            <CardContent>
                                <p>Message</p>
                                <Button variant={'ghost'} className='border border-gray-700 p-2 m-6'>Create Listener</Button>
                            </CardContent>
                        </Card>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default RenderAccordion
