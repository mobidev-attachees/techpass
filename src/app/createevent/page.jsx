// src/app/createevent/page.jsx
"use client";
import React, { useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation"; // Fix import statement
import styles from "./page.module.css";
import PhoneInput from 'react-phone-number-input/input';

const createevent = () => {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [location, setLocation] = useState('physical');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [email, setEmail] = useState("");
  const [tittle, setTittle] = useState(""); 
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const router = useRouter();

  const countries = ['USA', 'Canada', 'UK'];
  const citiesByCountry = {
    'USA': ['New York', 'Los Angeles', 'Chicago'],
    'Canada': ['Toronto', 'Vancouver', 'Montreal'],
    'UK': ['London', 'Manchester', 'Birmingham']
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setCountry(selectedCountry);
    // Reset city when country changes
    setCity('');
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };
  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };
  const handleBack = () => {
    setStep(2)(false);
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message


    if (!eventName || !eventDescription || !email || !firstName || !lastName || !phoneNumber || !startDate || !endDate || !startTime || !endTime) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }

    try {
      const response = await fetch("/api/createEvent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventName, eventDescription, tittle, location, country, city, startTime, endTime,
          startDate, endDate, meetingLink, email, ticketPrice, firstName,
          middleName, lastName, phoneNumber,instagramLink, twitterLink, websiteLink, facebookLink
        }),
      });

      if (response.ok) {
        router.push("/events");
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error("Event creation error:", error);
      setError("An error occurred during event creation");
    }
  
    
  };

  return (
    <div className="container">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">Techpass</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
              </li>
            </ul>
            <ul class="navbar-nav">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="vercel.svg" alt="" width="30" height="24"></img>
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a class="dropdown-item" href="/events">Admin Dashboard</a></li>
                  <li><a class="dropdown-item" href="#">My Account</a></li>
                  <li><hr class="dropdown-divider"/></li>
                  <li><a class="dropdown-item" href="/login">Logout</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="container">

        <div className="row justify-content-center">
          <div className="col-lg-10 bg-white p-4 rounded shadow">
            <h2 className={styles.heading}>Create Event</h2>
            {error && <p className={styles.error}>{error}</p>}
            <form onSubmit={handleCreateEvent} className={styles.form}>
              <fieldset style={{ display: step === 1 ? 'block' : 'none' }}>
                
                <h4>Event Details</h4>
                  <div className={styles.formGroup} style={{ marginBottom: '20px', width:'50%' }}>
                    <label htmlFor="eventName" className={styles.label}>Event Name:</label>
                    <input
                      type="text"
                      name="eventName"
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.formGroup} style={{ marginBottom: '20px', width:'80%' }}>
                    <label htmlFor="eventDescription" className={styles.label}>Event Description:</label>
                    <textarea
                      type="text"
                      name="eventDescription"
                      value={eventDescription}
                      onChange={(e) => setEventDescription(e.target.value)}
                      className={styles.input}
                      rows="4" 
                      cols="50"
                    />
                  </div>
                  <div className="row">
                    <div className={`col-md-${location === 'virtual' ? 6 : 4} ${styles.formGroup}`} style={{ marginBottom: '20px' }}>
                      <label htmlFor="location" className={styles.label}>Location:</label>
                      <select
                        name="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className={styles.input}
                      >
                        <option value="virtual">Virtual</option>
                        <option value="physical">Physical</option>
                      </select>
                    </div>

                    {location === 'virtual' ? (
                      <div className={`col-md-6 ${styles.formGroup}`} style={{ marginBottom: '20px' }}>
                        <label htmlFor="meetingLink" className={styles.label}>Meeting Link:</label>
                        <input
                          type="text"
                          name="meetingLink"
                          value={meetingLink}
                          onChange={(e) => setMeetingLink(e.target.value)}
                          className={styles.input}
                        />
                      </div>
                    ) : (
                      <>
                        <div className={`col-md-4 ${styles.formGroup}`} style={{ marginBottom: '20px' }}>
                          <label htmlFor="country" className={styles.label}>Country:</label>
                          <select
                            name="country"
                            value={country}
                            onChange={handleCountryChange}
                            className={styles.input}
                          >
                            <option value="">Select a country</option>
                            {countries.map((country, index) => (
                              <option key={index} value={country}>{country}</option>
                            ))}
                          </select>
                        </div>
                        <div className={`col-md-4 ${styles.formGroup}`} style={{ marginBottom: '20px' }}>
                          <label htmlFor="city" className={styles.label}>City:</label>
                          <select
                            name="city"
                            value={city}
                            onChange={handleCityChange}
                            className={styles.input}
                            disabled={!country} // Disable city dropdown until country is selected
                          >
                            <option value="">Select a city</option>
                            {country && citiesByCountry[country].map((city, index) => (
                              <option key={index} value={city}>{city}</option>
                            ))}
                          </select>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="row">
                    <div className={`${styles.formGroup} col-md-3`} style={{ marginBottom: '20px' }}>
                      <label htmlFor="startDate" className={styles.label}>Start Date:</label>
                      <input
                        type="date"
                        name="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className={styles.input}
                      />
                    </div>
                    <div className={`${styles.formGroup} col-md-3`} style={{ marginBottom: '20px' }}>
                      <label htmlFor="endDate" className={styles.label}>End Date:</label>
                      <input
                        type="date"
                        name="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className={styles.input}
                      />
                    </div>
                    <div className={`${styles.formGroup} col-md-3`} style={{ marginBottom: '20px' }}>
                      <label htmlFor="startTime" className={styles.label}>Start Time:</label>
                      <input
                        type="time"
                        name="startTime"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className={styles.input}
                      />
                    </div>
                    <div className={`${styles.formGroup} col-md-3`} style={{ marginBottom: '20px' }}>
                      <label htmlFor="endTime" className={styles.label}>End Time:</label>
                      <input
                        type="time"
                        name="endTime"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className={styles.input}
                      />
                    </div>
                  </div>
                  <hr></hr>
                  <h6>Event Charges</h6><br></br>
                  <div className={styles.formGroup} style={{ marginBottom: '20px', width: '100px' }}>
                    <label htmlFor="ticketPrice" className={styles.label}>Ticket Price:</label>
                    <input
                      type="text"
                      name="ticketPrice"
                      value={ticketPrice}
                      onChange={(e) => setTicketPrice(e.target.value)}
                      className={styles.input}
                    />
                  </div>
                  <button onClick={handleNext} className={`${styles.button} btn btn-primary`} style={{ width: 'auto' }}>
                    Next
                  </button>
                </fieldset>
                {/* Start part Two of the form */}
                <fieldset style={{ display: step === 2 ? 'block' : 'none' }}>
              <h2>Organizers Details</h2>
              <div className="row">
                <div className={`${styles.formGroup} col-md-3`} style={{ marginBottom: '20px' }}>
                  <label htmlFor="tittle" className={styles.label}>Tittle:</label>
                  <select
                    name="tittle"
                    value={tittle}
                    onChange={(e) => setTittle(e.target.value)}
                    className={`${styles.select} form-control`}
                  >
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Miss">Miss</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Dr.">Dr.</option>
                  </select>
                </div>

                <div className={`${styles.formGroup} col-md-3`} style={{ marginBottom: '20px' }}>
                  <label htmlFor="firstName" className={styles.label}>First Name:</label>
                  <input
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={`${styles.input} form-control`}
                  />
                </div>

                <div className={`${styles.formGroup} col-md-3`} style={{ marginBottom: '20px' }}>
                  <label htmlFor="middleName" className={styles.label}>Middle Name:</label>
                  <input
                    type="text"
                    name="middleName"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                    className={`${styles.input} form-control`}
                  />
                </div>

                <div className={`${styles.formGroup} col-md-3`} style={{ marginBottom: '20px' }}>
                  <label htmlFor="lastName" className={styles.label}>Last Name:</label>
                  <input
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={`${styles.input} form-control`}
                  />
                </div>
              </div>

              <div className="row">
              <div className={`${styles.formGroup} col-md-4`} style={{ marginBottom: '20px' }}>
                  <label htmlFor="phoneNumber" className={styles.label}>Phone Number:</label>
                  <PhoneInput
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    className={`${styles.input} form-control`}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className={`${styles.formGroup} col-md-4`} style={{ marginBottom: '20px' }}>
                  <label htmlFor="email" className={styles.label}>Email address:</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`${styles.input} form-control`}
                  />
                </div>

                <div className={`${styles.formGroup} col-md-4`} style={{ marginBottom: '20px' }}>
                  <label htmlFor="websiteLink" className={styles.label}>Website Link:</label>
                  <input
                    type="url"
                    name="websiteLink"
                    value={websiteLink}
                    onChange={(e) => setWebsiteLink(e.target.value)}
                    className={`${styles.input} form-control`}
                  />
                </div>
              </div>
              <h4>Social media</h4>
              <div className="row">
                <div className={`${styles.formGroup} col-md-4`} style={{ marginBottom: '20px' }}>
                  <label htmlFor="facebookLink" className={styles.label}>Facebook Link:</label>
                  <input
                    type="url"
                    name="facebookLink"
                    value={facebookLink}
                    onChange={(e) => setFacebookLink(e.target.value)}
                    className={`${styles.input} form-control`}
                  />
                </div>

                <div className={`${styles.formGroup} col-md-4`} style={{ marginBottom: '20px' }}>
                  <label htmlFor="instagramLink" className={styles.label}>Instagram Link:</label>
                  <input
                    type="url"
                    name="instagramLink"
                    value={instagramLink}
                    onChange={(e) => setInstagramLink(e.target.value)}
                    className={`${styles.input} form-control`}
                  />
                </div>

                <div className={`${styles.formGroup} col-md-4`} style={{ marginBottom: '20px' }}>
                  <label htmlFor="twitterLink" className={styles.label}>Twitter Link:</label>
                  <input
                    type="url"
                    name="twitterLink"
                    value={twitterLink}
                    onChange={(e) => setTwitterLink(e.target.value)}
                    className={`${styles.input} form-control`}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <button type="button" onClick={handleBack} className="btn btn-secondary">Back</button>
                <button type="submit" className="btn btn-secondary">
                  <Link href="/previewevent">Preview</Link>
                </button>
                <button type="button" onClick={handleCreateEvent} className="btn btn-success">Publish Event</button>
              </div>
              </fieldset>
            </form>
          </div>
        </div>
        </div>
      </main>
    </div>
  );
};

export default createevent;
