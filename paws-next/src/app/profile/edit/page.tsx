"use client"

import React, { useEffect, useState } from 'react'
import supabase from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input, Textarea } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function EditProfilePage() {
  const [username, setUsername] = useState('')
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
      const { error } = await supabase.from('users').upsert({ id: userId, ...updates }, { onConflict: 'id' })
      if (error) {
        if (error.code === '23505' || /duplicate key value/.test(error.message || '')) {
          setError('A user with this email already exists. Please use a different email.')
        } else {
          setError(error.message)
        }
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
      <div className="w-full max-w-lg p-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[var(--primary-color)]">Edit Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={saveProfile} className="flex flex-col gap-4">
              <div>
                <label className="text-sm mb-1 block text-[var(--text-secondary)]">Username</label>
                <Input value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>

              {/* Avatar URL removed per request */}

              <div>
                <label className="text-sm mb-1 block text-[var(--text-secondary)]">Bio</label>
                <Textarea value={bio} onChange={(e) => setBio(e.target.value)} />
              </div>

              {error && <div className="text-red-500">{error}</div>}

              <div className="flex justify-between">
                <Button variant="outline" className="border-[1px] border-[color:var(--primary-color)/0.18] text-[var(--primary-color)]" onClick={() => router.push('/profile')}>Cancel</Button>
                <Button type="submit" disabled={loading} className="bg-[var(--primary-color)] text-white hover:brightness-95">{loading ? 'Saving…' : 'Save'}</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
