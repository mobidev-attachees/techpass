// src/app/components/EventsGrid.js

import React, { useState, useEffect } from 'react';
import styles from "../page.module.css";

const EventsGrid = ({ initialEvents, initialPage, totalEvents, initialFetchLimit }) => {
  const [events, setEvents] = useState(initialEvents || []);
  const [page, setPage] = useState(initialPage || 1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className={styles.grid}>
      {error && <p className={styles.error}>{error}</p>}
      {!error && events.length === 0 && <p>No events found.</p>}
      {events.map(event => (
        <a href={`/event/${event.id}`} key={event.id}>
          <div key={event.id} className={styles.card}>
            <img src={event.imageUrl || '/uploads/default-image.jpg'} className={`card-img-top rounded ${styles.cardImage}`} alt="Event Image" />
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
                  {/* Conditional rendering for city and country */}
                  <p className="fs-6">
                    {event.city ? event.city : "Virtual"}, {event.country}
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
  );
};

export default EventsGrid;
