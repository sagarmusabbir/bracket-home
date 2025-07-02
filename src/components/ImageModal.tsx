'use client'

import React from 'react'
import Image from 'next/image'

interface ImageModalProps {
  src: string
  alt: string
  onClose: () => void
}

export default function ImageModal({ src, alt, onClose }: ImageModalProps) {
  // Close modal when clicking outside the image
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Close modal on escape key press
  React.useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    
    window.addEventListener('keydown', handleEscKey)
    return () => window.removeEventListener('keydown', handleEscKey)
  }, [onClose])

  return (
    <div 
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4" 
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-6xl h-[90vh]">
        <button 
          className="absolute -top-10 right-0 text-white text-4xl hover:text-gray-300 transition-colors" 
          onClick={onClose}
        >
          ×
        </button>
        <div className="relative w-full h-full">
          <Image 
            src={src} 
            alt={alt} 
            fill 
            className="object-contain filter blur-[0.5px] hover:blur-0 transition-all duration-300" 
            sizes="100vw"
            priority
          />
        </div>
      </div>
    </div>
  )
}