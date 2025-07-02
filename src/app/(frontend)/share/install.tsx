'use client'

import React, { useEffect, useState } from 'react'

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallButton, setShowInstallButton] = useState(false)

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault()
      // Stash the event so it can be triggered later
      setDeferredPrompt(e)
      // Update UI to show the install button
      setShowInstallButton(true)
    })

    window.addEventListener('appinstalled', () => {
      // Hide the install button when installed
      setShowInstallButton(false)
      // Clear the deferredPrompt
      setDeferredPrompt(null)
      // Log the installation to analytics
      console.log('PWA was installed')
    })
  }, [])

  const handleInstallClick = () => {
    if (!deferredPrompt) return

    // Show the install prompt
    deferredPrompt.prompt()

    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt')
      } else {
        console.log('User dismissed the install prompt')
      }
      // Clear the deferredPrompt for the next time
      setDeferredPrompt(null)
    })
  }

  if (!showInstallButton) return null

  return (
    <div className="mt-2">
      <button 
        onClick={handleInstallClick} 
        className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
      >
        Install App
      </button>
    </div>
  )
}