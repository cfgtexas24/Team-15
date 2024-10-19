/**
 * @file AuthProvider.jsx
 * @description This component provides authentication context to manage user authentication state across the application.
 * It uses Firebase Authentication to track the user's signed-in status and provides a mechanism to sign out.
 * The context makes the current user and loading state accessible to any component that needs it through the useAuth hook.
 * 
 * @dependencies 
 * - Firebase authentication (onAuthStateChanged, signOut) for monitoring the authentication state and handling user sign-out.
 * - React hooks (useState, useEffect, createContext, useContext) for managing state and providing the authentication context.
 * - next/navigation for client-side navigation (used to redirect after sign-out).
 * 
 * @function handleSignOut
 * Signs out the currently authenticated user and redirects to the homepage.
 * 
 * @component AuthProvider
 * Provides the authentication context (user, loading, handleSignOut) to all child components via React's Context API.
 * 
 * @hook useAuth
 * Custom hook that allows easy access to the authentication context within any component.
 */


'use client' // Specifies that this component should be rendered on the client side.

import { createContext, useContext, useEffect, useState } from 'react'; // React hooks and context utilities.
import { auth } from "../lib/firebaseConfig"; // Firebase authentication configuration.
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Firebase functions to handle authentication state changes and signing out.
import { useRouter } from 'next/navigation'; // Next.js router for client-side navigation.

const AuthContext = createContext(); // Creating an authentication context to share across the app.

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to store the current user.
  const [loading, setLoading] = useState(true); // State to indicate whether authentication information is being loaded.
  const router = useRouter(); // Next.js router for handling redirects.

  // useEffect hook to monitor authentication state changes.
  useEffect(() => {
    // Subscribe to Firebase authentication state changes.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Set the user in state if they are signed in.
      setLoading(false); // Stop loading once authentication state is known.
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
  };

  return (
    // Providing the user, loading state, and sign-out function to the context.
    <AuthContext.Provider value={{ user, loading, handleSignOut }}>
      {children} {/* Render all children components that are wrapped in this provider */}
    </AuthContext.Provider>
  );
};

// Custom hook to access authentication context from anywhere in the app.
export const useAuth = () => {
  return useContext(AuthContext); // Returns the authentication context (user, loading, handleSignOut).
};
