// src/app/register/page.jsx
"use client";
import React, { useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
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

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
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
        router.push("/login");
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
    <div className="container">
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <Link href="/">
            <p className={styles.brand}>Techpass</p>
          </Link>
          <button
            className={`${styles.toggleBtn} ${styles["toggleBtn-lg"]}`}
            aria-controls="responsive-navbar-nav"
          >
            <span className={styles.srOnly}>Toggle navigation</span>
            <span className={styles.iconBar}></span>
            <span className={styles.iconBar}></span>
            <span className={styles.iconBar}></span>
          </button>
          <div className={styles.collapse}>
            <ul className={`${styles.nav} ${styles["me-auto"]}`}>
              <li className={styles.navItem}>
                <Link href="/">
                  <p className={styles.navLink}>Home</p>
                </Link>
              </li>
            </ul>
            <ul className={styles.nav}>
              <li className={styles.navItem}>
                <Link href="/login">
                  <p className={styles.navLink}>Login</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="main-container form" style={{ maxWidth: '1400px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px'}}>
        <div className="form-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.9)' }}>
            <h1 className={styles.heading}>Register</h1>
            {error && <p className={styles.error}>{error}</p>}
            <form onSubmit={handleRegister} className={styles.form} style={{ width: 'auto' }}>
              <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
                <label htmlFor="username" className={styles.label}>Username:</label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
                <label htmlFor="email" className={styles.label}>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
                <label htmlFor="password" className={styles.label}>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
                <label htmlFor="confirmPassword" className={styles.label}>Confirm Password:</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={styles.input}
                />
              </div>
              <button type="submit" className={`${styles.button} btn btn-primary`} style={{ width: 'auto' }}>
                Register
              </button>
            </form>
            <p>Already have an account? <Link href="/login">Login</Link></p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
