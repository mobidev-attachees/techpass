// Src/app/page.js
"use client";
import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import EventCarousel from './components/EventCarousel';
import Homenav from './components/Homenav';
import Footer from './components/Footer';
import Hero from './components/hero';
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
    <div className="container">
 

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

        
        <div>
          <Hero />
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