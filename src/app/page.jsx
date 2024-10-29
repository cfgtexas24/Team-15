/**
 * @file page.jsx
 * @description This component handles the login functionality for the "Rebirth Empowering Education" platform.
 * It renders a login form where users can input their email and password, then authenticate via Firebase.
 * On successful login, users are redirected to the dashboard. If an error occurs (e.g., incorrect credentials),
 * the error message is displayed to the user. The form and its inputs are styled using Tailwind CSS.
 * 
 * @dependencies 
 * - Firebase authentication (signInWithEmailAndPassword) for handling the login.
 * - Next.js useRouter for client-side navigation after a successful login.
 * - useState hook from React to manage input states (email, password) and error handling.
 * 
 * @function handleLogin
 * Prevents default form submission and performs Firebase authentication.
 * On success, redirects to the "/dashboard". On failure, displays the error message.
 */

"use client";                                                     // This directive tells Next.js that this component should be rendered on the client side.
import { useState } from "react";                                 // useState is used for managing component state (email, password, error).
import { useRouter } from "next/navigation";                      // useRouter allows for programmatic navigation within the Next.js app.
import { signInWithEmailAndPassword } from "firebase/auth";       // Firebase method for authenticating users with email and password.
import { auth } from "../app/lib/firebaseConfig";                 // Import the Firebase authentication configuration from your app's configuration.

export default function Login() {
  // Declare state variables for storing email, password, and error messages.
  const [email, setEmail] = useState(""); // Store user input for email.
  const [password, setPassword] = useState(""); // Store user input for password.
  const [error, setError] = useState(null); // Store any error messages from Firebase authentication.
  const router = useRouter(); // Initialize router for navigation.

  // Function to handle form submission and login
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior (which reloads the page).
    try {
      // Attempt to sign in the user using Firebase authentication.
      await signInWithEmailAndPassword(auth, email, password);
      // If successful, redirect the user to the dashboard page.
      router.push("/dashboard");
    } catch (err) {
      // If an error occurs (e.g., wrong credentials), set the error message to display it in the UI.
      setError(err.message);
    }
  };

  return (
    // Full-screen container to center the login form.
    <div className="flex items-center justify-center min-h-screen bg-[#475299]">
      {/* Login form container */}
      <div className="bg-white p-8 rounded shadow-md w-96">
        {/* Header of the login form */}
        <h2 className="text-2xl font-bold mb-6 text-center">
          Rebirth Empowering Education
        </h2>

        {/* Form to handle login */}
        <form onSubmit={handleLogin}>
          {/* Email input field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email} // Binds the input value to the email state variable.
              onChange={(e) => setEmail(e.target.value)} // Updates the email state when the user types.
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              required // Makes the field required before form submission.
            />
          </div>

          {/* Password input field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password} // Binds the input value to the password state variable.
              onChange={(e) => setPassword(e.target.value)} // Updates the password state when the user types.
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              required // Makes the field required before form submission.
            />
          </div>

          {/* Display error message if an authentication error occurs */}
          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}

          {/* Submit button for the login form */}
          <button
            type="submit"
            className="w-full bg-[#FFC00D] text-white py-2 rounded hover:bg-[#a48736] transition"
          >
            Login
          </button>
        </form>

        {/* Link to redirect the user to the signup page if they don't have an account */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
