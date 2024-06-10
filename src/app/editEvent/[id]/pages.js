// src/app/editEvent/[id]/pages.js
"use client";
import { PrismaClient } from '@prisma/client';
import React, { useState, useEffect } from "react";
import Link from 'next/link';

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
        const response = await fetch(`/api/event/${id}`);
        if (response.ok) {
          const eventData = await response.json();
          setEvent(eventData);
          setFormData(eventData);
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
      <h1>Edit Event: {event.eventName}</h1>
      <form onSubmit={handleSubmit}>
        {/* Editable fields */}
      </form>
    </div>
  );
}
