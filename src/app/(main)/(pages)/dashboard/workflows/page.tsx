import { Button } from '@/components/ui/button'
import React from 'react'
import { Plus } from 'lucide-react'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import WorkflowCard from '@/components/global/workflow-card'

function Page() {
  return (
    <div className='w-full min-h-screen p-5'>
      <div className='flex justify-between w-full items-center mb-5'>
        <h1 className='text-2xl'>Workflows</h1>
        <Drawer>
          <DrawerTrigger asChild>
            <Button className='flex items-center'>
              <Plus className='h-4 w-4' />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader  className='flex flex-col justify-center items-center'>
              <DrawerTitle>Create a New Workflow!</DrawerTitle>
              <DrawerDescription>Give your task a name and description</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter className='flex flex-col space-y-4'>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter the workflow name" />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input id="description" placeholder="Enter a description" />
              </div>
              <div className='flex justify-center space-x-2'>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
                <Button type="submit">Submit</Button>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
      <div>
        <WorkflowCard />
        <WorkflowCard />
        <WorkflowCard />
      </div>
    </div>
  )
}

export default Page
