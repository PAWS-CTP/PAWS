"use client";
import React, { useState, useEffect } from 'react';
import supabase from '@/lib/supabaseClient'
import Image from 'next/image';
import pawsLogo from '../../assets/PAWS_Logo_NoText.png';
import { useRouter, usePathname } from 'next/navigation';
import SearchBar from '../search/searchbar';
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Navbar: React.FC = () => {
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false)

        const handleSearch = ({ city }: { city?: string }) => {
                if (city) {
                        router.push(`/?city=${encodeURIComponent(city)}`);
                } else {
                        router.push('/');
                }
        };

        return (
                <header className="fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Left area: hamburger on mobile, logo on desktop */}
                        <div className="absolute left-4 top-0 h-16 flex items-center">
                            <button aria-label="Open menu" onClick={() => setMobileOpen(true)} className="sidebar-hamburger md:hidden p-1">
                                <span className="hamburger-line"></span>
                                <span className="hamburger-line"></span>
                                <span className="hamburger-line"></span>
                            </button>
                            <button onClick={() => router.push('/')} aria-label="Home" className="hidden md:flex items-center">
                                <Image src={pawsLogo} alt="PAWS" width={32} height={32} />
                            </button>
                        </div>

                        {/* Pinned Sign Out on the far right edge of the screen */}
                            <div className="absolute right-4 top-0 h-16 flex items-center">
                                <div className="hidden md:flex items-center gap-4">
                                    <ProfileMenu />
                                </div>
                            </div>

                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center gap-4 justify-center w-full">
                                <nav className="hidden md:flex items-center space-x-2 mr-4">
                                    <NavItems />
                                </nav>

                                {/* Centered search */}
                                <div className="hidden md:block">
                                    <SearchBar onSearch={handleSearch} />
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                {/* Hamburger for small screens (opens left drawer) */}
                                <MobileMenu open={mobileOpen} setOpen={setMobileOpen} onSearch={(opts:{city?:string})=>{ setMobileOpen(false); handleSearch(opts)}} />
                            </div>
                        </div>
                    </div>
                </header>
        );
};

function NavItems() {
        const router = useRouter();
        const pathname = usePathname() || '/';

        // Hide Feed/Profile links when we're already on the feed page
        if (pathname === '/') return null;

        const isActive = (path: string) => {
                if (path === '/') return pathname === '/';
                return pathname.startsWith(path);
        };

        return (
            <>
                <Link href="/" className={`px-3 py-1 rounded-md text-sm font-medium cursor-pointer ${isActive('/') ? 'text-teal-600' : 'text-gray-700 hover:text-teal-600'}`}>Feed</Link>
            </>
        )
}

function MobileMenu({ open, setOpen, onSearch }: { open: boolean; setOpen: (v: boolean) => void; onSearch: (opts:{city?:string}) => void }) {
    const router = useRouter()
    const pathname = usePathname ? usePathname() : (typeof window !== 'undefined' ? window.location.pathname : '/')
    const [visible, setVisible] = useState(open)
    const [exiting, setExiting] = useState(false)
    const [username, setUsername] = useState<string | null>(null)

    useEffect(() => {
        let mounted = true
        ;(async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession()
                const userId = session?.user?.id
                if (!userId) return
                const { data } = await supabase.from('users').select('username').eq('id', userId).single()
                if (mounted) setUsername(data?.username ?? null)
            } catch (err) {
                console.warn('Could not load navbar profile', err)
            }
        })()
        return () => { mounted = false }
    }, [])

    useEffect(() => {
        if (open) {
            setVisible(true)
            setExiting(false)
        } else if (visible) {
            setExiting(true)
            const t = setTimeout(() => {
                setVisible(false)
                setExiting(false)
            }, 220)
            return () => clearTimeout(t)
        }
    }, [open])

    if (!visible) return null

    return (
        <div className={`sidebar-drawer ${exiting ? 'drawer-exit' : 'drawer-enter'}`}>
            <div className="drawer-backdrop" onClick={() => setOpen(false)} />
            <div className="drawer-panel">
                <div className="drawer-header flex items-center justify-between">
                    <div className="font-semibold">PAWS</div>
                    <button onClick={() => setOpen(false)} className="p-1 rounded-md hover:bg-gray-100">✕</button>
                </div>

                {/* Search in mobile drawer */}
                <div className="mt-4">
                    <SearchBar onSearch={(opts:{city?:string})=>{ onSearch(opts) }} />
                </div>

                {/* Profile block */}
                <div className="mt-4 border-t pt-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full text-white flex items-center justify-center font-semibold" style={{ background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))' }}>{username ? username.charAt(0).toUpperCase() : 'U'}</div>
                        <div>
                            <div className="font-medium">{username ?? 'You'}</div>
                            <div className="text-sm text-gray-500">@{username ?? 'user'}</div>
                        </div>
                    </div>
                    <div className="mt-3 flex flex-col">
                        <Link href="/profile" onClick={() => setOpen(false)} className="drawer-link">Your profile</Link>
                        <button
                            className="drawer-link text-left"
                            onClick={async () => {
                                try {
                                    if (supabase && supabase.auth && typeof supabase.auth.signOut === 'function') {
                                        await supabase.auth.signOut()
                                    }
                                } catch (err) {
                                    console.warn('Sign out failed:', err)
                                } finally {
                                    setOpen(false)
                                    router.push('/signin')
                                }
                            }}
                        >
                            Sign Out
                        </button>
                    </div>
                </div>

                <nav className="drawer-list mt-6">
                    {pathname !== '/' && (
                        <>
                            <Link href="/" onClick={() => setOpen(false)} className="drawer-link">Feed</Link>
                            <Link href="/profile" onClick={() => setOpen(false)} className="drawer-link">Profile</Link>
                        </>
                    )}
                    <Link href="/create-event" onClick={() => setOpen(false)} className="drawer-link">Create Event</Link>
                </nav>
            </div>
        </div>
    )
}

function ProfileMenu() {
    const [open, setOpen] = useState(false)
    const [username, setUsername] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        let mounted = true
        ;(async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession()
                const userId = session?.user?.id
                if (!userId) return
                const { data } = await supabase.from('users').select('username').eq('id', userId).single()
                if (mounted) setUsername(data?.username ?? null)
            } catch (err) {
                console.warn('Could not load navbar profile', err)
            }
        })()
        return () => { mounted = false }
    }, [])

    return (
        <div className="relative">
            <button
                className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100"
                onClick={() => setOpen((s) => !s)}
                aria-haspopup="menu"
                aria-expanded={open}
            >
                <div className="w-8 h-8 rounded-full text-white flex items-center justify-center font-semibold" style={{ background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))' }}>{username ? username.charAt(0).toUpperCase() : 'U'}</div>
                <span className="hidden md:inline text-sm font-medium">{username ?? 'You'}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" className="ml-1 text-gray-500" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg z-50">
                    <Link href="/profile" onClick={() => setOpen(false)} className="block px-4 py-2 text-sm hover:bg-gray-50">Your profile</Link>
                    <button
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                        onClick={async () => {
                            try {
                                await supabase.auth.signOut()
                            } catch (err) {
                                console.warn('Sign out failed', err)
                            } finally {
                                setOpen(false)
                                router.push('/signin')
                            }
                        }}
                    >
                        Sign out
                    </button>
                </div>
            )}
        </div>
    )
}

export default Navbar;