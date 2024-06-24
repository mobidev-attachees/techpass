"use client";
import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Home() {
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
              <button type="button" data-mdb-button-init="" data-mdb-ripple-init="" class="btn btn-outline-secondary btn-rounded  ripple-surface-dark  m-0 border-0 btn-sm" data-mdb-ripple-color="dark" data-mdb-button-initialized="true" aria-pressed="false">
              <a className="nav-link link" href="/login">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
              </svg> Sign in
                </a></button>
              
              </li>
              <li className="nav-item">
              <button type="button" data-mdb-button-init="" data-mdb-ripple-init="" class="btn btn-outline-secondary btn-rounded  ripple-surface-dark  m-0 border-0 btn-sm" data-mdb-ripple-color="dark" data-mdb-button-initialized="true" aria-pressed="false"><a className="nav-link" href="/register"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-plus" viewBox="0 0 16 16">
                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"/></svg> Sing up</a></button>
              </li>
            </ul>
            
          </div>
        </div>
      </nav>
      <main>
       {/* Search Bar */}
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px', maxWidth: '600px', width: '100%',  marginTop: '30px'}}>
          <input type="text" placeholder="Search..." style={{ flex: '1', padding: '10px', borderRadius: '4px', marginRight: '0px', border: '1px solid #ccc', maxWidth: '70%' }} />
          <select name="cities" style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', maxWidth: '28%' }}>
            <option value="newyork">New York</option>
            <option value="losangeles">Los Angeles</option>
            <option value="chicago">Chicago</option>
            <option value="houston">Houston</option>
            <option value="phoenix">Phoenix</option>
          </select>
        </div>
        <div className=" p-1 py-5 mb-0 d-flex justify-content-start align-items-end" style={{ backgroundImage: "url('/220.jpg')", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: 'auto', minHeight: '300px' }}>
          <div className="p-1 mb-0 mt-1 lc-block col-md-3  shadow-lg" style={{ backdropFilter: 'blur(6px) saturate(102%)', WebkitBackdropFilter: 'blur(6px) saturate(102%)', backgroundColor: 'rgba(255, 255, 255, 0.45)', borderRadius: '12px', border: '1px solid rgba(209, 213, 219, 0.3)' }}>
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
                  <button className="btn btn-success" data-mdb-animation-init=" "  data-mdb-animation-start="onHover" data-mdb-animation="zoom-in" data-mdb-animation-reset="true" data-mdb-animation-initialized="true" style={{animationDuration: '500ms'}}>
                      <a href="/register">
                      Get Started
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"></path>
                      </svg>
                      </a>
                  </button>
              </div>
          </div>
        </div>





        {/* Explore Categories */}
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
                  <img src="/223.jpg" className={`card-img-top rounded ${styles.cardImage}`} alt="..." />
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
                        <p className="fs-6">{event.country}, {event.city}</p>
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
              </Link>
            ))}
          </div>
      {hasMore && !error && (
        <div className="d-grid col-6 mx-auto mt-2 mb-4">
          <button className="btn btn-outline-success btn-lg" onClick={loadMoreEvents} type="button">
            See More
          </button>
        </div>
      )}
    </main>
    </div>
  );
}
