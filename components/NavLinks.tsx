'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/meetings', label: 'All Meetings' },
  { href: '/meetings/current', label: 'Current Sunday' },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main Navigation" className="flex items-center gap-1 sm:gap-2">
      {navItems.map((item) => {
        const isActive =
          item.href === '/'
            ? pathname === '/'
            : item.href === '/meetings'
            ? pathname === '/meetings'
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              isActive
                ? 'bg-blue-700 text-white shadow-sm dark:bg-blue-600'
                : 'text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
