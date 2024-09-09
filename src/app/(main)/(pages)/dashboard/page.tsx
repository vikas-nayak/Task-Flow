import { checkUser } from '@/lib/checkUser';
import React from 'react';

async function DashboardPage() {
  const user = await checkUser();

  return (
    <div>
      <div className='flex justify-between pt-5'>
        <h1 className='text-3xl pl-6'>Welcome Back, {user?.name}!</h1>
      </div>
    </div>
  );
}

export default DashboardPage;
