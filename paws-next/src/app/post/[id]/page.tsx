import React from 'react'
import supabase from '@/lib/supabaseClient'
import Post, { type EventRow } from '@/components/post/post'

type Props = { params: { id: string } }

export default async function PostPage({ params }: Props) {
  const { id } = params

  let post: any = null
  try {
    const { data, error } = await supabase.from('posts').select('*').eq('id', id).single()
    if (error) {
      // eslint-disable-next-line no-console
      console.warn('Could not load post:', error)
    } else {
      post = data
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
  }

  if (!post) {
    return (
      <div style={{ paddingTop: 'var(--navbar-height,72px)' }} className="flex items-center justify-center min-h-screen">
        <div className="text-center">Post not found.</div>
      </div>
    )
  }

  // Map the `posts` row shape to the `EventRow` shape expected by the Post card.
  const event: EventRow = {
    id: post.id,
    created_at: post.created_at ?? new Date().toISOString(),
    title: post.username ?? 'Post',
    description: post.caption ?? null,
    img_url: post.img_url ?? null,
    location: null,
    date: null,
    start_time: null,
    end_time: null,
    privacy: null,
    username: post.username ?? 'Anonymous',
  }

  return (
    <div style={{ paddingTop: 'var(--navbar-height,72px)' }} className="flex items-center justify-center">
      <div style={{ maxWidth: 800, width: '100%', padding: 20 }}>
        {/* Render the shared Post card component for a consistent detail view */}
        <Post event={event} />
      </div>
    </div>
  )
}
