import { checkUser } from '@/lib/checkUser'
import React from 'react'

const DashboardPage = () => {
  const user = checkUser()
  return (
    <div>
      <div className='flex justify-between pt-5'>
        <h1 className='text-3xl pl-6'>Welcome Back, User!</h1>
      </div>
    </div>
  )
}

export default DashboardPage