/**
 * Dashboard Page Component
 * 
 * I've designed this dashboard as the central hub of the application, providing
 * quick access to all main features. The interface follows a mobile-first approach
 * with card-based navigation and intuitive visual cues.
 * 
 * The dashboard adapts to user roles, showing admin-specific options when applicable,
 * and features a modern design with conic gradients and subtle visual effects.
 * 
 * @author Musabbir Sagar <musabbir@thirdbracket.co.uk>
 */

import { headers as getHeaders } from 'next/headers'
import Image from 'next/image'
import { getPayload } from 'payload'
import { redirect } from 'next/navigation'
import React from 'react'
import Link from 'next/link'

import config from '@/payload.config'
import LogoutButton from '@/components/LogoutButton'

export default async function DashboardPage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  
  // I'm implementing authentication verification to ensure dashboard security
  // This retrieves the user object from the session using PayloadCMS auth
  const { user } = await payload.auth({ headers })
  
  // If no authenticated user is found, I redirect to the home/login page
  // This prevents unauthorized access to the dashboard and its features
  if (!user) {
    redirect('/')
  }
  
  // I'm checking if the user has admin privileges to conditionally render admin features
  // This role-based access control ensures only authorized users can access admin functions
  const isAdmin = user.role === 'admin'

  return (
    <div className="min-h-screen bg-conic from-slate-200 via-slate-50 to-slate-200 to-75% dark:bg-conic dark:from-gray-800 dark:via-slate-900 dark:to-gray-800 dark:to-90% p-6">
      {/* Header Section
         * I've designed this header to provide app identity and quick access to logout
         * The logo and app name establish branding while the logout button is easily accessible
         */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Image
            alt="Logo"
            height={50}
            src="/65.svg"
            width={50}
            priority
            className="rounded-full bg-conic from-gray-100 via-slate-100 to-gray-200 dark:from-gray-700 dark:via-slate-700 dark:to-gray-800 p-1"
          />
          <h1 className="ml-3 text-2xl font-bold text-gray-700 dark:text-slate-300">
            Nowab Manjil
          </h1>
        </div>
        <LogoutButton small />
      </header>

      {/* Welcome Message */}
      <div className="mb-8">
        <h2 className="text-xl font-medium text-gray-700 dark:text-slate-300">
          Welcome, <span className="font-bold">{user.name || user.email}</span>
        </h2>
      </div>
      
      {/* Main Actions Section
         * I've implemented this section as a series of card-based navigation elements
         * Each card features an icon, title, description, and visual cues for interaction
         * The cards use consistent styling with subtle visual differences for different actions
         */}
      <div className="space-y-6 mb-8">
        <Link 
          href="/gallery"
          className="w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700 p-6 flex items-center"
        >
          <div className="w-16 h-16 rounded-full bg-conic from-slate-500 via-gray-600 to-slate-500 dark:from-slate-600 dark:via-gray-700 dark:to-slate-600 flex items-center justify-center text-white">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 7.28595 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447ZM16 10C17.1046 10 18 9.10457 18 8C18 6.89543 17.1046 6 16 6C14.8954 6 14 6.89543 14 8C14 9.10457 14.8954 10 16 10ZM6.32092 13.1038C6.94501 12.5241 7.91991 12.5566 8.50397 13.1766L11.1515 15.9869C11.9509 16.8356 13.2596 16.9499 14.1941 16.2527C14.8073 15.7953 15.661 15.8473 16.2141 16.3757L18.4819 18.5423C18.7814 18.8284 19.2562 18.8176 19.5423 18.5181C19.8284 18.2186 19.8176 17.7438 19.5181 17.4577L17.2503 15.2911C16.1679 14.257 14.4971 14.1553 13.2972 15.0504C12.9735 15.2919 12.5202 15.2523 12.2433 14.9584L9.59579 12.1481C8.44651 10.9281 6.52816 10.8641 5.3001 12.0047L4.4896 12.7575C4.1861 13.0394 4.16858 13.5139 4.45047 13.8174C4.73236 14.1209 5.20691 14.1385 5.51041 13.8566L6.32092 13.1038Z" fill="currentColor"/>
            </svg>
          </div>
          <div className="ml-5 flex-1">
            <h3 className="text-xl font-bold text-gray-700 dark:text-slate-300">Gallery</h3>
            <p className="text-sm text-gray-500 dark:text-slate-400">Browse all media files</p>
          </div>
          <div className="text-gray-400 dark:text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        <Link 
          href="/upload"
          className="w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700 p-6 flex items-center"
        >
          <div className="w-16 h-16 rounded-full bg-conic from-slate-500 via-gray-600 to-slate-500 dark:from-slate-600 dark:via-gray-700 dark:to-slate-600 flex items-center justify-center text-white">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12ZM12 17.75C12.4142 17.75 12.75 17.4142 12.75 17V11.8107L14.4697 13.5303C14.7626 13.8232 15.2374 13.8232 15.5303 13.5303C15.8232 13.2374 15.8232 12.7626 15.5303 12.4697L12.5303 9.46967C12.3897 9.32902 12.1989 9.25 12 9.25C11.8011 9.25 11.6103 9.32902 11.4697 9.46967L8.46967 12.4697C8.17678 12.7626 8.17678 13.2374 8.46967 13.5303C8.76256 13.8232 9.23744 13.8232 9.53033 13.5303L11.25 11.8107V17C11.25 17.4142 11.5858 17.75 12 17.75ZM8 7.75C7.58579 7.75 7.25 7.41421 7.25 7C7.25 6.58579 7.58579 6.25 8 6.25H16C16.4142 6.25 16.75 6.58579 16.75 7C16.75 7.41421 16.4142 7.75 16 7.75H8Z" fill="currentColor"/>
            </svg>
          </div>
          <div className="ml-5 flex-1">
            <h3 className="text-xl font-bold text-gray-700 dark:text-slate-300">Upload</h3>
            <p className="text-sm text-gray-500 dark:text-slate-400">Add new photos and videos</p>
          </div>
          <div className="text-gray-400 dark:text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        <Link 
          href="/share"
          className="block w-10 h-10 ml-auto mr-0 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          aria-label="Share App"
        >
          <svg width="100%" height="100%" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 25.472q0 2.368 1.664 4.032t4.032 1.664h18.944q2.336 0 4-1.664t1.664-4.032v-8.192l-3.776 3.168v5.024q0 0.8-0.544 1.344t-1.344 0.576h-18.944q-0.8 0-1.344-0.576t-0.544-1.344v-18.944q0-0.768 0.544-1.344t1.344-0.544h9.472v-3.776h-9.472q-2.368 0-4.032 1.664t-1.664 4v18.944zM5.696 19.808q0 2.752 1.088 5.28 0.512-2.944 2.24-5.344t4.288-3.872 5.632-1.664v5.6l11.36-9.472-11.36-9.472v5.664q-2.688 0-5.152 1.056t-4.224 2.848-2.848 4.224-1.024 5.152zM32 22.080v0 0 0z"/>
          </svg>
        </Link>

        {/* Admin Panel Access - Conditionally rendered based on user role
           * I've designed this with a distinct purple color scheme to differentiate it
           * from standard user actions, making it clear this is an administrative function
           */}
        {isAdmin && (
          <a
            className="w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700 p-6 flex items-center"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_blank"
          >
            <div className="w-16 h-16 rounded-full bg-conic from-purple-500 via-purple-600 to-purple-500 dark:from-purple-600 dark:via-purple-700 dark:to-purple-600 flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="ml-5 flex-1">
              <h3 className="text-xl font-bold text-gray-700 dark:text-slate-300">Admin Panel</h3>
              <p className="text-sm text-gray-500 dark:text-slate-400">Manage content and users</p>
            </div>
            <div className="text-gray-400 dark:text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </a>
        )}
      </div>
      
      {/* Footer Section
         * I've added a simple footer with dynamic copyright year that updates automatically
         * The styling is subtle to avoid competing with the main content while still providing
         * necessary attribution and branding
         */}
      <footer className="text-center text-sm text-gray-500 dark:text-gray-400 mt-auto">
        <p>© {new Date().getFullYear()} Nowab Manjil</p>
      </footer>
    </div>
  )
}