'use client';

import { useUser } from '@clerk/nextjs';
import React from 'react';

const DashboardPage = () => {
  const { user } = useUser();

  return (
    <div>
      <div className='flex justify-between pt-5'>
        <h1 className='text-3xl pl-6'>Welcome Back, {user?.firstName}!</h1>
      </div>
    </div>
  )
}

export default DashboardPage;
