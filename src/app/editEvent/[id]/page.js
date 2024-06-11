// src/app/editEvent/[id]/page.js
"use client"; // Ensure this is declared at the top
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation'; // Correct import for useRouter and useParams
import Image from 'next/image';
import styles from "./page.module.css";

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({
    eventName: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    ticketPrice: '',
    location: '',
    eventDescription: '',
    email: '',
    tittle: '',
    firstName: '',
    middleName: '',
    lastName: '',
    phoneNumber: '',
    websiteLink: '',
    facebookLink: '',
    instagramLink: '',
    twitterLink: '',
  });

  useEffect(() => {
    if (id) {
      fetch(`/api/events/${id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setEvent(data);
            setFormData({
              eventName: data.eventName,
              startDate: new Date(data.startDate).toISOString().split('T')[0], // format date for input
              endDate: new Date(data.endDate).toISOString().split('T')[0], // format date for input
              startTime: data.startTime,
              endTime: data.endTime,
              ticketPrice: data.ticketPrice || '',
              location: data.location,
              eventDescription: data.eventDescription,
              email: data.email,
              tittle: data.tittle,
              firstName: data.firstName,
              middleName: data.middleName || '',
              lastName: data.lastName,
              phoneNumber: data.phoneNumber,
              websiteLink: data.websiteLink || '',
              facebookLink: data.facebookLink || '',
              instagramLink: data.instagramLink || '',
              twitterLink: data.twitterLink || '',
            });
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching event:', error);
          setLoading(false);
        });
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/updateEvent/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        router.push(`/event/${id}`);
      } else {
        const errorData = await response.json();
        console.error('Failed to update event:', errorData.error);
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error updating event:', error);
      alert(`Error: ${error.message}`);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!event) {
    return <p>Event not found</p>;
  }

  return (
    <div className='container'>
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
                  <li><a className="dropdown-item" href="#">Profile</a></li>
                  <li></li>
                  <li><a className="dropdown-item" href="/login">Logout</a></li>
                </ul>
              </li>
            </ul>
            
          </div>
        </div>
      </nav>
      <h1>Edit Event</h1>
      <main className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="row justify-content-center">
      <div className="col-lg-10 bg-white p-4 rounded shadow-lg">
        <form onSubmit={handleFormSubmit} className='row mt-4'>
          <div className={styles.formGroup} style={{ marginBottom: '20px', width:'50%' }}>
            <label htmlFor="eventName" className={styles.label}>Event Name:</label>
            <input
              type="text"
              name="eventName"
              value={formData.eventName}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
          <div>
            <label>Event Description:</label>
            <textarea
              name="eventDescription"
              value={formData.eventDescription}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div>
            <label>Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>End Date:</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Start Time:</label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>End Time:</label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Ticket Price:</label>
            <input
              type="text"
              name="ticketPrice"
              value={formData.ticketPrice}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />
          </div>
          
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="tittle"
              value={formData.tittle}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Middle Name:</label>
            <input
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Phone Number:</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Website Link:</label>
            <input
              type="url"
              name="websiteLink"
              value={formData.websiteLink}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Facebook Link:</label>
            <input
              type="url"
              name="facebookLink"
              value={formData.facebookLink}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Instagram Link:</label>
            <input
              type="url"
              name="instagramLink"
              value={formData.instagramLink}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Twitter Link:</label>
            <input
              type="url"
              name="twitterLink"
              value={formData.twitterLink}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Save</button>
        </form>
        </div>
        </div>
      </main>
    </div>
  );
  
}
