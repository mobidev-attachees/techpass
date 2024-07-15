// src/app/register/page.jsx
"use client";
import { useState } from "react";
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
        setUsername(""); // Clear form fields
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        toast.success("Successfully registered", { style: { animation: "fade-in 0.5s",backgroundColor:'green', color:'white', alignContent:'right'} }); // Show success toast with custom style
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
    <div className="container">
        <div className="main-container form" style={{ maxWidth: '1400px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', backgroundImage: `url('/login.jpg')`, // Replace with your image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'}}>
          <div className="form-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.9)', cursor:'pointer', marginTop:'20px'}}>
            <h5 className="">Register</h5>
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
              <button type="submit" className={`${styles.button} btn-rounded-pill btn btn-outline-success`} style={{ width: 'auto' }}>
                Register
              </button>
            </form>
            <p>Already have an account? <a href="/login" className=" text-success fs-5" >Login</a></p>
          </div>
        </div>
    </div>
  );
};

export default Register;

