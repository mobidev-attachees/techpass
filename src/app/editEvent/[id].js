// src/app/event/[id]/edit.js
import { PrismaClient } from '@prisma/client';
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import styles from "./page.module.css";

const prisma = new PrismaClient();

export default function EditEvent({ params }) {
  const { id } = params;
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({
    eventName: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    ticketPrice: "",
    location: "",
    eventDescription: ""
  });

  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await fetch(`/api/event/${id}`); // assuming you have an API route to fetch event details
        if (response.ok) {
          const eventData = await response.json();
          setEvent(eventData);
          setFormData(eventData); // set initial form data to fetched event details
        } else {
          console.error("Failed to fetch event");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    }

    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update event details in the database
      const response = await fetch(`/api/event/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        console.log("Event updated successfully");
      } else {
        console.error("Failed to update event");
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  if (!event) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-20px">
      <h1 className={styles.h1}>Edit Event: {event.eventName}</h1>
      <form onSubmit={handleSubmit}>
        {/* Your editable fields go here */}
        {/* Example: */}
        <label>
          Event Name:
          <input type="text" name="eventName" value={formData.eventName} onChange={handleChange} />
        </label>
        {/* Repeat similar structure for other fields */}

        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
          <button type="submit" className="btn btn-success px-5 radius-30">Save Changes</button>
          <Link href={`/event/${id}`}>
            <a className="btn btn-secondary px-5 radius-30">Cancel</a>
          </Link>
        </div>
      </form>
    </div>
  );
}
