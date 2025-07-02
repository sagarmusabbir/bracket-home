'use client'

import React from 'react'

export default function TailwindTest() {
  return (
    <div className="p-4 m-4 bg-blue-500 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold">Tailwind CSS is working!</h2>
      <p className="mt-2">This component is styled with Tailwind CSS classes.</p>
      <button className="mt-4 px-4 py-2 bg-white text-blue-500 rounded hover:bg-blue-100 transition-colors">
        Test Button
      </button>
    </div>
  )
}