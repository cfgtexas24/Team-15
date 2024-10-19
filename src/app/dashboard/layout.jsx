"use client";
import Image from 'next/image';
import './style.css'
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  const navItems=[
    {href: '/dashboard', label:'Job Postings'},
    {href: '/dashboard/test', label:'Messages'},
    {href: '/', label:'Calendar'},
    {href: '/', label:'Inbox'},
    {href: '/', label:'Profile'},
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="navbar">
        <Image src="/assets/images/mainLogo.png" className="logo" width={175} height={125} />
        <ul className="navOptions">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={ pathname === item.href ? 'text-white p-2 border border-black bg-[#475299]' : 'text-black p-2'}>{item.label}</Link>
          ))}
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  );
}
