"use client";
import Link from 'next/link'
import { useEffect, useState } from 'react'
import './sidebar.css'

const links = [
    { href: '/', label: 'Feed', icon: 'home' },
    { href: '/create-event', label: 'Create', icon: 'plus' },
]


export default function Sidebar() {
    const [open, setOpen] = useState(false) // mobile drawer
    const [drawerMounted, setDrawerMounted] = useState(false)
    const [collapsed, setCollapsed] = useState(true) // desktop collapse — start collapsed by default
    

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
                    <div className="sidebar-profile" style={{ gap: 6 }}>
                        <button
                            className="collapse-btn"
                            onClick={() => setCollapsed((c) => !c)}
                            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                        >
                            {collapsed ? (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            ) : (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            )}
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
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                        )}
                                        {link.icon === 'bell' && (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11c0-3.07-1.64-5.64-4.5-6.32V4a1.5 1.5 0 0 0-3 0v.68C7.64 5.36 6 7.92 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                        )}
                                    </span>
                                    <span className="label">{link.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {/* footer removed: create action moved into nav under Feed */}
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