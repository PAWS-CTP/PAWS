"use client"

import React, { useState } from 'react'
import supabase from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import pawsLogo from '@/assets/PAWS_Logo_NoText.png'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import GoogleIcon from '@/components/icons/Google'

export default function SignInPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function handleGoogleSignIn() {
    try {
      setLoading(true)
      const redirectTo = typeof window !== 'undefined' ? `${window.location.origin}/` : undefined
      await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo } })
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  React.useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const { data } = await supabase.auth.getSession()
        if (!mounted) return
        if (data?.session) {
          router.push('/')
        }
      } catch (e) {
        // ignore
      }
    })()
    return () => {
      mounted = false
    }
  }, [router])

  async function handlePasswordSignIn(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!username || !password) {
      setError('Please enter username (or email) and password')
      return
    }
    setLoading(true)
    try {
      const { error: signErr } = await supabase.auth.signInWithPassword({ email: username, password } as any)
      setLoading(false)
      if (signErr) {
        setError(signErr.message || 'Sign in failed')
        return
      }
      router.push('/')
    } catch (err: any) {
      setLoading(false)
      const msg = err?.message || 'Sign in failed'
      setError(msg)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))' }}
    >
      <div className="w-full max-w-4xl rounded-xl overflow-hidden shadow-lg grid md:grid-cols-2 min-h-[520px]">
        {/* Left: form */}
          <div className="bg-[#fafaf6] text-slate-900 p-10">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-1">Welcome back</h2>
              <p className="text-sm text-slate-600 mb-6">Login to your PAWS account</p>

            <form onSubmit={handlePasswordSignIn} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Email</label>
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="m@example.com"
                    className="bg-white border-slate-200 text-slate-900"
                  />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-xs text-slate-600 mb-1">Password</label>
                </div>
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=""
                    type="password"
                    className="bg-white border-slate-200 text-slate-900"
                  />
              </div>

              {error && <div className="text-sm text-red-400">{error}</div>}

              <Button type="submit" className="w-full" style={{ background: 'var(--primary-color)' }}>
                {loading ? 'Signing in…' : 'Login'}
              </Button>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-slate-700" />
                <div className="text-xs text-slate-400">Or continue with</div>
                <div className="flex-1 h-px bg-slate-700" />
              </div>

              <div className="flex gap-3 mt-2">
                <Button
                  onClick={handleGoogleSignIn}
                  className="w-full flex items-center justify-center gap-2 bg-[var(--secondary-color)] text-white hover:brightness-95"
                >
                  <GoogleIcon className="w-4 h-4" />
                  Continue with Google
                </Button>
              </div>

              <div className="text-center text-xs text-slate-400 mt-4">
                 Don't have an account? <a href="/signup" className="text-slate-900 underline">Sign up</a>
              </div>
            </form>
          </div>
        </div>

        {/* Right: image (overflow-hidden and scaled to crop any white padding inside SVG) */}
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
