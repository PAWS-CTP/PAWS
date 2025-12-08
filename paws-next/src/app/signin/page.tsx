"use client"

import React, { useState } from 'react'
import supabase from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import pawsLogo from '@/assets/PAWS_Logo_NoText.png'

export default function SignInPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function handleGoogleSignIn() {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' })
      if (error) {
        alert(error.message)
        setLoading(false)
      }
      // Supabase will redirect to Google; when the flow completes it will return to your configured redirect URL
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      alert('Sign in failed')
      setLoading(false)
    }
  }

  async function handlePasswordSignIn(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!username || !password) {
      setError('Please enter username (or email) and password')
      return
    }
    // Temporary bypass: just go to the feed for now
    // (Will be replaced with real auth once Supabase is configured)
    router.push('/')
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
      }}
    >
      <div className="flex flex-col items-center">
        <div className="bg-white p-8 rounded-lg shadow-sm w-80 text-center">
          <div className="mb-4">
            <Image src={pawsLogo} alt="PAWS" width={160} height={80} className="mx-auto" />
          </div>
          <p className="text-gray-500 text-sm mb-4">Sign in to see photos and updates from your friends.</p>

          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="text-white px-4 py-2 rounded w-full mb-3"
            style={{ background: 'var(--primary-color)' }}
          >
            {loading ? 'Redirecting…' : 'Continue with Google'}
          </button>

          <div className="flex items-center my-3">
            <div className="flex-1 h-px bg-gray-200" />
            <div className="px-3 text-sm text-gray-400">OR</div>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <form onSubmit={handlePasswordSignIn} className="flex flex-col gap-2">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Email or username"
              className="border p-2 rounded text-sm"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              className="border p-2 rounded text-sm"
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button type="submit" disabled={loading} className="mt-1 text-white py-2 rounded text-sm"
              style={{ background: 'var(--primary-color)' }}>
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <div className="mt-3 text-xs text-gray-500">
            <a href="#" className="text-blue-500">Forgot password?</a>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm w-80 text-center mt-4">
          <div className="text-sm">
            Don't have an account? <a href="/signup" className="text-blue-500 font-medium">Sign up here</a>
          </div>
        </div>
      </div>
    </div>
  )
}
