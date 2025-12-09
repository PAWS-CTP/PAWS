"use client";
import React, { useState } from 'react';
import supabase from '@/lib/supabaseClient'
import Image from 'next/image';
import pawsLogo from '../../assets/PAWS_Logo_NoText.png';
import { useRouter, usePathname } from 'next/navigation';
import SearchBar from '../search/searchbar';
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Navbar: React.FC = () => {
        const router = useRouter();

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
                        {/* Logo pinned to the far left of the viewport */}
                        <div className="absolute left-4 top-0 h-16 flex items-center">
                            <button onClick={() => router.push('/')} aria-label="Home" className="flex items-center">
                                <Image src={pawsLogo} alt="PAWS" width={32} height={32} />
                            </button>
                        </div>

                        {/* Pinned Sign Out on the far right edge of the screen */}
                        <div className="absolute right-4 top-0 h-16 flex items-center">
                            <div className="hidden md:block">
                                <Button variant="ghost" className="py-1 px-3 cursor-pointer" onClick={async () => {
                                    try {
                                        if (supabase && supabase.auth && typeof supabase.auth.signOut === 'function') {
                                            await supabase.auth.signOut()
                                        }
                                    } catch (err) {
                                        console.warn('Sign out failed:', err)
                                    } finally {
                                        router.push('/signin')
                                    }
                                }}>Sign Out</Button>
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
                                {/* Hamburger for small screens */}
                                <MobileMenu />
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
                <Link href="/profile" className={`px-3 py-1 rounded-md text-sm font-medium cursor-pointer ${isActive('/profile') ? 'text-teal-600' : 'text-gray-700 hover:text-teal-600'}`}>Profile</Link>
                {/* Settings removed */}
            </>
        )
}

function MobileMenu() {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const pathname = usePathname ? usePathname() : (typeof window !== 'undefined' ? window.location.pathname : '/')

    return (
        <>
            <button aria-label="Open menu" onClick={() => setOpen(true)} className="md:hidden p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>

            {open && (
                <div className="fixed inset-0 z-50">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
                    <div className="absolute left-0 top-0 w-64 h-full bg-white shadow-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Image src={pawsLogo} alt="PAWS" width={28} height={28} />
                                <span className="font-semibold">PAWS</span>
                            </div>
                            <button onClick={() => setOpen(false)} className="p-1 rounded-md hover:bg-gray-100">✕</button>
                        </div>

                            <nav className="flex flex-col gap-2">
                            {pathname !== '/' && (
                                <>
                                    <Link href="/" onClick={() => setOpen(false)} className="px-2 py-2 rounded-md hover:bg-gray-100">Feed</Link>
                                    <Link href="/profile" onClick={() => setOpen(false)} className="px-2 py-2 rounded-md hover:bg-gray-100">Profile</Link>
                                </>
                            )}
                            <Link href="/create-event" onClick={() => setOpen(false)} className="px-2 py-2 rounded-md hover:bg-gray-100">Create Event</Link>
                            <button
                                className="text-left px-2 py-2 rounded-md hover:bg-gray-100"
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
                        </nav>
                    </div>
                </div>
            )}
        </>
    )
}

export default Navbar;