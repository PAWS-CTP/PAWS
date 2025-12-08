"use client"

import React, { useEffect, useState } from 'react'
import supabase from '@/lib/supabaseClient'

type Profile = {
  id?: string
  username?: string | null
  avatar_url?: string | null
  bio?: string | null
  [key: string]: any
}

export default function ProfileHeader() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function load() {
      try {
        const {
          data: { session }
        } = await supabase.auth.getSession()

        const userId = session?.user?.id
        if (!userId) {
          if (mounted) setLoading(false)
          return
        }

        const { data, error } = await supabase.from('users').select('*').eq('id', userId).limit(1).single()
        if (error) {
          // If the table/row doesn't exist, we still show a fallback
          // eslint-disable-next-line no-console
          console.warn('Could not load profile row:', error)
        }

        if (mounted) setProfile(data ?? null)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error loading profile:', err)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()
    return () => {
      mounted = false
    }
  }, [])

  const username = profile?.username || profile?.full_name || profile?.name || 'You'
  const bio = profile?.bio || ''

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ color: '#EC22FF', fontWeight: 'bold' }}>{loading ? 'Loading…' : username}</h2>
        {bio ? <p style={{ marginTop: 4 }}>{bio}</p> : <p style={{ marginTop: 4, color: '#666' }}>No bio yet</p>}
      </div>
    </div>
  )
}