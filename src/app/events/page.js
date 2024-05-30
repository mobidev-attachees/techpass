"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`/api/events/getEvents?limit=4`);
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('/api/getCountries');
        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
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
                <Link href="/dashboard">
                  <p className={styles.navLink}>Home</p>
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link href="/createevent">
                  <p className={styles.navLink}>Create Event</p>
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link href="#">
                  <p className={styles.navLink}>My events</p>
                </Link>
              </li>
            </ul>
            <ul className={styles.nav}>
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
        {/* Search Bar */}
        <div className="container mt-5">
          {/* <!-- Search and City Selection --> */}
          <div className="row justify-content-center mb-4">
            <div className="col-12 col-md-8 d-flex">
              <input type="text" className="form-control mr-2" placeholder="Search..." />
              <select className="form-control" onChange={handleCountryChange}>
                <option value="">Select Country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>{country}</option>
                ))}
              </select>
            </div>
          </div>

          {/* <!-- Explore Categories --> */}
          <div className="row justify-content-center">
            <div className="col-12 col-md-8">
              <h4>Explore Categories</h4>
              <div className="d-flex justify-content-between">
                <select className="form-control mr-2">
                  <option value="last30days">Last 30 Days</option>
                  <option value="last7days">Last 7 Days</option>
                  <option value="alltime">All Time</option>
                  <option value="last3days">Last 3 Days</option>
                </select>
                <select className="form-control mr-2" onChange={handleCountryChange}>
                  <option value="">Select Country</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country}>{country}</option>
                  ))}
                </select>
                <select className="form-control">
                  <option value="ai">AI</option>
                  <option value="filming">Filming</option>
                  <option value="technology">Technology</option>
                  <option value="music">Music</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.grid}>
          {/* Display error message if there's an error */}
          {error && <p className={styles.error}>{error}</p>}
          {/* Display message if no events are found */}
          {!error && events.length === 0 && <p>No events found.</p>}
          {/* Map through each event and display it as a card */}
          {events.map(event => (
            <div className={styles.card} key={event.id}>
              {/* Wrap the card in a Link component with the event details page URL */}
              <Link href={`/events/${event.id}`}>
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
                      <p>Date: {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}</p>
                    </div>
                    <div className={styles.cardColumnLarge}>
                      <p>Topic: {event.eventName}</p>
                      <p>Location or venue: {event.location}</p>
                      <p>Time:</p>
                      <p>Ticket: {event.ticketPrice} </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Events;
