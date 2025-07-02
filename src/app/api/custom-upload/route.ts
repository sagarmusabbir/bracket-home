import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { randomUUID } from 'crypto'
import config from '@/payload.config'

export async function POST(req: NextRequest) {
  try {
    // Get the form data
    const formData = await req.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }
    
    // Get file extension and generate a unique filename
    const fileExtension = file.name.split('.').pop() || ''
    const uniqueFilename = `${randomUUID()}.${fileExtension}`
    
    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer())
    
    // Define the path where the file will be saved
    const uploadDir = join(process.cwd(), 'public', 'uploads')
    const filePath = join(uploadDir, uniqueFilename)
    
    // Save the file to the uploads directory
    await writeFile(filePath, buffer)
    
    // Generate the public URL for the file
    const fileUrl = `/uploads/${uniqueFilename}`
    
    // Get alt text from form data or use filename
    const altText = formData.get('alt') as string || file.name.split('.')[0].replace(/[_-]/g, ' ') || 'Media file'
    
    // Initialize Payload
    const payload = await getPayload({ config: await config })
    
    // Check if the file is a video
    const isVideo = file.type.startsWith('video/') || 
                   file.name.match(/\.(mp4|mkv|avi|mov|wmv|flv|webm)$/i);
    
    // Create a record in the CustomMedia collection
    const mediaDoc = await payload.create({
      collection: 'custom-media',
      data: {
        filename: file.name,
        alt: altText,
        url: fileUrl,
        mimeType: file.type,
        filesize: file.size,
        width: 0, // These would need image processing to determine
        height: 0,
        isVideo: isVideo || false,
      },
    })
    
    return NextResponse.json({ success: true, media: mediaDoc })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}