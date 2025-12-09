"use client";
import Image from 'next/image';
import Link from "next/link";
import { useState } from 'react';
import pawsLogo from '../../assets/PAWS_Logo_NoText.png';
import pawsCreatePostButton from '../../assets/PAWS_Create_Post.png';
import './sidebar.css';

const links = [
  { href: '/', label: 'Feed' },
  { href: '/profile', label: 'Profile' },
  { href: '/messages', label: 'Messages' },
  { href: '/settings', label: 'Settings' },
];

export default function Sidebar() {
    const [open, setOpen] = useState(false) // mobile drawer
    const [collapsed, setCollapsed] = useState(false) // desktop collapse

    return (
        <>
            {/* Hamburger for mobile */}
            <button
                className="sidebar-hamburger"
                aria-label="Open menu"
                onClick={() => setOpen(true)}
            >
                <span className="hamburger-line" />
                <span className="hamburger-line" />
                <span className="hamburger-line" />
            </button>

            <aside id="sidebar" className={`sidebar ${collapsed ? 'collapsed' : ''}`} aria-label="Quick links">
                <div className="sidebar-header" style={{ color: '#258EA6' }}>
                    <div className="sidebar-top">
                        <Link href="/" className="sidebar-logo">
                            <Image
                                src={pawsLogo}
                                alt="PAWS LOGO"
                                style={{ height: '64px', width: 'auto', marginRight: '0.5rem' }}
                            />
                            <span className="logo-text">PAWS</span>
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
                                    <span className="label">{link.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="sidebar-footer mt-auto">
                        <Link
                            href="/create-event"
                        >
                        <Image
                            src={pawsCreatePostButton}
                            alt="Create Post"
                            style={{ height: '64px', width: 'auto', marginRight: '0.5rem' }}
                        />
                        </Link>
                    </div>
                </nav>
            </aside>

            {/* Mobile drawer overlay */}
            {open && (
                <div className="sidebar-drawer" role="dialog" aria-modal="true">
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