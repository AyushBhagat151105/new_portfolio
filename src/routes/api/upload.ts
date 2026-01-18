import { createFileRoute } from '@tanstack/react-router'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const Route = createFileRoute('/api/upload')({
    server: {
        handlers: {
          POST: async ({ request }) => {
    try {
      const formData = await request.formData()
      const file = formData.get('file') as File

      if (!file) {
        return new Response(JSON.stringify({ error: 'No file provided' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      // Convert file to base64
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const base64 = buffer.toString('base64')
      const dataUri = `data:${file.type};base64,${base64}`

      // Determine if it's a document (PDF, DOC, DOCX)
      const isDocument = file.type === 'application/pdf' || 
                         file.type === 'application/msword' ||
                         file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      
      // Extract file extension
      const fileExtension = file.name.split('.').pop()?.toLowerCase() || ''
      
      // Generate a clean public_id with extension for raw files
      const timestamp = Date.now()
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').replace(/\.[^/.]+$/, '')
      
      // Upload configuration
      const uploadOptions: Record<string, unknown> = {
        folder: 'portfolio',
      }

      // For documents, use 'raw' resource type and include extension in public_id
      if (isDocument) {
        uploadOptions.resource_type = 'raw'
        uploadOptions.public_id = `${cleanFileName}_${timestamp}.${fileExtension}`
        uploadOptions.access_mode = 'public'
      } else {
        uploadOptions.resource_type = 'auto'
      }

      console.log('Upload options:', uploadOptions)
      console.log('File type:', file.type)
      console.log('File name:', file.name)

      const result = await cloudinary.uploader.upload(dataUri, uploadOptions)

      console.log('Upload result:', result)

      return new Response(
        JSON.stringify({
          url: result.secure_url,
          publicId: result.public_id,
          format: result.format,
          resourceType: result.resource_type,
          fileName: file.name,
          fileType: file.type,
          bytes: result.bytes,
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    } catch (error) {
      console.error('Upload error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      return new Response(
        JSON.stringify({ error: 'Upload failed', details: errorMessage }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }
  },
      }
  }
})
