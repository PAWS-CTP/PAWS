"use client"

import React, { useEffect, useState } from 'react'
import supabase from '@/lib/supabaseClient'
import { Card, CardHeader } from '@/components/ui/card'

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
  const avatar = profile?.avatar_url || null

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-6">
          <div className="shrink-0">
            {avatar ? (
              <img src={avatar} alt={`${username} avatar`} className="w-28 h-28 rounded-full object-cover shadow-md" />
            ) : (
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 text-white flex items-center justify-center text-3xl font-bold shadow-md">
                {username ? username.charAt(0).toUpperCase() : 'Y'}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-extrabold text-teal-600 truncate">{loading ? 'Loading…' : username}</h2>
            </div>
            <p className="mt-2 text-sm text-gray-600">{bio || 'No bio yet'}</p>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}