// app/login/page.js
"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { toast, Toaster } from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const msg = searchParams.get('message');
    if (msg) {
      toast.error(msg, { 
        style: { 
          animation: "fade-in 0.5s", 
          backgroundColor: 'red', 
          color: 'white', 
          textAlign: 'center'
        } 
      });
    }
  }, [searchParams]);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check for empty email or password fields
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Check password length
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Store the JWT token and session ID in local storage
        localStorage.setItem("token", data.token);
        localStorage.setItem("sessionId", data.sessionId);
        
        // Redirect to the dashboard page
        window.location.href = "/dashboard";
      } else {
        const data = await response.json();
        setError(data.message);
        toast.error(data.message, {
          style: {
            animation: "fade-in 3s", 
            backgroundColor: 'red', 
            color: 'white', 
            textAlign: 'center'
          }
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login");
      toast.error("An error occurred during login", {
        style: {
          animation: "fade-in 3s", 
          backgroundColor: 'red', 
          color: 'white', 
          textAlign: 'center'
        }
      });
    }
  };

  return (
    <div className="container">
      <Toaster /> {/* Add Toaster component here */}
      <main style={{ 
        backgroundImage: `url('/login.jpg')`, // Replace with your image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}>
        <div className="main-container form" style={{ 
          maxWidth: '600px', 
          padding: '20px', 
          backgroundColor: '#fff', 
          borderRadius: '8px', 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.9)' 
        }}>
          <div className="form-wrapper" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center' 
          }}>
            <h1>Login</h1>
            <form style={{ width: 'auto' }} onSubmit={handleLogin}>
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-outline-success" style={{ width: 'auto' }}>
                Login
              </button>
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
            <p> Do not have an account? <a href="/register" className="text-success fs-5">Sign up</a></p>
          </div>
        </div>
      </main>
    </div>
  );
}
