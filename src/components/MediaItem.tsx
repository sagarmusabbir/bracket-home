/**
 * MediaItem Component
 * 
 * I've created this component to display individual media items in the gallery.
 * It handles different media types (images, videos, files) and provides appropriate
 * interactions for each type. Images open in a modal, videos open in appropriate players,
 * and other files are handled accordingly.
 * 
 * The component includes subtle visual effects like slight blur on images that
 * clears on hover for a more polished user experience.
 * 
 * @author Musabbir Sagar <musabbir@thirdbracket.co.uk>
 */

'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import ImageModal from './ImageModal'

interface MediaItemProps {
  media: {
    id: string
    url: string
    alt: string
    filename?: string
    mimeType?: string
    filesize?: number
    width?: number
    height?: number
    isVideo?: boolean
  }
}

export default function MediaItem({ media }: MediaItemProps) {
  const [showModal, setShowModal] = useState(false)
  
  // I'm determining if this is a video file using multiple detection methods for reliability
  // First checking explicit flag, then MIME type, and finally the file extension
  // This comprehensive approach ensures we correctly identify videos even with incomplete metadata
  const isVideo = media.isVideo || 
                 media.mimeType?.startsWith('video/') || 
                 (media.filename && media.filename.match(/\.(mp4|mkv|avi|mov|wmv|flv|webm)$/i));
  
  // For images, I'm using a similar multi-layered detection approach
  // I first ensure it's not already identified as a video, then check MIME type and file extension
  // This prevents any media item from being incorrectly categorized as both video and image
  const isImage = !isVideo && (
                 media.mimeType?.startsWith('image/') || 
                 (media.filename && media.filename.match(/\.(jpg|jpeg|png|gif|webp|svg|bmp)$/i)));
  
  /**
   * Handles clicks on media items with different behaviors based on media type
   * 
   * I've implemented specialized handling for different media types:
   * - Images: Open in a custom modal with zoom capabilities
   * - Videos: Special handling for MKV files (VLC) and standard formats
   * - Other files: Default handling
   */
  const handleMediaClick = () => {
    if (isImage) {
      // For images, I'm showing our custom modal with enhanced viewing experience
      setShowModal(true)
    } else if (isVideo) {
      const isMkv = media.filename && media.filename.toLowerCase().endsWith('.mkv');
      
      if (isMkv) {
        // I've added special handling for MKV files since browsers don't natively support them
        // Using VLC-specific URL scheme for mobile devices with VLC installed
        const vlcUrl = `vlc://${window.location.origin}${media.url}`;
        
        // First attempt: Try to open with VLC URL scheme
        window.location.href = vlcUrl;
        
        // Second attempt: As a fallback for desktop users, I'm also opening the direct URL
        // The timeout prevents both actions from happening simultaneously on devices that support VLC
        setTimeout(() => {
          window.open(media.url, '_blank');
        }, 300);
      } else {
        // For standard video formats that browsers can handle natively
        window.open(media.url, '_blank');
      }
    }
  }
  
  return (
    <>
      <div 
        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm transition-transform hover:scale-105 cursor-pointer" 
        onClick={handleMediaClick}
      >
        <div className="relative aspect-square w-full overflow-hidden">
          {isImage ? (
            <Image 
              src={media.url} 
              alt={media.alt} 
              fill
              className="object-cover filter blur-[0.5px] hover:blur-0 transition-all duration-300"
            />
          ) : isVideo ? (
            <div className="w-full h-full bg-conic from-slate-500 via-gray-600 to-slate-500 dark:from-slate-600 dark:via-gray-700 dark:to-slate-600 flex items-center justify-center">
              <div className="text-white text-4xl">▶</div>
            </div>
          ) : (
            <div className="w-full h-full bg-conic from-slate-500 via-gray-600 to-slate-500 dark:from-slate-600 dark:via-gray-700 dark:to-slate-600 flex items-center justify-center">
              <span className="text-white">File</span>
            </div>
          )}
        </div>
        <div className="p-3">
          <p className="text-gray-700 dark:text-slate-300 font-medium truncate text-sm">{media.alt}</p>
          {isVideo && (
            <p className="text-gray-500 dark:text-slate-400 text-xs mt-1">
              {media.filename && media.filename.toLowerCase().endsWith('.mkv') 
                ? '🎬 Opens in VLC' 
                : '▶️ Video'}
            </p>
          )}
        </div>
      </div>
      
      {showModal && isImage && (
        <ImageModal 
          src={media.url} 
          alt={media.alt} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </>
  )
}