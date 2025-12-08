import ProfileHeader from "@/components/profile/profileheader"
import ProfilePost from "@/components/profile/profileposts"
import Navbar from "@/components/navbar/navbar"
import Link from 'next/link'

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
      <div className="bg-gray-50" style={{ paddingTop: 'var(--navbar-height,72px)' }}>
        <div className="flex justify-center">
          <div style={{ width: '100%', maxWidth: 920 }}>
            <div className="p-10 flex items-start justify-between gap-6">
              <div style={{ flex: 1 }}>
                <ProfileHeader />
              </div>
              <div style={{ width: 160 }} className="flex items-center justify-end">
                <Link href="/profile/edit">
                  <button className="bg-blue-500 text-white py-2 px-4 rounded">Edit Profile</button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6 p-4">
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
