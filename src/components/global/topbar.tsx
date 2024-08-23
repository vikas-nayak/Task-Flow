import { UserButton } from '@clerk/nextjs';
import React from 'react'

type TopbarProps = {
    heading: string;
};


function Topbar({ heading }: TopbarProps) {
    return (
        <div>
            <div className="flex justify-between items-center pr-4">
                <h1  className='text-3xl p-6'>{heading}</h1>
            <UserButton />
            </div>
            <hr/>
        </div>
    )
}

export default Topbar