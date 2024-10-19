/**
 * @file layout.jsx
 * @description This is the root layout component for the Next.js app, responsible for providing a global 
 * structure and styles for the application. It incorporates global CSS, font styles, and wraps the app 
 * within the AuthProvider to manage authentication state across the app.
 * 
 * @dependencies
 * - next/font/local: Used to load local fonts (EuropaNuova) for custom typography.
 * - next/font/google: Imports the Montserrat font from Google Fonts.
 * - AuthProvider: A custom authentication provider to manage authentication state for the app.
 * - globals.css: Global CSS file to apply styles across the entire app.
 * 
 * @component RootLayout
 * Wraps the entire application in HTML with a body element that applies custom fonts and ensures 
 * consistent styling (including antialiasing). The AuthProvider ensures that authentication context is 
 * available to all children components.
 * 
 * @param {Object} children - The components nested within the RootLayout that will be rendered inside.
 */


import localFont from "next/font/local";                    // Import for loading local fonts.
import "./globals.css";                                     // Global CSS file to apply universal styles across the app.
import { AuthProvider } from "./auth/AuthProvider";         // Custom AuthProvider component for handling authentication state.
import { Montserrat } from "next/font/google";              // Importing Montserrat font from Google Fonts.

// Defining local Europa font family with different weights.
const europa = localFont({
  src: [
    {
      path: "./fonts/EuropaNuovaBold.ttf",
      weight: "700" // Bold weight.
    },
    {
      path: "./fonts/EuropaNuovaExtraBold.ttf",
      weight: "800" // Extra bold weight.
    },
    {
      path: "./fonts/EuropaNuovaRegular.ttf",
      weight: "400" // Regular weight.
    }
  ],
  variable: "--font-europa" // CSS variable for Europa font.
});

// Importing Montserrat font with Latin subset for text rendering.
const montserrat = Montserrat({ subsets: ['latin'] });

// Metadata for the app, setting the title and description.
export const metadata = {
  title: "Create Next App", // Page title.
  description: "Generated by create next app", // Page description.
};

export default function RootLayout({ children }) {
  return (
    // Wrapping the app within HTML and setting the language attribute.
    <html lang="en">
      <body
        className={` ${europa.variable} ${montserrat.className} antialiased`}
        // Applying both Europa and Montserrat fonts and enabling antialiasing for better font rendering.
      >
        {/* Providing authentication context to all children components */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
