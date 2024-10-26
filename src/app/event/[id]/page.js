// src/app/event/[id]/page.js
"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Spinner from '../../components/Spinner';// Adjusted path
import Navbar from '../../components/Navbar'
import Footer from 'app/components/Footer';


function getDayWithSuffix(date) {
  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? 'st'
      : day % 10 === 2 && day !== 12
      ? 'nd'
      : day % 10 === 3 && day !== 13
      ? 'rd'
      : 'th';
  return `${day}${suffix}`;
}

function formatDateWithDay(dateString) {
  const date = new Date(dateString);
  const dayWithSuffix = getDayWithSuffix(date);
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  return `${date.toLocaleDateString('en-US', { weekday: 'long' })}, ${dayWithSuffix} ${month} ${year}`;
}

export default function EventPage({ params }) {
  const { id } = params;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const router = useRouter();

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await fetch(`/api/event/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch event');
        }
        const eventData = await res.json();
        setEvent(eventData);
      } catch (error) {
        console.error('Error fetching event:', error);
        setEvent(null);
      } finally {
        setLoading(false); // Set loading to false when fetch is complete
      }
    }

    fetchEvent();
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const handleShareClick = () => {
    const eventUrl = window.location.href;
    navigator.clipboard.writeText(eventUrl)
      .then(() => {
        alert('Event URL copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy URL: ', err);
      });
  };

  if (loading) {
    return <Spinner />; // Show spinner while loading
  }

  if (!event) {
    return <p>Event does not exist!</p>;
  }

  return (
    <div className="container">
      <Navbar />
      <h4 className="text-center mt-5">Event Preview</h4>
      <div className="container">
        <div className="row justify-content-center align-items-center vh-100 ">
          <div className="col-lg-12 mb-3 mt-4 shadow-lg py-1 my-1">
            <div 
                className="p-1 py-5 mb-0 d-flex justify-content-start align-items-end rounded" 
                style={{ 
                  backgroundImage: `url(${event.imageUrl ? event.imageUrl : '/uploads/default-image.jpg'})`, 
                  backgroundPosition: 'center', 
                  backgroundSize: 'cover', 
                  backgroundRepeat: 'no-repeat', 
                  height: 'auto', 
                  minHeight: '300px',
                }}
              >
            </div>
            <h3 className="text-capitalize">{event.eventName}</h3>
            <div className="row mb-4 mt-4 rounded">
              <div className="col-md-6 mt-3">
                <p> 
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar-week" viewBox="0 0 16 16">
                    <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/>
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                  </svg> {formatDateWithDay(event.startDate)}
                </p>
                <p>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
                  </svg> {event.startTime} hrs - {event.endTime} hrs
                </p>
              </div>
              <div className="col-md-6 text-right mt-3 mb-3">
                <button type="button" className="btn btn-success mb-3" onClick={handleShareClick}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-share-fill" viewBox="0 0 16 16">
                    <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5"/>
                  </svg> Share Event
                </button>
                <br />
                <h6 className='mb-3'>Ticket information</h6>
                <p>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cash-stack" viewBox="0 0 16 16">
                    <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                    <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2z"/>
                  </svg> {event.ticketPrice}
                </p>
              </div>
            </div>
  
            <div className="col-md-8 mb-4 rounded">
              <h4>Location</h4>
              <p className="text-capitalize">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                </svg> {event.location}
              </p>
              <img src="/map.png" alt="Map" className="img-fluid rounded" style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
  
            <div className="row mb-4 rounded">
              <h4 className="text-top">Hosted by</h4>
              <div className="col-auto">
                <img src="/avatar-2.png" alt="Host" className="rounded-circle" style={{ maxWidth: '150px', maxHeight: '150px' }} />
              </div>
              <div className="col-md-4 mt-2 mb-2">
                <div className="mb-4">
                  <p>{event.firstName} {event.lastName}</p>
                </div>
                <div className="mb-2 d-flex justify-content-around">
                  <a href={`tel:${event.phoneNumber}`} className="btn btn-outline-info px-5 radius-30 mr-2">Contact</a>
                  <a 
                    href={event.twitterLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-outline-success btn-rounded ripple-surface-dark"
                    data-mdb-ripple-color="dark"
                  >
                    + Follow
                  </a>
                </div>
              </div>
            </div>
  
            <div className="row mb-4 rounded">
              <div className="col-md-8">
                <h4>Event Description</h4>
                <p className="text-justify">{event.eventDescription}</p>
              </div>
            </div>
  
            <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-5">
              
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}  