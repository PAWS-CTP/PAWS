import React from 'react'
import supabase from '@/lib/supabaseClient'

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

  return (
    <div style={{ paddingTop: 'var(--navbar-height,72px)' }} className="flex items-center justify-center">
      <div style={{ maxWidth: 800, width: '100%', padding: 20 }}>
        <div className="bg-white rounded shadow p-4">
          <img src={post.img_url} alt="post" className="w-full object-cover rounded" />
          <div className="mt-4">
            <h2 className="text-xl font-semibold">{post.username || 'Unknown'}</h2>
            <p className="text-gray-700 mt-2">{post.caption}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
