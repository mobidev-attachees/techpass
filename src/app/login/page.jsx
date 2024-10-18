"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import Spinner from '../components/Spinner';
import styles from "./page.module.css";

function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined") {
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
    }
  }, [searchParams]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

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
        if (typeof window !== "undefined") {
          localStorage.setItem("token", data.token);
          localStorage.setItem("sessionId", data.sessionId);
          window.location.href = "/profile";

          toast.success("Login successful", {
            style: {
              animation: "fade-in 3s", 
              backgroundColor: 'green', 
              color: 'white', 
              textAlign: 'right',
            }
          });
        }
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
    <div className="container bg-white" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <Toaster />
     
      <div
        className="row rounded-3 text-black mt-3 mb-3"
        style={{
          maxWidth: '1000px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          backgroundImage: 'url(/login.jpg)', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%'
        }}
      >
      <div className="row g-0 ">
        <div className="col-lg-6">
          <div className="col p-md-5 mx-md-4">
            <div className="text-center mb-5 rounded-circle">
              <div className="mb-3 text-center">
              <img src="/favicon.ico" width="100" alt="Techpass" className="rounded-circle"/>
              </div>
            </div>

            <form style={{ width: 'auto' }} onSubmit={handleLogin}>
              <h4>Sign in to your account</h4>

              <div className="form-group mb-4">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group mb-4">
                <label htmlFor="password">Password:</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '5px',
                    }}
                  >
                    {showPassword ? (
                      // SVG for hiding the password
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
                        <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
                      </svg>
                    ) : (
                      // SVG for showing the password (eye icon)
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="text-center pt-1 mb-5 pb-1 row">
                    <div className="col  shadow-lg rounded btn-block fa-lg gradient-custom-2 mb-3 " style={{background: 'linear-gradient(to right, #005f30, #3cc33c, #00b09b)', color: '#fff', padding: '20px',}}>
                      <button
                        className="btn text-white" // Using btn-link for no button style and text-white for white color
                        type="submit"
                        style={{ border: 'none', background: 'none', padding: 0, textUnderline:'none' }} // Additional inline styles
                      >
                        Login
                      </button>

                    </div>
                    <a className="text-muted text-lg" href="#!">Forgot password?</a>
              </div>
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>

            <div className="d-flex align-items-center justify-content-center pb-4">
              <p className="mb-0 me-2">Dont have an account?</p>
              <a href="/register" className="text-blue">
                Sign up
              </a>
            </div>
          </div>
        </div>

        {/* Right Column with Gradient Background */}
        <div
          className="col-lg-6 d-flex align-items-center"
          style={{
            background: 'linear-gradient(to right, #005f30, #3cc33c, #00b09b)',
            color: '#fff',
            padding: 'auto',
            borderTopRightRadius: '0.3rem',
            borderBottomRightRadius: '0.3rem',
          }}
        >
          <div className="text-white px-3 py-4 p-md-5 mx-md-4">
            <h4 className="mb-4">Organize your events in one place</h4>
            <p className="large mb-0">
              Welcome to TechPass, your ultimate event platform where you can effortlessly create and manage your events with ease, ensuring a seamless experience from start to finish!
            </p>
          </div>
        </div>
      </div>
    </div>
  
</div>

);
};
  

export default function Login() {
  return (
    <Suspense fallback={<div><Spinner /></div>}>
      <LoginContent />
    </Suspense>
  );
}
