import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
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
              <li className={styles.navItem}>
                <Link href="/login">
                  <p className={styles.navLink}>Create Event</p>
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link href="#action">
                  <p className={styles.navLink}>My events</p>
                </Link>
              </li>
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
                <Link href="/login">
                  <p className={styles.navLink}>login</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main className={styles.main}>
        <div className={styles.imageContainer}>
          <Image
            className={styles.banner}
            src="/220.jpg"
            alt="banner image"
            width={200}
            height={200}
            layout="responsive"
          />
          <div className={styles.textOverlay}>
            <h2 style={{ margin: 0, fontSize: '2em', color:'white' }}>TechPass</h2>
            <p style={{ margin: 0, fontSize: '1em', color:'white' }}>The best platform for online meetings</p>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <Link href="/event">
              <div>
                <Image
                  src="/223.jpg"
                  alt="event 1"
                  width={200}
                  height={200}
                />
                <h2>Event 1</h2>
                <p>Date:</p>
              </div>
            </Link>
          </div>

          <div className={styles.card}>
            <Link href="/event">
              <div>
                <Image
                  src="/226.jpg"
                  alt="event 2"
                  width={200}
                  height={200}
                />
                <h2>Event 2</h2>
                <p>Date:</p>
              </div>
            </Link>
          </div>

          <div className={styles.card}>
            <Link href="/event">
              <div>
                <Image
                  src="/223.jpg"
                  alt="event 1"
                  width={200}
                  height={200}
                />
                <h2>Event 1</h2>
                <p>Date:</p>
              </div>
            </Link>
          </div>

          <div className={styles.card}>
            <Link href="/event">
              <div>
                <Image
                  src="/223.jpg"
                  alt="event 1"
                  width={200}
                  height={200}
                />
                <h2>Event 1</h2>
                <p>Date:</p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
