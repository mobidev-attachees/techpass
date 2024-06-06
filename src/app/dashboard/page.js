"use client";
import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function dashboard() {
  const [events, setEvents] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchEvents = async (page = 1) => {
      try {
        const limit = 6;
        const response = await fetch(`/api/events/getEvents?limit=${limit}&page=${page}`);
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        if (page === 1) {
          setEvents(data);
        } else {
          setEvents(prevEvents => [...prevEvents, ...data]);
        }
        if (data.length < limit) {
          setHasMore(false);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchEvents(page);
  }, [page]);

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

  const loadMoreEvents = () => {
    setPage(prevPage => prevPage + 1);
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
      <main>
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
        <h1 className="text-center">Events</h1>
        {/* Search Bar */}
        <div className="container mt-5">
          {/* <!-- Explore Categories --> */}
          <div className="row">
            <div className="col-12 col-md-8">
              <h4>Explore Categories</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <select className=" mr-2 mb-2 ml-2">
                  <option value="last30days">Last 30 Days</option>
                  <option value="last7days">Last 7 Days</option>
                  <option value="alltime">All Time</option>
                  <option value="last3days">Last 3 Days</option>
                </select>
                <select className="mr-2 mb-2 ml-2" onChange={handleCountryChange}>
                  <option value="">Select Country</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country}>{country}</option>
                  ))}
                </select>
                <select className="mb-2 ml-2">
                  <option value="ai">AI</option>
                  <option value="filming">Filming</option>
                  <option value="technology">Technology</option>
                  <option value="music">Music</option>
                </select>
              </div>
            </div>
            <div className="col-md-4 text-right">
              <Link href="/createevent"><button className="btn btn-success">Create Event</button></Link>
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
            <Link href={`/event/${event.id}`} key={event.id}>
              <div className={styles.card}>
                <img src="223.jpg" className={`card-img-top ${styles.cardImage}`} alt="..." />
                <div className={styles.cardBody}>
                  <div className={styles.cardContent}>
                    <div className={styles.cardColumnSmall}>
                      <p>Date: {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}</p>
                    </div>
                    <div className={styles.cardColumnLarge}>
                      <h2> {event.eventName}</h2>
                      <p>Venue: {event.location}</p>
                      <p>Ticket:{event.ticketPrice} </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {hasMore && !error && (
          <div className="d-grid col-6 mx-auto mt-2 mb-4">
            <button className="btn btn-outline-success btn-lg" onClick={loadMoreEvents} type="button">See More</button>
          </div>
        )}
      </main>
    </div>
  );
}
