"use client";

import Image from 'next/image';
import './style.css'
import { usePathname } from 'next/navigation';
import { useAuth } from "../auth/AuthProvider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Link from 'next/link';

export default function DashboardLayout({ children }) {
    const { user, userRole, loading, handleSignOut } = useAuth();
    const router = useRouter();

    // Redirect to home if user is not authenticated
    useEffect(() => {
        if (!loading && !user) {
            router.push("/"); // Redirect to login
        }
    }, [user, loading, router]);

    if (loading) return <p>Loading...</p>;

    // Prevent flickering if user is null
    if (!user) {
        return <p>Unauthorized</p>;
    }

    const pathname = usePathname();

    const userNavItems = [
        { href: '/dashboard', label: 'Job Postings' },
        { href: '/dashboard/e/calendar', label: 'Calendar' },
        { href: '/dashboard/u/inbox', label: 'Inbox' },
        { href: '/dashboard/u/profile', label: 'Profile' },
    ]

    const empNavItems = [
        { href: '/dashboard', label: 'Job Postings' },
        // { href: '/dashboard/e/inbox', label: 'Inbox' },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="navbar">

                <div className='flex items-center gap-3'>
                    <div><Image src="/assets/images/logo.png" className="logo" width={70} height={70} /></div>
                    <h1 className='ml-0 font-bold text-lg'>Rebirth Empowerment Education</h1>
                </div>

                <div className='flex gap-3'>
                    <ul className="navOptions ">
                        {userRole == "user" && userNavItems.map((item) => (
                            <Link key={item.href} href={item.href} className={pathname === item.href ? 'text-white p-2 border border-black bg-[#475299] rounded' :  'bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 transition'}>{item.label}</Link>
                        ))}
                        {userRole == "employer" && empNavItems.map((item) => (
                            <Link key={item.href} href={item.href} className={pathname === item.href ? 'text-white p-2 border border-black bg-[#475299] rounded' :  'bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 transition'}>{item.label}</Link>
                        ))}
                    </ul>
                    <button
                        onClick={handleSignOut}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    >
                        Sign Out
                    </button>
                </div>
            </nav>
            <main>{children}</main>
        </div>
    );
}
