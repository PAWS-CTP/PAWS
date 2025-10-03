import React, { useState } from 'react';

const Navbar: React.FC = () => {
    const [search, setSearch] = useState('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return (
        <nav style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 2rem',
            backgroundColor: '#fff',
            color: '#fff'
        }}>
            <div style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#258EA6' }}>
                PAWS
            </div>
            <ul style={{
                listStyle: 'none',
                display: 'flex',
                gap: '1.5rem',
                margin: 0,
                padding: 0
            }}>
                <li><a href="/" style={{ color: '#EC22FF', fontWeight: 'bold', textDecoration: 'none' }}>Feed</a></li>
                <li><a href="/profile" style={{ color: '#258EA6', textDecoration: 'none' }}>Profile</a></li>
                <li><a href="/settings" style={{ color: '#258EA6', textDecoration: 'none' }}>Settings</a></li>
                <li><a href="/signout" style={{ color: '#258EA6', textDecoration: 'none' }}>Sign Out</a></li>
            </ul>
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={handleSearchChange}
                style={{
                    padding: '0.5rem',
                    borderRadius: '4px',
                    border: '1px solid #EC22FF',
                    marginLeft: '1rem',
                    fontSize: '1rem',
                    color: '#258EA6',
                    backgroundColor: '#fff'
                }}
            />
        </nav>
    );
};

export default Navbar;