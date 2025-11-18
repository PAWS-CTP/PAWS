"use client";
import React, { useState } from 'react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import pawsLogo from '../../assets/PAWS_Logo_NoText.png';
import { useRouter } from 'next/navigation';
import './navbar.css';

const Navbar: React.FC = () => {
    const [search, setSearch] = useState('');
    const router = useRouter();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return (
        <nav className="paws-navbar">
                        <div className="paws-brand">
                            <button className="paws-logo-button" onClick={() => router.push('/')} aria-label="Home">
                                <Image src={pawsLogo} alt="PAWS" className="paws-logo-img" />
                            </button>
                        </div>
            <ul className="paws-navlist">
                <NavItems />
            </ul>
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={handleSearchChange}
                className="paws-search"
            />
        </nav>
    );
};

function NavItems() {
    const router = useRouter();
    const pathname = (typeof window !== 'undefined') ? window.location.pathname : '/';

    const isActive = (path: string) => {
        if (path === '/') return pathname === '/';
        return pathname.startsWith(path);
    };

    return (
        <>
            <li>
                <button
                    onClick={() => router.push('/')}
                    className={`paws-nav-btn ${isActive('/') ? 'active' : 'feed'}`}
                    aria-label="Go to feed"
                >
                    Feed
                </button>
            </li>
            <li>
                <button
                    onClick={() => router.push('/profile')}
                    className={`paws-nav-btn ${isActive('/profile') ? 'active' : 'link'}`}
                    aria-label="Go to profile"
                >
                    Profile
                </button>
            </li>
            <li>
                <button
                    onClick={() => router.push('/settings')}
                    className={`paws-nav-btn ${isActive('/settings') ? 'active' : 'link'}`}
                    aria-label="Go to settings"
                >
                    Settings
                </button>
            </li>
            <li>
                <button
                    onClick={() => signOut({ callbackUrl: '/login' })}
                    className={`paws-nav-btn ${isActive('/logout') ? 'active' : 'link paws-signout'}`}
                    aria-label="Sign out"
                >
                    Sign Out
                </button>
            </li>
        </>
    );
}

export default Navbar;