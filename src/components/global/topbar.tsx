import React from 'react'

type TopbarProps = {
    heading: string;
};


function Topbar({ heading }: TopbarProps) {
    return (
        <div>
            <div className='text-3xl p-6'>
                <h1>{heading}</h1>
            </div>
            <hr/>
        </div>
    )
}

export default Topbar