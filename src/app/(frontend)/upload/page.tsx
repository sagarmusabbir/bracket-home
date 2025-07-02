'use client'

import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return
    
    setFiles(Array.from(selectedFiles))
    setError(null)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    handleFileSelect(e.dataTransfer.files)
  }

  const openFileSelector = () => {
    fileInputRef.current?.click()
  }

  const handleUpload = async () => {
    if (files.length === 0) {
      setError('Please select files to upload')
      return
    }

    setUploading(true)
    setProgress(0)
    setError(null)
    
    // Track successful uploads
    let successCount = 0
    let errorCount = 0
    
    // Process files in batches of 5 to avoid overwhelming the server
    const batchSize = 5
    const totalFiles = files.length
    
    for (let i = 0; i < totalFiles; i += batchSize) {
      const batch = files.slice(i, i + batchSize)
      
      // Upload batch in parallel
      const results = await Promise.allSettled(
        batch.map(file => uploadSingleFile(file))
      )
      
      // Count successes and failures
      results.forEach(result => {
        if (result.status === 'fulfilled' && result.value) {
          successCount++
        } else {
          errorCount++
        }
      })
      
      // Update progress
      setProgress(Math.round(((i + batch.length) / totalFiles) * 100))
    }
    
    setUploading(false)
    
    if (errorCount === 0) {
      setSuccess(true)
      setFiles([])
      // Redirect to gallery after 2 seconds
      setTimeout(() => {
        router.push('/gallery')
        router.refresh()
      }, 2000)
    } else {
      setError(`${errorCount} files failed to upload. ${successCount} files uploaded successfully.`)
    }
  }
  
  const uploadSingleFile = async (file: File): Promise<boolean> => {
    try {
      // Create form data
      const formData = new FormData()
      formData.append('file', file)
      
      // Add alt text (using filename as default)
      const altText = file.name.split('.')[0].replace(/[_-]/g, ' ')
      // Make sure alt text is not empty and has at least 1 character
      formData.append('alt', altText || 'Media file')
      
      // Upload to our custom API route
      const response = await fetch('/api/custom-upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      })
      
      if (!response.ok) {
        throw new Error(`Failed to upload ${file.name}`)
      }
      
      return true
    } catch (err) {
      console.error(`Error uploading ${file.name}:`, err)
      return false
    }
  }
  
  const clearSelection = () => {
    setFiles([])
  }

  return (
    <>
      <div 
        className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border-2 border-dashed ${uploading ? 'border-slate-400 dark:border-slate-500' : 'border-slate-300 dark:border-slate-600'} p-8 text-center mb-8`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {!uploading ? (
          <>
            <div className="text-5xl mb-4">📤</div>
            <h2 className="text-xl font-bold text-gray-700 dark:text-slate-300 mb-2">Drag & Drop Files Here</h2>
            <p className="text-gray-500 dark:text-slate-400 mb-6">Or use the button below:</p>
            
            <div className="flex justify-center">
              <button 
                type="button" 
                className="bg-conic from-slate-600 via-gray-700 to-slate-600 hover:from-gray-700 hover:via-slate-800 hover:to-gray-700 dark:from-slate-600 dark:via-gray-600 dark:to-slate-600 text-slate-50 dark:text-slate-100 font-medium py-3 px-6 rounded-xl transition-colors"
                onClick={openFileSelector}
              >
                Select Files
              </button>
            </div>
          </>
        ) : (
          <div className="py-4">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-4">
              <div 
                className="h-full bg-conic from-slate-500 via-gray-600 to-slate-500 dark:from-slate-600 dark:via-gray-700 dark:to-slate-600 transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-lg text-gray-700 dark:text-slate-300">Uploading... {progress}%</p>
          </div>
        )}
      </div>
      
      {files.length > 0 && !uploading && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-700 dark:text-slate-300">Selected Files ({files.length})</h3>
            <button 
              type="button" 
              className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 border border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 px-3 py-1 rounded-lg text-sm transition-colors"
              onClick={clearSelection}
            >
              Clear All
            </button>
          </div>
          
          <div className="max-h-64 overflow-y-auto mb-6">
            {files.slice(0, 10).map((file, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-gray-700 dark:text-slate-300 truncate max-w-[70%]">{file.name}</span>
                <span className="text-gray-500 dark:text-slate-400 text-sm">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
            ))}
            
            {files.length > 10 && (
              <div className="py-2 text-center text-gray-500 dark:text-slate-400 italic">
                ...and {files.length - 10} more files
              </div>
            )}
          </div>
          
          <div className="text-center">
            <button 
              type="button" 
              className="bg-conic from-slate-600 via-gray-700 to-slate-600 hover:from-gray-700 hover:via-slate-800 hover:to-gray-700 dark:from-slate-600 dark:via-gray-600 dark:to-slate-600 text-slate-50 dark:text-slate-100 text-shadow-xs/30 text-shadow-black font-bold py-4 px-8 rounded-xl text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleUpload}
              disabled={uploading}
            >
              Upload {files.length} Files
            </button>
          </div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50/80 dark:bg-red-900/30 border border-red-200 dark:border-red-800 p-4 rounded-lg backdrop-blur-sm mb-6">
          <p className="text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}
      
      {success && (
        <div className="bg-green-50/80 dark:bg-green-900/30 border border-green-200 dark:border-green-800 p-4 rounded-lg backdrop-blur-sm mb-6">
          <p className="text-green-700 dark:text-green-300">Upload successful! Redirecting to gallery...</p>
        </div>
      )}
      
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*"
        className="hidden"
        onChange={(e) => handleFileSelect(e.target.files)}
      />
    </>
  )
}