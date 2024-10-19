'use client'
import { useEffect } from 'react';
import { useAuth } from '../auth/AuthProvider';
import { useRouter } from 'next/navigation';

export default function ProtectedPage() {
  const { user, loading, handleSignOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login'); // Redirect to login page if not authenticated
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return null; // Prevents rendering if user isn't available (to avoid flickers)
  }

  return (
    <div>
      <h1>This is a protected page!</h1>
      <p>Welcome, {user.email}</p>
      <button onClick={handleSignOut} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
        Sign Out
      </button>
    </div>
  );
}