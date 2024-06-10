"use client";
import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalEvents, setTotalEvents] = useState(0);
  const initialFetchLimit = 6; // Initial number of events to fetch

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`/api/events/getEvents?limit=${initialFetchLimit}&page=${page}`);
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

  const loadMoreEvents = async () => {
    const nextPage = page + 1;
    try {
      const response = await fetch(`/api/events/getEvents?limit=${initialFetchLimit}&page=${nextPage}`);
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
      <nav className="navbar navbar-expand-lg navbar-light bg-white color-white">
        <div className="container-fluid justify-content-between">
          <a className="navbar-brand" href="/">TechPass</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll" style={{ "--bs-scroll-height": "100px" }}>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/createevent">Create Event</a>
              </li>
              <li className="nav-item">
                <a className="nav-link link" href="#">All Events</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <Image src="/avatar-2.png" width="30" height="30" alt="profile image" className='rounded-circle'></Image>
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                  <li><a className="dropdown-item" href="/dashboard">Dashboard</a></li>
                  <li><a className="dropdown-item" href="/profile">Profile</a></li>
                  <li></li>
                  <li><a className="dropdown-item" href="/login">Logout</a></li>
                </ul>
              </li>
            </ul>
            
          </div>
        </div>
      </nav>
      <main>
        <h1 className="text-center">Events</h1>
        {/* Search Bar */}
        <div className="container mt-5">
          {/* <!-- Search and City Selection --> */}
          <div className="row justify-content-center mb-4">
            <div className="col-12 col-md-8 d-flex">
              <input type="text" className="form-control mr-2 mb-2" placeholder="Search..." />
              <select className="form-control mb-2" onChange={handleCountryChange}>
                <option value="">Select Country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>{country}</option>
                ))}
              </select>
            </div>
          </div>

          {/* <!-- Explore Categories --> */}
          <div className="row">
            <div className="col-12 col-md-8">
              <h4>Explore Categories</h4>
              <div className="d-flex justify-content-between">
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

        <div className="row mt-6 rounded">
          <h2>Available events</h2>
        
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
                          <h2>{event.eventName}</h2>
                          <p>Venue: {event.location}</p>
                          <p>Ticket: {event.ticketPrice}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>

        </div>
        {hasMore && !error && (
          <div className="d-grid col-6 mx-auto mb-4 mt-6">
            <button className="btn btn-outline-success btn-lg" onClick={loadMoreEvents} type="button">See More</button>
          </div>
        )}
      </main>
    </div>
  );
};

