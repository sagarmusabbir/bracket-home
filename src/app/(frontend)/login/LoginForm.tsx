'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.errors?.[0]?.message || 'Login failed')
      }

      // Check user role and redirect accordingly
      if (data.user.role === 'admin') {
        // Admin users go to admin panel
        window.location.href = '/admin'
      } else {
        // Regular users go to dashboard
        router.push('/dashboard')
        router.refresh()
      }
    } catch (err: Error | unknown) {
      const error = err instanceof Error ? err : new Error('Login failed')
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50/90 dark:bg-red-900/30 border border-red-200 dark:border-red-800 p-4 rounded-lg backdrop-blur-sm">
          <p className="text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      <div className="space-y-3">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white backdrop-blur-sm focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400"
        />
      </div>

      <div className="space-y-3">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 text-left dark:text-gray-300"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white backdrop-blur-sm focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400"
        />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="inline-block w-full bg-conic from-slate-600 via-gray-700 to-slate-600 hover:from-gray-700 hover:via-slate-800 hover:to-gray-700 dark:from-slate-600 dark:via-gray-600 dark:to-slate-600 text-slate-50 dark:text-slate-100 text-shadow-xs/30 text-shadow-black font-bold py-4 px-8 rounded-xl text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </form>
  )
}