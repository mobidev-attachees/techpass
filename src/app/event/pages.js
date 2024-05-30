"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./page.module.css";

const Event = () => {
  const router = useRouter();
  const { eventId } = router.query; // Retrieve the event ID from the URL
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${eventId}`); // Replace with your API endpoint to fetch event details
        if (!response.ok) {
          throw new Error("Failed to fetch event");
        }
        const eventData = await response.json();
        setEvent(eventData);
      } catch (error) {
        setError(error.message);
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  if (!eventId) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!event) {
    return <p>No event found.</p>;
  }

  return (
    <>
      <nav className={styles.navbar}>
        {/* Navbar content */}
      </nav>
      <div className={styles.container}>
        <div className={styles.eventDetails}>
          {/* Display event details */}
          <h1>{event.eventName}</h1>
          <p>Date: {event.startDate}</p>
          <p>Time: {event.startTime}</p>
          <p>Location: {event.location}</p>
          {/* Add more event details as needed */}
        </div>
        <div className={styles.eventDescription}>
          {/* Display event description */}
          <h2>Description</h2>
          <p>{event.eventDescription}</p>
        </div>
        <div className={styles.eventOrganizers}>
          {/* Display event organizers */}
          <h2>Organizers</h2>
          <p>Host: {event.firstName}</p>
          <p>Phone: {event.phoneNumber}</p>
          <p>Website: <a href={event.websiteLink}>{event.websiteLink}</a></p>
          {/* Add more organizer details as needed */}
        </div>
        <div className={styles.eventButtons}>
          {/* Display buttons (e.g., Edit and Publish) */}
          <Link href={`/events/${eventId}/edit`}>
            <button className="btn btn-secondary">Edit</button>
          </Link>
          <Link href="/events">
            <button className="btn btn-success">Publish</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Event;
