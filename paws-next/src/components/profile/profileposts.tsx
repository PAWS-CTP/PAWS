import React from 'react'
import Link from 'next/link'

type Props = {
  id: string
  imageUrl?: string
}

export default function ProfilePost({ id, imageUrl }: Props) {
  const src = imageUrl || 'https://thumbs.dreamstime.com/b/cute-cat-portrait-square-photo-beautiful-white-closeup-105311158.jpg'

  return (
    <div className="overflow-hidden rounded-md cursor-pointer">
      <Link href={`/post/${id}`}>
        <img src={src} width={250} height={250} className="object-cover w-full h-64" alt={`post-${id}`} />
      </Link>
    </div>
  )
}