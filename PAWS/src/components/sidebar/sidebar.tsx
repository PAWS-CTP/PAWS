const links = [
  { href: '/feed', label: 'Feed' },
  { href: '/profile', label: 'Profile' },
  { href: '/messages', label: 'Messages' },
  { href: '/settings', label: 'Settings' },
];

export default function Sidebar() {
    return (
        <aside id="sidebar" className="sidebar" aria-label="Quick links">
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