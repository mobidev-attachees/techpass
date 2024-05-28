// src/app/createevent/page.jsx
"use client";
import React, { useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const createevent = () => {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [venueName, setVenueName] = useState("");
  const [eventType, setEventType] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [email, setEmail] = useState("");
  const [tittle, setTittle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [ticketPrice, setTickectPrice] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();


  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setError("");  // Reset error message

    if (!eventName || !eventDescription || !tittle || !location || !country || !city || !startTime || !endTime || !startDate || !endDate || !venueName || !meetingLink || !email || !ticketPrice ||!eventType ||!firstName ||!middleName ||!lastName ||!phoneNumber ||!websiteLink ||!facebookLink ||!instagramLink ||!twitterLink) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await fetch("/api/createEvent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventName, eventDescription, tittle, location, country,city, startTime,endTime,startDate, endDate, venueName, meetingLink, email, ticketPrice, eventType, firstName, middleName, lastName, phoneNumber, websiteLink, facebookLink, instagramLink, twitterLink }),
      });

      if (response.ok) {
        router.push("/login");
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error("Event creation error:", error);
      setError("An error occurred during event creation");
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
            <form onSubmit={handleCreateEvent} className={styles.form} style={{ width: 'auto' }}>
              <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
                <label htmlFor="eventName" className={styles.label}>EventName:</label>
                <input
                  type="text"
                  name="EventName"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
                <label htmlFor="eventDescription" className={styles.label}>EVentDescription:</label>
                <input
                  type="text"
                  name="eventDescription"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
                <label htmlFor="location" className={styles.label}>location:</label>
                <input
                  type="text"
                  name="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
                <label htmlFor="country" className={styles.label}>Country:</label>
                <input
                  type="text"
                  name="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
                <label htmlFor="city" className={styles.label}>City</label>
                <input
                  type="text"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
                <label htmlFor="startDate" className={styles.label}>Start Date:</label>
                <input
                  type="Date"
                  name="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
                <label htmlFor="endDate" className={styles.label}>End Date:</label>
                <input
                  type="Date"
                  name="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
                <label htmlFor="startTime" className={styles.label}>Start Time:</label>
                <input
                  type="time"
                  name="startTime"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
                <label htmlFor="endTime" className={styles.label}>End Time:</label>
                <input
                  type="time"
                  name="endTime"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
                <label htmlFor="venueName" className={styles.label}>Venue Name:</label>
                <input
                  type="text"
                  name="venueName"
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
                <label htmlFor="eventType" className={styles.label}>Event Type:</label>
                <input
                  type="text"
                  name="eventType"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
                <label htmlFor="meetingLink" className={styles.label}>Meeting Link:</label>
                <input
                  type="text"
                  name="meetingLink"
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
                <label htmlFor="ticketPrice" className={styles.label}>Ticket Price:</label>
                <input
                  type="text"
                  name="ticketPrice"
                  value={ticketPrice}
                  onChange={(e) => setTickectPrice(e.target.value)}
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
                <label htmlFor="tittle" className={styles.label}>Tittle:</label>
                <input
                  type="text"
                  name="tittle"
                  value={tittle}
                  onChange={(e) => setTittle(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
                <label htmlFor="firstName" className={styles.label}>First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
                <label htmlFor="middleName" className={styles.label}>Middle Name:</label>
                <input
                  type="text"
                  name="middleName"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
                <label htmlFor="lastName" className={styles.label}>Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
                <label htmlFor="phoneNumber" className={styles.label}>Phone Number:</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={websiteLink}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
                <label htmlFor="WebsiteLink" className={styles.label}>Website Link:</label>
                <input
                  type="text"
                  name="websiteLinK"
                  value={websiteLink}
                  onChange={(e) => setWebsiteLink(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
                <label htmlFor="facebookLink" className={styles.label}>Facebook Link:</label>
                <input
                  type="text"
                  name="facebookLink"
                  value={facebookLink}
                  onChange={(e) => setFacebookLink(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
                <label htmlFor="instagramLink" className={styles.label}>Instagram Link:</label>
                <input
                  type="text"
                  name="instagramLink"
                  value={instagramLink}
                  onChange={(e) => setInstagramLink(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
                <label htmlFor="twitterLink" className={styles.label}>Twitter Link:</label>
                <input
                  type="text"
                  name="twitterLink"
                  value={twitterLink}
                  onChange={(e) => setTwitterLink(e.target.value)}
                  className={styles.input}
                />
              </div>
              <button type="submit" className={`${styles.button} btn btn-primary`} style={{ width: 'auto' }}>
                Publish event
              </button>
            </form>
            <p>Already have an account? <Link href="/login">Login</Link></p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default createevent;
