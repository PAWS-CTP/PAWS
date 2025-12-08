import Image from 'next/image';
import Link from "next/link";
import pawsLogo from '../../assets/PAWS_Logo_NoText.png';
import pawsCreatePostButton from '../../assets/PAWS_Create_Post.png';

const links = [
  { href: '/', label: 'Feed' },
  { href: '/profile', label: 'Profile' },
  { href: '/messages', label: 'Messages' },
  { href: '/settings', label: 'Settings' },
];

export default function Sidebar() {
    return (
        <aside id="sidebar" className="sidebar" aria-label="Quick links">
            <div className="sidebar-header" style={{ color: '#258EA6' }}>
                <Link href="/" className="sidebar-logo">
                    <Image
                        src={pawsLogo}
                        alt="PAWS LOGO"
                        style={{ height: '100px', width: 'auto', marginRight: '0.5rem' }}
                    />
                    PAWS
                </Link>
            </div>
            <div className="sidebar-inner">
            </div>
            <nav className="sidebar-nav">
                <ul>
                    {links.map((link) => (
                        <li key={link.href}>
                            <Link className="sidebar-link text-color" href={link.href}>
                                {link.label}
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
                        style={{ height: '100px', width: 'auto', marginRight: '0.5rem' }}
                    />
                    </Link>
                </div>
            </nav>
        </aside>
    )
}