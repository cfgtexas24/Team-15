"use client";

import { useAuth } from "../auth/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function UserDashboard() {
  const { user, loading, handleSignOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/"); // Redirect to login if not authenticated
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center">
      <h2>Welcome, {user?.email}!</h2>
    </div>
  );
}
