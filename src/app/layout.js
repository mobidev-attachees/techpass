"use client";
import { Inter } from "next/font/google";
import React, { useEffect } from 'react';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import { Toaster } from 'react-hot-toast';
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';



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
    <html lang="en">
      <Head>
        <title>Techpass</title>
        <meta name="description" content="Techpass" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
      </Head>
      <body className={inter.className}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
