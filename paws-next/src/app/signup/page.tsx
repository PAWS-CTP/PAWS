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
  const [message, setMessage] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!email || !password) {
      setError('Please provide email and password')
      return
    }
    setLoading(true)
    try {
      const { data, error: signErr } = await supabase.auth.signUp({ email, password } as any)
      if (signErr) {
        setError(signErr.message)
        return
      }

      const userId = (data as any)?.user?.id || (data as any)?.session?.user?.id

      if (data && (data as any).session) {
        // Signed in immediately (no email confirmation required) — upsert profile
        if (username && userId) {
          await supabase.from('users').upsert({ id: userId, username })
        }
        // Show success and redirect to feed
        setMessage('Account created successfully.')
        setSuccess(true)
        setTimeout(() => router.push('/'), 1200)
        return
      }

      // No session returned: most likely email confirmation is required.
      // Inform the user (no automatic redirect).
      setMessage('Account created — please check your email to confirm.')
      setSuccess(true)
      setTimeout(() => router.push('/'), 2200)
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error(err)
      setError(err?.message ?? 'Sign up failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))' }}
    >
      <div className="flex flex-col items-center">
        <div className="bg-white p-8 rounded-lg shadow-sm w-80 text-center">
          <h2 className="text-2xl font-semibold mb-4">Create an account</h2>
          <form onSubmit={handleSignUp} className="flex flex-col gap-3">
          <input className="border p-2 rounded" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="border p-2 rounded" placeholder="Username (optional)" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input className="border p-2 rounded" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button disabled={loading} className="bg-blue-500 text-white py-2 rounded mt-1">{loading ? 'Creating…' : 'Sign Up'}</button>
          {message && (
            <div className="flex items-center justify-center gap-2 mt-2">
              {success && <div className="border-4 border-gray-200 border-t-blue-500 rounded-full w-5 h-5 animate-spin" role="status" aria-label="loading"></div>}
              <div className="text-sm text-green-600">{message}</div>
            </div>
          )}
          </form>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm w-80 text-center mt-4">
          <div className="text-sm">
            Already have an account? <a href="/signin" className="text-blue-500">Sign in</a>
          </div>
        </div>
      </div>
    </div>
  )
}
