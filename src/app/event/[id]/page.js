// src/app/event/[id]/pages.js
import { PrismaClient } from '@prisma/client';
import React from "react";
import Link from 'next/link'; // Import Link from Next.js
import styles from "./page.module.css";
import Image from 'next/image';

const prisma = new PrismaClient();

async function getEvent(id) {
  if (!id) {
    console.error("ID is missing or invalid");
    return null;
  }
  
  const eventId = parseInt(id, 10);
  
  if (isNaN(eventId)) {
    console.error("Invalid ID format");
    return null;
  }

  const event = await prisma.storeEvent.findUnique({
    where: { id: eventId },
  });
  
  return event;
}

export default async function EventPage({ params }) {
  const { id } = params;
  const event = await getEvent(id);

  if (!event) {
    return <p>No event found</p>;
  }

  return (
    <div className="container mt-20px">
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
                <a className="nav-link link" href="/events">All Events</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <Image src="/avatar-2.png" width="30" height="30" alt="profile image" className='rounded-circle'></Image>
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                  <li><a className="dropdown-item" href="/dashboard">Dashboard</a></li>
                  <li><a className="dropdown-item" href="#">Profile</a></li>
                  <li></li>
                  <li><a className="dropdown-item" href="/login">Logout</a></li>
                </ul>
              </li>
            </ul>
            
          </div>
        </div>
      </nav>
      
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-10">
        <h1 className={styles.h1}>{event.eventName}</h1>
          <div className="card">
          
            <div className="card-body">
              {/* Banner Image */}
              <div className="banner-container text-center mb-4">
                <img src="/175.jpg" alt="Banner" className="banner-image" height="200px" width="600px" style={{ borderRadius: '10px' }} />
              </div>

              {/* Event Details */}
              <div className="row mb-4">
                {/* Column 1 */}
                <div className="col">
                  <h2>Event Details</h2>
                  <p>Start Date: {new Date(event.startDate).toLocaleDateString()}</p>
                  <p>End Date: {new Date(event.endDate).toLocaleDateString()}</p>
                  <p>Start Time: {event.startTime}</p>
                  <p>End Time: {event.endTime}</p>
                </div>

                {/* Column 2 */}
                <div className="col text-right ">
                  <h3></h3>
                  <button type="button" className="btn btn-success mr-2">
                    Share Event <i className="fas fa-share"></i>
                  </button>
                  <br />
                  <p>Ticket Price: {event.ticketPrice}</p>
                </div>
              </div>

              <div className="mb-4">
                <h3>Location</h3>
                <p>Location: {event.location}</p>
                <img src="/map.jpg" alt="Map" className="img-fluid rounded" style={{ maxWidth: '50%', height: 'auto' }} />
              </div>

              {/* Organizer Details */}
              <div className="row mb-8 align-items-center">
                {/* Left Column */}
                <div className="col-auto">
                  <img src="/avatar-2.png" alt="Host" className="rounded-circle" style={{ width: '150px', height: '150px' }} />
                </div>
                {/* Right Column (Host Image) */}
                <div className="col">
                  <div className="mb-4">
                    <p>{event.tittle} {event.firstName} {event.middleName} {event.lastName}</p>
                  </div>
                  <div className="mb-2">
                    <p>Phone: {event.phoneNumber}</p>
                    <p>Website: <a href="{event.websiteLink}">{event.websiteLink}</a></p>
                  </div>
                </div>
              </div>

              <div className="mb-4" style={{ maxWidth: '50%' }}>
                <h2>Event Description</h2>
                <p className="text-justify">{event.eventDescription}</p>
              </div>

              <hr />

              {/* Buttons */}
              <div className="d-flex justify-content-between">
                <button type="button" className="btn btn-secondary mr-2">
                  <Link href="/createevent">Edit</Link>
                </button>
                <button type="button" className="btn btn-success">
                  <Link href="/events">Publish</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
