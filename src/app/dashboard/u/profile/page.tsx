"use client";

import { useAuth } from "../../../auth/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EmployerDashboard() {
  const { user, loading, handleSignOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/"); // Redirect to login if not authenticated
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <button
        onClick={handleSignOut}
        className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-600 transition"
      >
        Sign Out
      </button>
    </div>
  );
}
