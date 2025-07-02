import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import { redirect } from 'next/navigation'
import React from 'react'
// import { fileURLToPath } from 'url'

import config from '@/payload.config'
// Remove unused imports
import Link from 'next/link'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  // If user is authenticated, redirect to dashboard
  if (user) {
    redirect('/dashboard')
  }

  // const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-conic from-slate-200 via-slate-50  to-slate-200 to-75% dark:bg-conic dark:from-gray-800 dark:via-slate-900 dark:to-gray-800 dark:to-90% text-center p-6">
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
          Welcome To
          <br />
          Nowab Manjil
        </h1>
        <div className="pt-4 space-y-8">
          <Link
            className="inline-block w-full bg-conic from-slate-600 via-gray-700 to-slate-600 hover:from-gray-700 hover:via-slate-800 hover:to-gray-700 dark:from-slate-600 dark:via-gray-600 dark:to-slate-600 text-slate-50 dark:text-slate-100 text-shadow-xs/30 text-shadow-black font-bold py-4 px-8 rounded-xl text-lg transition-colors"
            href="/login"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}
