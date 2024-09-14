"use client";

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import WorkflowCard from '@/components/global/workflow-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

function Page() {
  const { user } = useUser();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const userId = user?.id;

  const handleSubmit = async () => {
    if (!userId) {
      console.error('User ID is not available');
      return;
    }

    if (!name || !description) {
      setError('Name and description are required');
      return;
    }

    try {
      const response = await fetch('/api/workflows', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      });

      if (response.ok) {
        toast.success('Workflow created successfully');
        const result = await response.json();
        console.log('Workflow created:', result);
        setName('');
        setDescription('');
        setError(null);
      } else {
        const errorData = await response.json();
        toast.error('Failed to create workflow');
        console.error('Failed to create workflow:', errorData);
        setError(errorData.msg || 'Failed to create workflow');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Internal server error');
    }
  };

  return (
    <div className='w-full h-screen p-5'>
      <ScrollArea className='h-full scrollbar-hidden'>
        <div className='flex justify-between w-full items-center mb-5'>
          <h1 className='text-2xl'>Workflows</h1>
          <Drawer>
            <DrawerTrigger asChild>
              <Button className='flex items-center'>
                <Plus className='h-4 w-4' />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className='flex flex-col justify-center items-center'>
                <DrawerTitle>Create a New Workflow!</DrawerTitle>
                <DrawerDescription>
                  Give your task a name and description
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter className='flex flex-col space-y-4'>
                <div>
                  <Label htmlFor='name'>Name</Label>
                  <Input
                    id='name'
                    placeholder='Enter the workflow name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor='description'>Description</Label>
                  <Input
                    id='description'
                    placeholder='Enter a description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                {error && <p className='text-red-500'>{error}</p>}
                <div className='flex justify-center space-x-2'>
                  <DrawerClose asChild>
                    <Button type='button' onClick={handleSubmit}>
                      Submit
                    </Button>
                  </DrawerClose>
                </div>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
        <div>
          <WorkflowCard />
        </div>
      </ScrollArea>
    </div>
  );
}

export default Page;
