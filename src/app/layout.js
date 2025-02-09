"use client";
import { Inter } from "next/font/google";
import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { ClerkProvider } from '@clerk/nextjs'; 

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  useEffect(() => {
    // Dynamically import the Bootstrap JavaScript bundle
    import("bootstrap/dist/js/bootstrap.bundle.min.js")
      .then(() => {
        console.log("Bootstrap JS loaded");
      })
      .catch(err => console.error("Failed to load Bootstrap JS:", err));
  }, []);

  return (
    <html lang="en" className={inter.className}>
      <head>
        <title>Techpass</title>
        <meta name="description" content="Techpass" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="bSMCyyhoPqQ_80xKSOCdpDkR0QzcNuKG3dWeq9fLJcQ" />
      </head>
      <body>
        <ClerkProvider frontendApi={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API}>
          <Toaster />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
