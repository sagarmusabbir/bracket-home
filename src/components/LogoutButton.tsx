'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

export default function LogoutButton({ small = false }) {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      // Call the logout endpoint
      const res = await fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      })

      if (res.ok) {
        // Redirect to home page after successful logout
        router.push('/')
        router.refresh()
      }
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  if (small) {
    return (
      <button
        onClick={handleLogout}
        className="bg-slate-200 hover:bg-slate-500 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-500 dark:text-slate-300 text-sm font-medium py-1.5 px-3 rounded-lg transition-colors shadow-sm"
        type="button"
      >
        Logout
      </button>
    )
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full bg-conic from-slate-600 via-gray-700 to-slate-600 hover:from-gray-700 hover:via-slate-800 hover:to-gray-700 dark:from-slate-600 dark:via-gray-600 dark:to-slate-600 text-slate-50 dark:text-slate-100 text-shadow-xs/30 text-shadow-black font-bold py-4 px-8 rounded-xl text-lg transition-colors"
      type="button"
    >
      Logout
    </button>
  )
}
