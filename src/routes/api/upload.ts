import { createFileRoute } from '@tanstack/react-router'
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
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

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(dataUri, {
        folder: 'portfolio',
        resource_type: 'auto',
      })

      return new Response(
        JSON.stringify({
          url: result.secure_url,
          publicId: result.public_id,
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    } catch (error) {
      console.error('Upload error:', error)
      return new Response(
        JSON.stringify({ error: 'Upload failed' }),
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
