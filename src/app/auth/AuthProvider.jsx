"use client";
import { useEffect, useState, createContext, useContext } from "react";
import { getAuth, onAuthStateChanged, getIdTokenResult, signOut } from "firebase/auth";
import { auth } from "../lib/firebaseConfig"
import { useRouter } from "next/navigation";

const AuthContext = createContext(); // Creating an authentication context to share across the app.

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Subscribe to Firebase authentication state changes.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Set the user in state if they are signed in.
      setLoading(false); // Stop loading once authentication state is known.
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await getIdTokenResult(user);
        setUser(user);
        setUserRole(idTokenResult.claims.role || "user"); // Fetch role from custom claims
      } else {
        setUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup the subscription when the component unmounts.
  }, []);

  // Function to handle user sign-out.
  const handleSignOut = async () => {
    try {
      await signOut(auth); // Sign out the user using Firebase.
      console.log("User signed out"); // Log a success message.
      router.push("/"); // Redirect to the homepage after signing out.
    } catch (error) {
      console.error("Error signing out:", error); // Log any errors that occur during sign-out.
    }
    await signOut(auth);
    router.push("/");
  };

  return (
    // Providing the user, loading state, and sign-out function to the context.
    <AuthContext.Provider value={{ user, loading, handleSignOut }}>
      {children} {/* Render all children components that are wrapped in this provider */}
    <AuthContext.Provider value={{ user, userRole, loading, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access authentication context from anywhere in the app.
export const useAuth = () => {
  return useContext(AuthContext); // Returns the authentication context (user, loading, handleSignOut).
};
export const useAuth = () => useContext(AuthContext);
