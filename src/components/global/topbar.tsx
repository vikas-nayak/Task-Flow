import { UserButton } from '@clerk/nextjs';
import React from 'react';
import { ModeToggle } from './toggle-mode';
import { checkUser } from '@/lib/checkUser';

type TopbarProps = {
    heading: string;
};

function Topbar({ heading }: TopbarProps) {

    return (
        <div>
            <div className="flex justify-between items-center px-6 py-4">
                <h1 className="text-3xl">{heading}</h1>
                <div className="flex items-center space-x-4">
                    <ModeToggle />
                    <UserButton />
                </div>
            </div>
            <hr />
        </div>
    )
}

export default Topbar;
