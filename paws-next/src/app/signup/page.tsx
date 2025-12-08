"use client"

import React, { useState } from 'react'
import supabase from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!email || !password) {
      setError('Please provide email and password')
      return
    }
    try {
      setLoading(true)
      const { data, error: signErr } = await supabase.auth.signUp({ email, password } as any)
      if (signErr) {
        setError(signErr.message)
        setLoading(false)
        return
      }

      // Optionally you could save username to your profile table via API
      // For now redirect to sign-in page or root
      router.push('/signin')
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error(err)
      setError(err?.message ?? 'Sign up failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-sm w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Create an account</h2>
        <form onSubmit={handleSignUp} className="flex flex-col gap-3">
          <input className="border p-2 rounded" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="border p-2 rounded" placeholder="Username (optional)" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input className="border p-2 rounded" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button disabled={loading} className="bg-blue-500 text-white py-2 rounded mt-1">{loading ? 'Creating…' : 'Sign Up'}</button>
        </form>
        <div className="text-sm text-center text-gray-600 mt-4">
          Already have an account? <a href="/signin" className="text-blue-500">Sign in</a>
        </div>
      </div>
    </div>
  )
}
