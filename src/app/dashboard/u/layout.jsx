"use client";
import { useAuth } from "../../auth/AuthProvider";
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

    // Redirect to home if user is not authenticated
    useEffect(() => {
        if (!userRole == "user") {
            router.back();
        }
    }, [userRole, router]);

    if (loading) return <p>Loading...</p>;

    // Prevent flickering if user is null
    if (!user) {
        return <p>Unauthorized</p>;
    }

    return (
            <main>{children}</main>
    );
}
