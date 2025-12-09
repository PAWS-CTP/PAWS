"use client"

import React, { useState } from 'react'
import supabase from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import pawsLogo from '@/assets/PAWS_Logo_NoText.png'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import GoogleIcon from '@/components/icons/Google'

export default function SignUpPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  async function handleGoogleSignUp() {
    try {
      setLoading(true)
      const redirectTo = typeof window !== 'undefined' ? `${window.location.origin}/` : undefined
      await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo } })
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!username || !email || !password) {
      setError('Please enter an email and password')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      const { data, error: signErr } = await supabase.auth.signUp({ email, password } as any)
      setLoading(false)
      if (signErr) {
        setError(signErr.message || 'Sign up failed')
        return
      }

      // If Supabase returned a user id, upsert the public `users` table with the username
      const userId = data?.user?.id
      if (userId) {
        const { error: upsertErr } = await supabase.from('users').upsert({ id: userId, email, username })
        if (upsertErr) {
          // Log but don't block the flow — keep original auth behavior intact
          console.warn('Failed to upsert users table:', upsertErr)
        }
      }

      // After sign up, Supabase may require email confirmation — redirect to home or welcome page
      router.push('/')
    } catch (err: any) {
      setLoading(false)
      setError(err?.message || 'Sign up failed')
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))' }}
    >
      <div className="w-full max-w-4xl rounded-xl overflow-hidden shadow-lg grid md:grid-cols-2 min-h-[560px]">
        {/* Left: sign up form */}
        <div className="bg-[#fafaf6] text-slate-900 p-10">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-1">Create your account</h2>
            <p className="text-sm text-slate-600 mb-6">Join PAWS to share pets and events with your community</p>

            <form onSubmit={handleSignUp} className="space-y-4">

              <div>
                <label className="block text-xs text-slate-600 mb-1">Username</label>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter a username"
                  className="bg-white border-slate-200 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-600 mb-1">Email</label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="bg-white border-slate-200 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-600 mb-1">Password</label>
                <div className="relative">
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    type={showPassword ? 'text' : 'password'}
                    className="bg-white border-slate-200 text-slate-900 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400 px-2 py-1 rounded"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-600 mb-1">Confirm password</label>
                <div className="relative">
                  <Input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    type={showPassword ? 'text' : 'password'}
                    className="bg-white border-slate-200 text-slate-900 pr-12"
                  />
                </div>
              </div>

              {error && <div className="text-sm text-red-400">{error}</div>}

              <Button type="submit" className="w-full" style={{ background: 'var(--primary-color)' }}>
                {loading ? 'Creating account…' : 'Create account'}
              </Button>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-slate-700" />
                <div className="text-xs text-slate-400">Or sign up with</div>
                <div className="flex-1 h-px bg-slate-700" />
              </div>

              <div className="flex gap-3 mt-2">
                <Button
                  onClick={handleGoogleSignUp}
                  className="w-full flex items-center justify-center gap-2 bg-[var(--secondary-color)] text-white hover:brightness-95"
                >
                  <GoogleIcon className="w-4 h-4" />
                  Sign up with Google
                </Button>
              </div>

              <div className="text-center text-xs text-slate-600 mt-4">
                Already have an account? <a href="/signin" className="text-slate-900 underline">Sign in</a>
              </div>
            </form>
          </div>
        </div>

        {/* Right: large PAWS image */}
        <div className="relative flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={pawsLogo}
              alt="PAWS"
              fill
              className="object-cover transform scale-125"
              style={{ transformOrigin: 'center' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
 
