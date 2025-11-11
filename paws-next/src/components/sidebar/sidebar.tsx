import Image from 'next/image';
import pawsLogo from '../../assets/PAWS_Logo_NoText.png';

const links = [
  { href: '/feed', label: 'Feed' },
  { href: '/profile', label: 'Profile' },
  { href: '/messages', label: 'Messages' },
  { href: '/settings', label: 'Settings' },
];

export default function Sidebar() {
    return (
        <aside id="sidebar" className="sidebar" aria-label="Quick links">
            <div className="sidebar-header" style={{ color: '#258EA6' }}>
                <Image
                    src={pawsLogo}
                    alt="PAWS LOGO"
                    style={{ height: '100px', width: 'auto', marginRight: '0.5rem' }}
                />
                PAWS
            </div>
            <div className="sidebar-inner">
            </div>
            <nav className="sidebar-nav">
                <ul>
                    {links.map((link) => (
                        <li key={link.href}>
                            <a className="sidebar-link text-color" href={link.href}>
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}