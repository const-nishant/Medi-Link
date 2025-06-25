// import { Card } from '@/components/ui/card'
'use client'
import { LoginForm } from '@/components/login'
// import { CardDemo } from '@/components/login'
import React from 'react'

const page = () => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 p-4 text-black'>
       <LoginForm/>
    </div>
  )
}

export default page