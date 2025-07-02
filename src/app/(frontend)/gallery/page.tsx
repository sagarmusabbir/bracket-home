/**
 * Gallery Page Component
 * 
 * I've designed this page to display all media items in a responsive grid layout.
 * The page fetches media from both standard and custom media collections,
 * combines them, and displays them in a visually appealing way.
 * 
 * @author Musabbir Sagar <musabbir@thirdbracket.co.uk>
 */

import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import { redirect } from 'next/navigation'
import React from 'react'

import config from '@/payload.config'
import MediaItem from '@/components/MediaItem'

export default async function GalleryPage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  
  // I'm implementing authentication check here to ensure only logged-in users can access the gallery
  // This is important for security and privacy of the media content
  const { user } = await payload.auth({ headers })
  
  // If no user is found in the session, I redirect them to the login page
  // This creates a secure boundary around all media content
  if (!user) {
    redirect('/')
  }
  
  // I'm fetching media items from both collections simultaneously using Promise.all for better performance
  // This approach reduces the overall loading time by making parallel requests
  const [mediaResponse, customMediaResponse] = await Promise.all([
    payload.find({
      collection: 'media',      // Standard media collection from PayloadCMS
      limit: 100,              // Limiting to 100 items for performance reasons
    }),
    payload.find({
      collection: 'custom-media', // Our custom media collection with additional metadata
      limit: 100,                // Same limit for consistency
      sort: '-createdAt',        // I'm showing newest uploads first for better UX
    })
  ])
  
  // I'm combining both media sources into a single array for unified display
  // Custom media is placed first because it typically contains more important user uploads
  const allMedia = [
    ...customMediaResponse.docs,
    ...mediaResponse.docs
  ]

  return (
    <>
      {/* Media count and filter options */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-700 dark:text-slate-300">
          {allMedia.length} {allMedia.length === 1 ? 'item' : 'items'}
        </p>
        <div className="text-sm text-gray-500 dark:text-slate-400">
          All media
        </div>
      </div>
      
      {/* Media grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {allMedia.map((media) => (
          <MediaItem key={media.id} media={media} />
        ))}
      </div>
      
      {/* Empty state */}
      {allMedia.length === 0 && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700 p-8 text-center mt-8">
          <div className="text-4xl mb-4">📁</div>
          <h3 className="text-xl font-bold text-gray-700 dark:text-slate-300 mb-2">No media found</h3>
          <p className="text-gray-500 dark:text-slate-400">
            Upload some photos or videos to get started
          </p>
        </div>
      )}
    </>
  )
}