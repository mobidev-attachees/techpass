"use client";
import React from "react";
import Link from 'next/link';
import styles from "./page.module.css";

const CreateEvent = () => {
  const handleCreateEvent = () => {
    // Handle event creation logic
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
            </ul>
            <ul className={styles.nav}>
              <li className={styles.navItem}>
                <Link href="/register">
                  <p className={styles.navLink}>Register</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
  <div className="main-container" style={{ width: '100%', maxWidth: '1400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div className="form-wrapper" style={{ width: '100%', maxWidth: 'calc(1200px * 0.75)', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.9)', marginRight: '20px' }}>
            <h4>Event Details</h4>
            <form onSubmit={handleCreateEvent} style={{ width: '100%' }}>
            <div className="form-group" style={{ marginBottom: '20px' }}>
                <label htmlFor="eventName">Event Name:</label>
                <input type="text" name="eventName" className="form-control" id="eventName" />
              </div>
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label htmlFor="eventDescription">Event Description:</label>
                <textarea name="eventDescription" className="form-control" id="eventDescription"></textarea>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ width: '32%' }}>
                  <label htmlFor="location">Location:</label>
                  <input type="text" name="location" className="form-control" id="location" />
                </div>
                <div style={{ width: '32%' }}>
                  <label htmlFor="country">Country:</label>
                  <input type="text" name="country" className="form-control" id="country" />
                </div>
                <div style={{ width: '32%' }}>
                  <label htmlFor="city">City:</label>
                  <input type="text" name="city" className="form-control" id="city" />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ width: '24%' }}>
                  <label htmlFor="startDate">Start Date:</label>
                  <input type="date" name="startDate" className="form-control" id="startDate" />
                </div>
                <div style={{ width: '24%' }}>
                  <label htmlFor="endDate">End Date:</label>
                  <input type="date" name="endDate" className="form-control" id="endDate" />
                </div>
                <div style={{ width: '24%' }}>
                  <label htmlFor="startTime">Start Time:</label>
                  <input type="time" name="startTime" className="form-control" id="startTime" />
                </div>
                <div style={{ width: '24%' }}>
                  <label htmlFor="endTime">End Time:</label>
                  <input type="time" name="endTime" className="form-control" id="endTime" />
                </div>
              </div>
              
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label htmlFor="bannerImage">Upload Banner Image:</label>
                <input type="file" name="bannerImage" className="form-control" id="bannerImage" />
              </div>
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label htmlFor="venueName">Venue Name:</label>
                <input type="text" name="venueName" className="form-control" id="venueName" />
              </div>
              <div style={{ display: 'flex', marginBottom: '20px' }}>
                
                  <select name="title" className="form-control" style={{ marginRight: '10px' }}>
                        <option value="mr">Virtual</option>
                        <option value="mrs">Physical</option>
                      
                      </select>
                  <input type="url" name="meetingLink" className="form-control" placeholder="Meeting Link" />
                </div>
              
              <h4>Organizers Details</h4>    
              <div style={{ marginBottom: '20px' }}>
                <h6>What's Your Name?</h6>
                <div style={{ display: 'flex', marginBottom: '20px' }}>
                  <select name="title" className="form-control" style={{ marginRight: '10px' }}>
                    <option value="mr">Mr</option>
                    <option value="mrs">Mrs</option>
                    <option value="miss">Miss</option>
                  </select>
                  <input type="text" name="firstName" className="form-control" placeholder="First Name" style={{ marginRight: '10px' }} />
                  <input type="text" name="middleName" className="form-control" placeholder="Middle Name" style={{ marginRight: '10px' }} />
                  <input type="text" name="lastName" className="form-control" placeholder="Last Name" />
                </div>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <h3></h3>
                <div style={{ display: 'flex', marginBottom: '20px' }}>
                
                  <input type="tel" name="phoneNumber" className="form-control" placeholder="Phone Number" style={{ marginRight: '10px' }} />
                  <input type="url" name="websiteLink" className="form-control" placeholder="Website" />
                </div>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <h3></h3>
                <div style={{ display: 'flex' }}>
                  <input type="url" name="facebookLink" className="form-control" placeholder="Facebook" style={{ marginRight: '10px' }} />
                  <input type="url" name="instagramLink" className="form-control" placeholder="Instagram " style={{ marginRight: '10px' }} />
                  <input type="url" name="twitterLink" className="form-control" placeholder="Twitter " />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <button type="submit" className="btn btn-secondary">
                <Link href="/previewevent">Preview</Link>
              </button>
              <div>&nbsp;</div> {/* Spacer */}
              <button type="submit" className="btn btn-success">
                <Link href="/events">Publish</Link>
              </button>
            </div>
            </form>
          </div>
          <div className="side-content" style={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            {/* Add any additional side content here */}
          </div>
  </div>
</main>

    </>
  );
};

export default CreateEvent;
