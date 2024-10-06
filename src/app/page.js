// Src/app/page.js
"use client";
import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import EventCarousel from './components/EventCarousel';
import Homenav from './components/Homenav';
import Footer from './components/Footer';
// import EventCarousel from './components/EventCarousel';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalEvents, setTotalEvents] = useState(0);
  const initialFetchLimit = 6;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`/api/events/getAllEvents?limit=${initialFetchLimit}&page=${page}`);
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        if (!Array.isArray(data.events) || typeof data.totalEvents !== 'number') {
          throw new Error("Invalid response format");
        }
        setEvents(data.events);
        setTotalEvents(data.totalEvents);
        if (data.events.length < initialFetchLimit) {
          setHasMore(false);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchEvents();
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

  const convertTime = (time) => {
    let hours = parseInt(time.substring(0, 2));
    const minutes = time.substring(3);
    const period = (hours >= 12) ? "PM" : "AM";
    
    if (hours > 12) {
      hours -= 12;
    } else if (hours === 0) {
      hours = 12;
    }
    
    return `${hours}:${minutes} ${period}`;
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const loadMoreEvents = async () => {
    const nextPage = page + 1;
    try {
      const response = await fetch(`/api/events/getAllEvents?limit=${initialFetchLimit}&page=${nextPage}`);
      if (!response.ok) {
        throw new Error("Failed to fetch more events");
      }
      const data = await response.json();
      if (!Array.isArray(data.events)) {
        throw new Error("Invalid response format");
      }
      setEvents(prevEvents => [...prevEvents, ...data.events]);
      setPage(nextPage);
      if (events.length + data.events.length >= totalEvents) {
        setHasMore(false);
      }
    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <div className="container" style={{
      background: `radial-gradient(circle, 
          #000000, #000000, #013220, #000000, #000000, #2F4F4F, #000000, #000000, #4B4B4B, #000000,
          #1C1C1C, #000000, #000000, #242424, #000000, #000000, #2D4F2D, #000000, #000000, #004C4C,
          #505050, #000000, #000000, #3A3A3A, #000000, #1E1E1E, #000000, #000000, #0C3B3B, #000000,
          #1F1F1F, #000000, #1B332B, #000000, #2A2A2A, #0f0000, #192E2E, #000000, #000000, #3B3B3B,
          #000000, #113D3D, #000000, #363636, #000000, #000000, #3F4F3F, #000000, #000000, #4F4F4F,
          #000000, #000000, #0D4A4A, #000000, #000000, #424242, #000000, #000000, #2A3F2A, #000000,
          #303F3F, #000000, #000000, #383838, #000000, #484848, #000000, #000000, #214D21, #000000,
          #2D2D2D, #000000, #354C4C, #000000, #000000, #525252, #000000, #314E31, #000000, #0F3C3C,
          #000000, #3E3E3E, #000000, #1A352F, #000000, #000000, #1B4646, #000000, #000000, #454545,
          #000000, #323E32, #000000, #000000, #4E4E4E, #000000, #000000, #1C1C1C, #000000, #000000,
          #2E2E2E, #000000, #404040, #000000, #000000, #294A29, #000000, #0E3F3F, #000000, #343434,
          #000000, #4A4A4A, #000000, #2B2B2B, #000000, #000000, #3D4F3D, #000000, #354B35, #000000,
          #1F1F1F, #000000, #204F20, #000000, #2F2F2F, #00f000, #123E3E, #000000, #4B4B4B, #000000,
          #1C2C2C, #000000, #4D4D4D, #000000, #223C22, #000000, #1A3B3B, #000000, #0E0E0E, #000000,
          #333F33, #000000, #2F4646, #000000, #464646, #000000, #303E30, #000000, #1F4C1F, #000000,
          #404E40, #000000, #191919, #000000, #353F35, #000000, #0D4F4F, #000000, #2E4F2E, #000000,
          #2F2F2F, #000000, #323232, #000000, #384F38, #000000, #111C1C, #000000, #2D4A4A, #000000,
          #474747, #000000, #0F3030, #000000, #3F4F3F, #000000, #3B4B3B, #000000, #4F4F4F, #000000,
          #0E4646, #000000, #282828, #000000, #4C4C4C, #000000, #1F1F1F, #000000, #464D46, #000000,
          #252525, #000000, #344F34, #000000, #131E1E, #000f00, #2A4747, #000000, #2F3F2F, #000000,
          #0A4F4F, #000000, #3A4A3A, #000000, #3C4F4C, #000000, #1D3331, #000000, #2D3E3E, #000000,
          #424242, #000000, #232F23, #000000, #3F4E3F, #000000, #0D3939, #000000, #292929, #000000,
          #4F4A4A, #000000, #363C36, #000000, #2A2E2E, #000000, #214E21, #000000, #1F4646, #000000,
          #353535, #000000, #0C4949, #000000, #3F4D3F, #000000, #2E4F4F, #000000, #4A4949, #000000,
          #3C3C3C, #000000, #364B36, #000000, #121F1F, #000000, #2F4F4F, #000000, #2E2E2E, #000000
      )`
    }}>
 

      <div><Homenav /></div>

      <main>
      
        {/* Search Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px', maxWidth: '600px', width: '100%', marginTop: '30px' }}>
          <input type="text" placeholder="Search..." style={{ flex: '1', padding: '10px', borderRadius: '4px', marginRight: '0px', border: '1px solid #ccc', maxWidth: '70%' }} />
          <select name="cities" style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', maxWidth: '28%' }}>
            <option value="newyork">New York</option>
            <option value="losangeles">Los Angeles</option>
            <option value="chicago">Chicago</option>
            <option value="houston">Houston</option>
            <option value="phoenix">Phoenix</option>
          </select>
        </div>

        <div className="p-1 py-5 mb-0 d-flex justify-content-start align-items-end" style={{ backgroundImage: "url('/favicon.jpeg')", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', objectFit:'cover', borderRadius: '12px'}}>
          <div className="p-1 mb-0 mt-1 lc-block col-md-3 shadow-lg" style={{ backdropFilter: 'blur(6px) saturate(102%)', WebkitBackdropFilter: 'blur(6px) saturate(102%)', backgroundColor: 'rgba(255, 255, 255, 0.45)', borderRadius: '12px', border: '1px solid rgba(209, 213, 219, 0.3)' }}>
            <div className="lc-block">
              <div>
                <h2 className="text-justify fs-4">
                  Techpass
                </h2>
              </div>
            </div>
            <div className="lc-block mx-auto">
              <div>
                <p className="lead fs-5">
                  Organize your events in one place
                </p>
              </div>
            </div>
            <div className="lc-block p-2">
              <button className="btn btn-success" data-mdb-animation-init=" " data-mdb-animation-start="onHover" data-mdb-animation="zoom-in" data-mdb-animation-reset="true" data-mdb-animation-initialized="true" style={{ animationDuration: '500ms' }}>
                <a href="/register">
                  Get Started
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"></path>
                  </svg>
                </a>
              </button>
            </div>
          </div>
        </div>

        {/* Explore Categories */}
        <div className={styles.grid}>
          {/* Display error message if there's an error */}
          {error && <p className={styles.error}>{error}</p>}
          {/* Display message if no events are found */}
          {!error && events.length === 0 && <p>No events found.</p>}

          {/* Map through each event and display it as a card */}
          {events.map(event => (
            <a href={`/event/${event.id}`} key={event.id}>
              <div key={event.id} className={styles.card}>
                <img 
                  src={event.imageUrl || '/uploads/default-image.jpg'} 
                  className={`card-img-top rounded ${styles.cardImage}`} 
                  alt="Event Image" 
                    style={{ 
                      width: '100%',        // Ensure the image takes up the full width of the container
                      height: '200px',       // Set a fixed height for all images
                      objectFit: 'cover',    // Ensure the image covers the container without stretching
                      borderRadius: '12px'   // Optional: Add a consistent border-radius
                    }} 
                />

                <div className={styles.cardBody}>
                  <div className={styles.cardContent}>
                    <div className={styles.cardColumnSmall}>
                      <p className="fw-bold text-uppercase" style={{ color: 'purple' }}>
                        {new Date(event.startDate).toLocaleString('en-US', { month: 'short' })}
                      </p>
                      <p className="fw-bold">
                        {new Date(event.startDate).getDate()}-{new Date(event.endDate).getDate()}
                      </p>
                    </div>
                    <div className={styles.cardColumnLarge}>
                      <h5 className="text-capitalize">{event.eventName}</h5>
                      <p className="fs-6">
                        {event.country || event.city ? (
                          <>
                            {event.country || "Virtual"}, {event.city || "Virtual"}
                          </>
                        ) : (
                          "Virtual"
                        )}
                      </p>

                      <p className="fs-6">{convertTime(event.startTime)} - {convertTime(event.endTime)}</p>
                      <p className="fs-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cash-stack" viewBox="0 0 16 16">
                          <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                          <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2z"/>
                        </svg> {event.ticketPrice}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
          {hasMore && !error && (
            <div className="d-grid col-6 mx-auto mt-2 mb-4">
              <button className="btn btn-outline-success btn-lg" onClick={loadMoreEvents} type="button">
                See More
              </button>
            </div>
          )}
        </div>
      </main>
      <div><Footer /></div>
    </div>
  );
}