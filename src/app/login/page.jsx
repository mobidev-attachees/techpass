// app/login/page.js
"use client";
import React from "react";
import Link from 'next/link'; // Import Link from Next.js
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Login() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/dashboard");
  };

  return (
    <>
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
              {/* <li className={styles.navItem}>
                <Link href="/login">
                  <p className={styles.navLink}>Create Event</p>
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link href="#action">
                  <p className={styles.navLink}>My events</p>
                </Link>
              </li> */}
            </ul>
            <ul className={styles.nav}>
              {/* <li className={styles.navItem}>
                <Link href="#deets">
                  <p className={styles.navLink}>
                    <img src="175.jpg" alt="profile photo" className={styles.navImage} />
                  </p>
                </Link>
              </li> */}
              <li className={styles.navItem}>
                <Link href="/register">
                  <p className={styles.navLink}>Register</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="main-container form" style={{ maxWidth: '600px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.9)' }}>
        <div className="form-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1>Login</h1>
          <form style={{ width: 'auto' }}>
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label htmlFor="email">Email:</label>
              <input type="email" name="email" className="form-control" id="email" />
            </div>
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" className="form-control" id="password" />
            </div>
            <button type="button" onClick={handleLogin} className="btn btn-primary" style={{ width: 'auto' }}>
              Login
            </button>
          </form>
          {/* Add Link component for Sign up */}
          <p> Do not have an account? <Link href="/register">Sign up</Link></p>
        </div>
      </div>
    </main>
    </>
  );
}

