import ProfileHeader from "@/components/profile/profileheader"
import ProfilePost from "@/components/profile/profileposts"
import Navbar from "@/components/navbar/navbar"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'

// Temporary static post IDs (replace with real data fetch later)
const samplePosts = [
  'a3f1c9d2-7b8e-4d4c-9f5f-12b6a7d98f3e',
  'b1f2c3d4-1111-2222-3333-444455556666',
  'c1d2e3f4-7777-8888-9999-0000aaaa1111',
  'd1e2f3a4-2222-3333-4444-555566667777',
]

export default function Home() {
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
              {samplePosts.map((id) => (
                <ProfilePost key={id} id={id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
