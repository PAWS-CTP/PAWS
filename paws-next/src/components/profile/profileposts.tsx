import React from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'

type Props = {
  id: string
  imageUrl?: string
}

export default function ProfilePost({ id, imageUrl }: Props) {
  const src = imageUrl || 'https://thumbs.dreamstime.com/b/cute-cat-portrait-square-photo-beautiful-white-closeup-105311158.jpg'

  return (
    <Card className="p-0 overflow-hidden rounded-lg cursor-pointer">
      <Link href={`/post/${id}`}>
        <div className="relative w-full h-64">
          <img src={src} className="object-cover w-full h-full" alt={`post-${id}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-flex" />
        </div>
      </Link>
    </Card>
  )
}