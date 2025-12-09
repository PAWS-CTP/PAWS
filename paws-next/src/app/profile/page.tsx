'use client'

import { useEffect, useState } from 'react'
import ProfileHeader from "@/components/profile/profileheader"
import ProfilePost from "@/components/profile/profileposts"
import Navbar from "@/components/navbar/navbar"
import supabase from '@/lib/supabaseClient'

type EventPost = {
  id: string
  img_url?: string
}

export default function Home() {
  const [posts, setPosts] = useState<EventPost[]>([])

  useEffect(() => {
    async function fetchPosts() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      const userId = session?.user?.id
      if (!userId) return
      console.log("userid",userId)

      const { data: userInfo } = await supabase
        .from('users')
        .select('username')
        .eq('id', userId)
        .single()
      const { data: postsData } = await supabase
        .from('events')
        .select('id, img_url')
        .eq('username', userInfo?.username)
      setPosts(postsData || [])
    }
    fetchPosts()
  }, [])

  return (
    <>
      <Navbar />
      <div className="bg-white profile-page" style={{ paddingTop: 'var(--navbar-height,72px)' }}>
        <div className="flex justify-center">
          <div className="w-full max-w-5xl px-4">
            <div className="py-10">
              <ProfileHeader />
            </div>

            <div className="mt-4 px-4">
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold text-slate-700">Posts</h3>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-4">
              {posts.map((post) => (
                <ProfilePost key={post.id} id={post.id} imageUrl={post.img_url} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
