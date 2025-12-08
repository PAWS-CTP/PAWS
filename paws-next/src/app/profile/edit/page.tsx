"use client"

import React, { useEffect, useState } from 'react'
import supabase from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function EditProfilePage() {
  const [username, setUsername] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [bio, setBio] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const {
          data: { session }
        } = await supabase.auth.getSession()
        const userId = session?.user?.id
        if (!userId) return

        const { data, error } = await supabase.from('users').select('*').eq('id', userId).single()
        if (error) {
          // eslint-disable-next-line no-console
          console.warn('Could not load profile for edit:', error)
        }
        if (mounted && data) {
          setUsername(data.username || '')
          setBio(data.bio || '')
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const {
        data: { session }
      } = await supabase.auth.getSession()
      const userId = session?.user?.id
      if (!userId) {
        setError('Not signed in')
        return
      }

      const updates = { username, bio }
      const { error } = await supabase.from('users').upsert({ id: userId, ...updates })
      if (error) {
        setError(error.message)
        return
      }

      router.push('/profile')
    } catch (err: any) {
      setError(err?.message ?? 'Failed to save')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ paddingTop: 'var(--navbar-height,72px)' }} className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={saveProfile} className="flex flex-col gap-3 bg-white p-4 rounded shadow">
          <label className="text-sm">Username</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} className="border p-2 rounded" />

          <label className="text-sm">Avatar URL</label>
          <input value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} className="border p-2 rounded" />

          <label className="text-sm">Bio</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="border p-2 rounded" />

          {error && <div className="text-red-500">{error}</div>}
          <div className="flex justify-between">
            <button type="button" onClick={() => router.push('/profile')} className="bg-gray-200 text-gray-800 py-2 px-4 rounded">Cancel</button>
            <div>
              <button type="submit" disabled={loading} className="bg-blue-500 text-white py-2 px-4 rounded">{loading ? 'Saving…' : 'Save'}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
