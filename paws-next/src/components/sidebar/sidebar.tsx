"use client";
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import supabase from '@/lib/supabaseClient'
import pawsLogo from '../../assets/PAWS_Logo_NoText.png'
import './sidebar.css'

const links = [
    { href: '/', label: 'Feed', icon: 'home' },
    { href: '/profile', label: 'Profile', icon: 'user' },
]

export default function Sidebar() {
    const [open, setOpen] = useState(false) // mobile drawer
    const [drawerMounted, setDrawerMounted] = useState(false)
    const [collapsed, setCollapsed] = useState(false) // desktop collapse
    const [username, setUsername] = useState<string | null>(null)

    useEffect(() => {
        let mounted = true
        ;(async () => {
            try {
                const {
                    data: { session }
                } = await supabase.auth.getSession()
                const userId = session?.user?.id
                if (!userId) return
                const { data } = await supabase.from('users').select('username').eq('id', userId).single()
                if (mounted) setUsername(data?.username ?? null)
            } catch (err) {
                // eslint-disable-next-line no-console
                console.warn('Could not load sidebar profile', err)
            }
        })()
        return () => { mounted = false }
    }, [])

    // Keep the drawer mounted while exit animation plays
    useEffect(() => {
        let t: ReturnType<typeof setTimeout> | undefined
        if (open) {
            setDrawerMounted(true)
        } else if (!open && drawerMounted) {
            // allow exit animation to play (match CSS 220ms)
            t = setTimeout(() => setDrawerMounted(false), 240)
        }
        return () => {
            if (t) clearTimeout(t)
        }
    }, [open, drawerMounted])

    return (
        <>
            {/* Hamburger for mobile */}
            <button
                className="sidebar-hamburger"
                aria-label="Open menu"
                onClick={() => {
                    setOpen(true)
                    setDrawerMounted(true)
                }}
            >
                <span className="hamburger-line" />
                <span className="hamburger-line" />
                <span className="hamburger-line" />
            </button>

            <aside id="sidebar" className={`sidebar ${collapsed ? 'collapsed' : ''}`} aria-label="Quick links">
                <div className="sidebar-header" style={{ color: '#258EA6' }}>
                    <div className="sidebar-profile">
                        <Link href="/profile" className="profile-link">
                            <div className="profile-avatar" aria-hidden>
                                {username ? username.charAt(0).toUpperCase() : 'Y'}
                            </div>
                            <div className="profile-meta">
                                <div className="profile-name">{username ?? 'You'}</div>
                                <div className="profile-handle">@{username ? username : 'you'}</div>
                            </div>
                        </Link>
                        <button
                            className="collapse-btn"
                            onClick={() => setCollapsed((c) => !c)}
                            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                        >
                            {collapsed ? '»' : '«'}
                        </button>
                    </div>
                </div>
                <div className="sidebar-inner">
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link className="sidebar-link text-color" href={link.href}>
                                    <span className="icon" aria-hidden>
                                        {link.icon === 'home' && (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 9.5L12 3l9 6.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V9.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                        )}
                                        {link.icon === 'search' && (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                                        )}
                                        {link.icon === 'plus' && (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                        )}
                                        {link.icon === 'bell' && (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11c0-3.07-1.64-5.64-4.5-6.32V4a1.5 1.5 0 0 0-3 0v.68C7.64 5.36 6 7.92 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                        )}
                                        {link.icon === 'user' && (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                        )}
                                    </span>
                                    <span className="label">{link.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                                        <div className="sidebar-footer mt-auto">
                                                <Link href="/create-event">
                                                    <button className="create-event-btn" aria-label="Create event" title="Create event">
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                                    </button>
                                                </Link>
                                        </div>
                </nav>
            </aside>

            {/* Mobile drawer overlay */}
            {drawerMounted && (
                <div className={`sidebar-drawer ${open ? 'drawer-enter' : 'drawer-exit'}`} role="dialog" aria-modal="true">
                    <div className="drawer-backdrop" onClick={() => setOpen(false)} />
                    <div className="drawer-panel">
                        <div className="drawer-header">
                            <button onClick={() => setOpen(false)} aria-label="Close menu">✕</button>
                        </div>
                        <ul className="drawer-list">
                            {links.map((link) => (
                                <li key={link.href} onClick={() => setOpen(false)}>
                                    <Link href={link.href} className="drawer-link">{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    )
}

// Drawer unmounting handled via effect inside the component to allow exit animation