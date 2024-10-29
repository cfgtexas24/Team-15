"use client"; // Enabling client-side behavior

import { useEffect } from "react";
import { useAuth } from "../auth/AuthProvider"; // Adjust path if needed
import { useRouter } from "next/navigation";
import React from 'react'
import JobListing from './JobListing'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

import UserDashboard from "./UserDashboard";
import EmployerDashboard from "./EmployerDashboard";


export default function DashboardPage() {
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

  const desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  const dummy = [
    {
      id: 1,
      name: "Software Engineer Intern",
      location: "1234 Windonway Lane"

    },
    {
      id: 2,
      name: "Retail Manager",
      location: "1234 Windonway Lane"
    },
    {
      id: 3,
      name: "Software Engineer",
      location: "1234 Windonway Lane"
    },
    {
      id: 4,
      name: "Software Engineer",
      location: "1234 Windonway Lane"
    },
    {
      id: 5,
      name: "Software Engineer",
      location: "1234 Windonway Lane"
    },
    {
      id: 6,
      name: "Software Engineer",
      location: "1234 Windonway Lane"
    }
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {userRole === "user" && <UserDashboard />}
      {userRole === "employer" && <EmployerDashboard />}
    </div>
  );
}
