// src/app/register/page.jsx
"use client";
import { useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import styles from "./page.module.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token");
    if (token) {
      toast.error("You are already logged in.", {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#f44336",
          color: "#ffffff",
          zIndex: 99999,
        },
      });
      // Redirect back to the previous page without reloading
      router.back();
    }
  }, [router]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    // Check for at least one uppercase letter, one lowercase letter, one digit, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");  // Reset error message

    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        setUsername(""); // Clear form fields
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        toast.success("Account created successfully", { 
          style: { 
            animation: "fade-in 0.5s", 
            backgroundColor: 'green', 
            color: 'white', 
            alignContent: 'right' 
          }
        }); // Show success toast with custom style
        setTimeout(() => {
          router.push("/login"); // Redirect to login after 2 seconds
        }, 2000);
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("An error occurred during registration");
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
        <div className="row g-0">
          {/* Left Column - Registration Form */}
          <div className="col-lg-6">
            <div className="p-md-5 mx-md-4">
              <div className="text-center mb-5 rounded-circle">
                <div className="mb-3">
                  <img src="/favicon.ico" width="150" alt="Techpass" className="rounded-circle"/>
                </div>
              </div>

              <form style={{ width: '100%' }} onSubmit={handleRegister}>
                <h4 className="mb-4">Create Your Account</h4>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <div className="form-group mb-4">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="Enter your username"
                  />
                </div>

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
                    <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}>
                        {showPassword ? (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                              <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
                              <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
                              <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
                            </svg>
                            <span style={{ marginLeft: '8px' }}>hide</span>
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                            </svg>
                            
                            <span style={{ marginLeft: '8px' }}>show</span>
                          </>
                        )}
                      </button>

                  </div>
                </div>

                <div className="form-group mb-4">
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      className="form-control"
                      id="confirmPassword"
                      placeholder="Retype your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="text-center pt-1 mb-5 pb-1">
                  <div
                    className="shadow-lg rounded btn-block fa-lg gradient-custom-2 mb-3"
                    style={{
                      background: 'linear-gradient(to right, #005f30, #3cc33c, #00b09b)',
                      color: '#fff',
                      padding: '20px',
                    }}
                  >
                    <button
                      className="btn text-white"
                      type="submit"
                      style={{
                        border: 'none',
                        background: 'none',
                        padding: 0,
                        width: '100%',
                        cursor: 'pointer',
                      }}
                    >
                      Register
                    </button>
                  </div>
                  <a className="text-muted text-lg" href="#!">Forgot password?</a>
                </div>
              </form>

              <div className="d-flex align-items-center justify-content-center pb-4">
                <p className="mb-0 me-2">Already have an account?</p>
                <Link href="/login" className="text-blue">
                  Login
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column with Gradient Background */}
          <div
            className="col-lg-6 d-flex align-items-center"
            style={{
              background: 'linear-gradient(to right, #005f30, #3cc33c, #00b09b)',
              color: '#fff',
              padding: '40px',
              borderTopRightRadius: '8px',
              borderBottomRightRadius: '8px',
            }}
          >
            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 className="mb-4">Join TechPass Today!</h4>
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

export default Register;

