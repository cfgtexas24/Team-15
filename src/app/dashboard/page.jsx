"use client"; // Enabling client-side behavior

import { useEffect } from "react";
import { useAuth } from "../auth/AuthProvider"; // Adjust path if needed
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user, loading, handleSignOut } = useAuth();
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">This is a protected page!</h1>
      <p className="text-lg mb-6">Welcome, {user.email}</p>
      <button
        onClick={handleSignOut}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Sign Out
      </button>
    </div>
  );
}
