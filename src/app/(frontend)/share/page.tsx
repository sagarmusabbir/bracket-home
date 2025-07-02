'use client'

import React, { useEffect, useState } from 'react'
import InstallPWA from './install'
// Tailwind CSS is imported globally

export default function SharePage() {
  const [appUrl, setAppUrl] = useState('')
  const [copied, setCopied] = useState(false)
  
  useEffect(() => {
    // Get the current URL
    const url = window.location.origin
    setAppUrl(url)
  }, [])
  
  const handleCopy = () => {
    navigator.clipboard.writeText(appUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">Share This App</h1>
      
      <div className="grid md:grid-cols-2 gap-8 bg-gray-800 rounded-lg p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Scan QR Code</h2>
          <div className="bg-white p-4 rounded-lg inline-block mb-4">
            {appUrl && (
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(appUrl)}`}
                alt="QR Code for app"
                width={200}
                height={200}
                className="mx-auto"
              />
            )}
          </div>
          <p className="text-gray-300 mb-6">Scan with your phone camera to open the app</p>
          <InstallPWA />
        </div>
        
        <div className="flex flex-col justify-center">
          <h2 className="text-xl font-semibold mb-4">Or Share This Link</h2>
          <div className="flex mb-6">
            <input 
              type="text" 
              readOnly 
              value={appUrl} 
              onClick={(e) => e.currentTarget.select()}
              className="flex-grow px-3 py-2 bg-gray-700 border border-gray-600 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={handleCopy}
              className={`px-4 py-2 font-medium rounded-r transition-colors ${copied ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p className="text-center">
            <a 
              href={`whatsapp://send?text=${encodeURIComponent(`Check out my media gallery: ${appUrl}`)}`} 
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Share on WhatsApp
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}