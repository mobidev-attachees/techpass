"use client"
import React from "react";
import Link from 'next/link'; // Import Link from Next.js
import styles from "./page.module.css";

const previewevent = () => {
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
                <Link href="/events">
                  <p className={styles.navLink}>Home</p>
                </Link>
              </li>
              {/* <li className={styles.navItem}>
                <Link href="/createevent">
                  <p className={styles.navLink}>Create Event</p>
                </Link>
              </li> */}
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
      
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-10">
          <div className="card">
            <div className="card-body">
              {/* Banner Image */}
              <div className="banner-container text-center mb-4">
                <img src="175.jpg" alt="Banner" className="banner-image" style={{ borderRadius: '10px' }} />
              </div>

              {/* Event Details */}
              <div className="row mb-4">
                {/* Column 1 */}
                <div className="col">
                  <h2>Event Details</h2>
                  <p>Start Date: </p>
                  <p>End Date: </p>
                  <p>Start Time: </p>
                  <p>End Time:</p>
                </div>

                {/* Column 2 */}
                <div className="col text-right">
                  <h3></h3>
                  <button type="button" className="btn btn-success mr-2">
                    Share Event <i className="fas fa-share"></i>
                  </button>
                  <br />
                  <p>Ticket Price: </p>
                </div>
              </div>

              <div className="mb-4">
                <h3>Location</h3>
                <p>Location:</p>
                <img src="map.jpg" alt="Map" className="img-fluid rounded" style={{ maxWidth: '50%', height: 'auto' }} />
              </div>

              {/* Organizer Details */}
              <div className="row mb-8 align-items-center">
                {/* Left Column */}
                <div className="col-auto">
                  <img src="avatar-2.png" alt="Host" className="rounded-circle" style={{ width: '150px', height: '150px' }} />
                </div>
                {/* Right Column (Host Image) */}
                <div className="col">
                  <div className="mb-4">
                    <p></p>
                  </div>
                  <div className="mb-2">
                    <p>Phone: </p>
                    <p>Website: <a href="#"></a></p>
                  </div>
                </div>
              </div>

              <div className="mb-4" style={{ maxWidth: '50%' }}>
                <h2>Event Description</h2>
                <p className="text-justify"></p>
              </div>

              <hr />

              {/* Buttons */}
              <div className="d-flex justify-content-center">
                <button type="button" className="btn btn-secondary mr-2">
                  <Link href="/createevent">Edit</Link>
                </button>
                <button type="button" className="btn btn-success">
                  <Link href="/events">Publish</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default previewevent;
