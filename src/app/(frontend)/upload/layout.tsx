import React from 'react'
import Link from 'next/link'
import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import { redirect } from 'next/navigation'
import LogoutButton from '@/components/LogoutButton'

import config from '@/payload.config'

export default async function UploadLayout({ children }: { children: React.ReactNode }) {
  // Check if user is authenticated
  const headersList = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers: headersList })
  
  // Redirect to home if not authenticated
  if (!user) {
    redirect('/')
  }
  
  return (
    <div className="min-h-screen bg-conic from-slate-200 via-slate-50 to-slate-200 to-75% dark:bg-conic dark:from-gray-800 dark:via-slate-900 dark:to-gray-800 dark:to-90%">
      <header className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border-b border-slate-200/50 dark:border-slate-700/50 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/gallery" className="text-gray-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Gallery
          </Link>
          
          <h1 className="text-xl font-bold text-gray-700 dark:text-slate-300">Upload Media</h1>
          
          <div className="flex items-center space-x-2">
            <Link 
              href="/share"
              className="w-8 h-8 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              aria-label="Share App"
            >
              <svg width="100%" height="100%" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 25.472q0 2.368 1.664 4.032t4.032 1.664h18.944q2.336 0 4-1.664t1.664-4.032v-8.192l-3.776 3.168v5.024q0 0.8-0.544 1.344t-1.344 0.576h-18.944q-0.8 0-1.344-0.576t-0.544-1.344v-18.944q0-0.768 0.544-1.344t1.344-0.544h9.472v-3.776h-9.472q-2.368 0-4.032 1.664t-1.664 4v18.944zM5.696 19.808q0 2.752 1.088 5.28 0.512-2.944 2.24-5.344t4.288-3.872 5.632-1.664v5.6l11.36-9.472-11.36-9.472v5.664q-2.688 0-5.152 1.056t-4.224 2.848-2.848 4.224-1.024 5.152zM32 22.080v0 0 0z"/>
              </svg>
            </Link>
            <LogoutButton small />
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-6">
        {children}
      </div>
    </div>
  )
}