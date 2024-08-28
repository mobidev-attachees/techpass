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
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
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
        toast.success("Successfully registered", { style: { animation: "fade-in 0.5s", backgroundColor: 'green', color: 'white', alignContent: 'right' } }); // Show success toast with custom style
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
  <div className="main-container form" style={{
    maxWidth: '1400px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', backgroundImage: `url('/login.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <div className="form-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.9)', cursor: 'pointer', marginTop: '20px' }}>
      <div className="mb-3 mt-3 text-center">
        <img src="/favicon.ico" width="60" alt="" className="rounded-circle" />
      </div>
      <div className="text-center mb-4">
        <h5 className="">Techpass</h5>
        <p className="mb-0 text-success">Create account to get started</p>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleRegister} className={styles.form} style={{ width: 'auto' }}>
        <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
          <label htmlFor="username" className={styles.label}>Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
            required // Add required attribute here
          />
        </div>
        <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
          <label htmlFor="email" className={styles.label}>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required // Add required attribute here
          />
        </div>
        <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
          <label htmlFor="password" className={styles.label}>Password:</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? "text" : "password"} // Toggle between text and password type
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required // Add required attribute here
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}>
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
                  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
                  <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
          <label htmlFor="confirmPassword" className={styles.label}>Confirm Password:</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? "text" : "password"} // Toggle between text and password type
              name="confirmPassword"
              placeholder="Retype your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.input}
              required // Add required attribute here
            />
          </div>
        </div>
        <button type="submit" className={`${styles.button} btn-rounded-pill btn btn-outline-success`} style={{ width: 'auto' }}>
          Register
        </button>
      </form>
      <p>Already have an account? <Link href="/login" className=" text-success fs-5">Login</Link></p>
    </div>
  </div>
</div>

  );
};

export default Register;

