/**
 * @file page.js
 * @description This component provides the user registration functionality for the "Rebirth Empowering Education" platform.
 * It includes a form where users can sign up by providing their name, email, and password. The registration process is
 * handled using Firebase Authentication, and the user is created with their email and password. If the sign-up process 
 * fails, an error message is displayed to the user.
 * 
 * @dependencies 
 * - Firebase Authentication (createUserWithEmailAndPassword) for handling user registration.
 * - React hooks (useState) for managing form state (name, email, password) and error handling.
 * 
 * @function handleSignup
 * Handles the form submission for user registration. It attempts to create a new user with the provided email and password
 * using Firebase Authentication. On success, it logs a message, and on failure, it displays an error message.
 * 
 * @component Signup
 * Renders a sign-up form with inputs for name, email, and password. It handles the registration process and shows error 
 * messages if the registration fails.
 * 
 * @state name
 * Stores the user's name input from the form.
 * 
 * @state email
 * Stores the user's email input from the form.
 * 
 * @state password
 * Stores the user's password input from the form.
 * 
 * @state error
 * Stores any error message that occurs during the sign-up process.
 */
'use client'; // Specifies that this component should be rendered on the client side.

import { useState } from "react"; // React hook to manage component state.
import { auth } from "../../app/lib/firebaseConfig"; // Firebase authentication configuration.
import { createUserWithEmailAndPassword } from "firebase/auth"; // Firebase method to create a new user with email and password.

export default function Signup() {
  // State variables to manage form inputs and error messages.
  const [name, setName] = useState(""); // State to track the user's name.
  const [email, setEmail] = useState(""); // State to track the user's email.
  const [password, setPassword] = useState(""); // State to track the user's password.
  const [error, setError] = useState(""); // State to track any errors during the sign-up process.

  // Function to handle the form submission for user registration.
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent the default form submission (page reload).

    try {
      // Create a new user with email and password using Firebase Authentication.
      await createUserWithEmailAndPassword(auth, email, password);
      // Log a message indicating the user has been successfully registered.
      console.log("User registered:", email);
      // You can redirect or show a success message here (optional).
    } catch (error) {
      setError(error.message); // Set the error state to display the error message.
      console.error("Error signing up:", error); // Log the error in the console for debugging.
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#475299]">
      {/* Sign-up form container */}
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Rebirth Empowering Education</h2>

        {/* Display error message if there's an error during sign-up */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Form for user registration */}
        <form onSubmit={handleSignup}>
          {/* Name input field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name} // Bind input value to the name state.
              onChange={(e) => setName(e.target.value)} // Update name state when input changes.
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              required // Make this field required for form submission.
            />
          </div>

          {/* Email input field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email} // Bind input value to the email state.
              onChange={(e) => setEmail(e.target.value)} // Update email state when input changes.
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              required // Make this field required for form submission.
            />
          </div>

          {/* Password input field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password} // Bind input value to the password state.
              onChange={(e) => setPassword(e.target.value)} // Update password state when input changes.
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              required // Make this field required for form submission.
            />
          </div>

          {/* Submit button for the sign-up form */}
          <button
            type="submit"
            className="w-full bg-[#FFC00D] text-white py-2 rounded hover:bg-[#a48736] transition"
          >
            Sign Up
          </button>
        </form>

        {/* Link to the login page for users who already have an account */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}
