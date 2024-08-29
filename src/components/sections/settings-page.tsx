import React from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import Image from 'next/image'
import { Pencil } from 'lucide-react'


function SettingsPage() {

    return (
        <>
            <div className='flex justify-between pt-5'>
                <h1 className='text-2xl pl-6'>Settings</h1>

                <div className='pr-6'>
                    <Button variant="ghost" className='mr-2'>Cancel</Button>
                    <Button>Save</Button>
                </div>
            </div>
            <div>
                <div className='flex flex-col space-y-4 p-6'>
                    <div className='flex items-center'>

                            <Image
                                src="/discord.png"
                                alt="User Profile Image"
                                width={100}
                                height={100}
                            />
                            <Button variant="outline" className='ml-4'><Pencil className='h4- w-4 mr-2'/>Edit</Button>

                    </div>
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Enter the user name" className='border border-gray-300 rounded-md p-2 w-full' />
                    </div>
                    <div>
                        <Label htmlFor="description">Email</Label>
                        <Input id="description" placeholder="Enter your Email" className='border border-gray-300 rounded-md p-2 w-full' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SettingsPage