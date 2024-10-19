"use client"; // Enabling client-side behavior

import { useEffect } from "react";
import { useAuth } from "../auth/AuthProvider"; // Adjust path if needed
import { useRouter } from "next/navigation";

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {userRole === "user" && <UserDashboard />}
      {userRole === "employer" && <EmployerDashboard />}
    </div>
  );
}
