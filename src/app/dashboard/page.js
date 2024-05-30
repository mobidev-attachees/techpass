"use client";
import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";

export default function dashboard() {
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
      <main className={styles.main}>
       {/* Search Bar */}
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px', maxWidth: '600px', width: '100%', marginLeft:'30%', marginTop: '30px'}}>
          <input type="text" placeholder="Search..." style={{ flex: '1', padding: '10px', borderRadius: '4px', marginRight: '0px', border: '1px solid #ccc', maxWidth: '70%' }} />
          <select name="cities" style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', maxWidth: '28%' }}>
            <option value="newyork">New York</option>
            <option value="losangeles">Los Angeles</option>
            <option value="chicago">Chicago</option>
            <option value="houston">Houston</option>
            <option value="phoenix">Phoenix</option>
          </select>
        </div>
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
        {/* Explore Categories */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '20px', maxWidth: '600px', width: '100%',margin:'20px 30%', marginRight:'20%' }}>
          <h4>Explore Categories</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <select name="categories" style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', marginRight: '10px', flex: '1' }}>
              <option value="last30days">Last 30 Days</option>
              <option value="last7days">Last 7 Days</option>
              <option value="alltime">All Time</option>
              <option value="last3days">Last 3 Days</option>
            </select>
            <select name="exploreCities" style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', marginRight: '10px', flex: '1' }}>
              <option value="newyork">New York</option>
              <option value="losangeles">Los Angeles</option>
              <option value="chicago">Chicago</option>
              <option value="houston">Houston</option>
              <option value="phoenix">Phoenix</option>
            </select>
            <select name="topics" style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', flex: '1' }}>
              <option value="ai">AI</option>
              <option value="filming">Filming</option>
              <option value="technology">Technology</option>
              <option value="music">Music</option>
            </select>
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
                  className={styles.cardImage}
                />
                <div className={styles.cardContent}>
                  <div className={styles.cardColumnSmall}>
                    <p>Date</p>
                  </div>
                  <div className={styles.cardColumnLarge}>
                    <p>Topic:</p>
                    <p>Location or venue:</p>
                    <p>Time:</p>
                    <p>Ticket:</p>
                  </div>
                </div>
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
                  className={styles.cardImage}
                />
                <div className={styles.cardContent}>
                  <div className={styles.cardColumnSmall}>
                    <p>Date</p>
                  </div>
                  <div className={styles.cardColumnLarge}>
                    <p>Topic:</p>
                    <p>Location or venue:</p>
                    <p>Time:</p>
                    <p>Ticket:</p>
                  </div>
                </div>
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
                  className={styles.cardImage}
                />
                <div className={styles.cardContent}>
                  <div className={styles.cardColumnSmall}>
                    <p>Date</p>
                  </div>
                  <div className={styles.cardColumnLarge}>
                    <p>Topic:</p>
                    <p>Location or venue:</p>
                    <p>Time:</p>
                    <p>Ticket:</p>
                  </div>
                </div>
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
                  className={styles.cardImage}
                />
                <div className={styles.cardContent}>
                  <div className={styles.cardColumnSmall}>
                    <p>Date</p>
                  </div>
                  <div className={styles.cardColumnLarge}>
                    <p>Topic:</p>
                    <p>Location or venue:</p>
                    <p>Time:</p>
                    <p>Ticket:</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
       </div>
      </main>
    </div>
  );
}
