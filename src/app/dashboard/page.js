"use client";
import Link from "next/link";
import styles from "./page.module.css";

export default function dashboard() {
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
              {/* <li className={styles.navItem}>
                <Link href="event">
                  <p className={styles.navLink}>Home</p>
                </Link>
              </li> */}
              <li className={styles.navItem}>
                <Link href="/createevent">
                  <p className={styles.navLink}>Create Event</p>
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link href="/events">
                  <p className={styles.navLink}>My events</p>

                </Link>
              </li>
            </ul>
            <ul className={styles.nav}>
                <ul className={styles.nav}>
                  <li className={styles.navItem}>
                    <Link href="#deets">
                      <p className={styles.navLink}>
                        <img src="175.jpg" alt="profile photo" className={styles.navImage} />
                        
                      </p>
                    </Link>
                  </li>
                </ul>

              <li className={styles.navItem}>
                <Link href="/login">
                  <p className={styles.navLink}>Logout</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      {/* Your page content goes here */}
    </>
  );
}
