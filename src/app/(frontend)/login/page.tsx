import React from 'react'
import { headers as getHeaders } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import Image from 'next/image'

import config from '@/payload.config'
import LoginForm from './LoginForm'
// Tailwind CSS is imported globally

export default async function LoginPage() {
  // Check if user is already logged in
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })
  
  // If already logged in, redirect to dashboard
  if (user) {
    redirect('/dashboard')
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-conic from-slate-200 via-slate-50 to-slate-200 to-75% dark:bg-conic dark:from-gray-800 dark:via-slate-900 dark:to-gray-800 dark:to-90% text-center p-6">
      <div className="w-full max-w-sm mx-auto bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700 p-8 space-y-8">
        <picture className="flex justify-center">
          <Image
            alt="Logo"
            height={100}
            src="/65.svg"
            width={100}
            priority
            className="rounded-full bg-conic from-gray-100 via-slate-100 to-gray-200 dark:from-gray-700 dark:via-slate-700 dark:to-gray-800 p-2"
          />
        </picture>
        <h1 className="text-3xl font-bold text-gray-700 dark:text-slate-300 text-shadow-none">
          Login
        </h1>
        
        <LoginForm />
        
        <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>Don&apos;t have an account? Contact an administrator.</p>
        </div>
      </div>
    </div>
  )
}