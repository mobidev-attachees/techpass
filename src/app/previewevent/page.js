"use client"
import React from "react";
import Link from 'next/link'; // Import Link from Next.js
import styles from "./page.module.css";

const previewevent = () => {
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
                <Link href="event">
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
    <div style={{ margin: '0 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px', backgroundColor: '#f8f9fa' }}>
      <div style={{ maxWidth: '1200px', width: '90%', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Event Preview</h1>
        {/* Banner Image */}
        <div className="banner-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
          <img src="175.jpg" alt="Banner" className="banner-image" height="200px" width="600px" border-radius="10%" />
        </div>

        {/* Event Details */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          {/* Column 1 */}
          <div style={{ flex: 1 }}>
          <h2>Event Details</h2>
            <p>Event Date & Time</p>
            <p>Date: May 20, 2024</p>
            <p>Time: 7:00 PM</p>
          </div>

          {/* Column 2 */}
          <div style={{ flex: 1, textAlign: 'right' }}>
            <h3></h3>
            <button type="button" className="btn btn-success" style={{ marginRight: '10px' }}>
              Share Event <i className="fas fa-share"></i>
            </button><br></br>
            <p>Ticket: Ksh. 2200</p>
          </div>
        </div>
        <div style={{ marginBottom: '20px' }}>
        <h3>Location</h3>
        <img src="map.jpg" alt="Map" style={{ maxWidth: '50%', height: 'auto', borderRadius: '8px' }} />
      </div>
      <h2>Organizers Details</h2>
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center',  maxWidth:'50%'}}>
      
        {/* Left Column */}
        <div>
          <img src="avatar-2.png" alt="Host" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
        </div>
        {/* Right Column (Host Image) */}
        <div style={{ flex: 1 }}>
          
          <div style={{ marginBottom: '10px' }}>
            <p> Mr.John Doe Smith</p>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <p>Phone: 123-456-7890</p>
            <p>Website: <a href="#">www.example.com</a></p>
          </div>
        </div>        
        
      </div>
      <div style={{ marginBottom: '20px', maxWidth:'50%' }}>
          <h2>Event Description</h2>
          <p style={{ textAlign: 'justify' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo libero vel ex pharetra, eget faucibus ipsum fermentum. Duis venenatis vulputate nunc, sed dapibus tortor feugiat in. Nam volutpat risus eget est lobortis varius. Nullam sagittis massa in nisi efficitur fermentum. Proin eleifend neque a massa consectetur, ac pharetra justo sodales.</p>

          
        </div>

        <hr></hr>
        {/* Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button type="button" className="btn btn-secondary" style={{ marginRight: '10px' }}>
            <Link href="/createevent">Edit</Link>
          </button>
          <button type="button" className="btn btn-success">
           <Link href="/events">Publish</Link>
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default previewevent;
