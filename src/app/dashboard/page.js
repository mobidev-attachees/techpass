"use client";
import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import BannerCarousel from '../components/EventCarousel';
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import Navbar from '../components/Navbar';
import EventCarousel from '../components/EventCarousel';



export default function Events() {
  const [events, setEvents] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalEvents, setTotalEvents] = useState(0);
  const initialFetchLimit = 6; // Initial number of events to fetch
  const router = useRouter();

  // Function to fetch user login status
  const checkLoggedIn = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        toast.error("You are not logged in. Please log in to view events.");
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  useEffect(() => {
    checkLoggedIn(); // Check login status on component mount
  }, []);

  const fetchEvents = async (pageToFetch) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/events/getEvents?limit=${initialFetchLimit}&page=${pageToFetch}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      if (!Array.isArray(data.events) || typeof data.totalEvents !== 'number') {
        throw new Error("Invalid response format");
      }
      return data;
    } catch (error) {
      setError(error.message);
      return { events: [], totalEvents: 0 };
    }
  };

  useEffect(() => {
    const loadInitialEvents = async () => {
      const data = await fetchEvents(page);
      setEvents(data.events);
      setTotalEvents(data.totalEvents);
      if (data.events.length < initialFetchLimit) {
        setHasMore(false);
      }
    };

    loadInitialEvents();
  }, [page]);

  function convertTime(time) {
    // Convert time from 24-hour format to AM/PM format
    var hours = parseInt(time.substring(0, 2));
    var minutes = time.substring(3);
    var period = (hours >= 12) ? "PM" : "AM";

    if (hours > 12) {
      hours -= 12;
    } else if (hours === 0) {
      hours = 12;
    }

    return hours + ':' + minutes + ' ' + period;
  }

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
  const backgroundImageStyle = {
    backgroundImage: "url('/bg.svg')",
    height: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const loadMoreEvents = async () => {
    const nextPage = page + 1;
    try {
      const data = await fetchEvents(nextPage);
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
      <div>
        <Navbar />
      </div>
        <h4 className="text-center mt-3">Events</h4>
        {/* Search Bar */}
        <div className="container mt-5">
          {/* <!-- Search and City Selection --> */}
          <div className="row justify-content-between mb-4">
            <div className="col-12 col-md-8 d-flex flex-row">
              <input type="text" className={`form-control`} style={{ marginBottom: '20px', maxWidth:'200px' }} placeholder="Search..." />
              <select className={`form-control`} style={{ marginBottom: '20px', maxWidth:'200px' }} onChange={handleCountryChange}>
                <option value="">Select Country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>{country}</option>
                ))}
              </select>
            </div>
          </div>

        </div>
        {/* Banner Carousel */}
        <div className="rounded mt-3 mb-3 my-3 py-3 shadow">
            <EventCarousel />
          </div>
        <div className="row mt-6 rounded bg-white">
          

          {/* Events Grid */}
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
          </div>

          {/* Load More Button */}
          {hasMore && !error && (
            <div className="d-grid col-6 mx-auto mb-4 mt-6">
              <button className="btn btn-outline-success btn-lg" onClick={loadMoreEvents} type="button">See More</button>
            </div>
          )}

        </div>
      </div>
  );
};
