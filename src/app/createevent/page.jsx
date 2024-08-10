// src/app/createevent/page.jsx
"use client";
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import PhoneInput from 'react-phone-number-input/input';
import Image from "next/image";
import { toast } from 'react-hot-toast';
import Navbar from '../components/Navbar';

const CreateEvent = () => {
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
  const [tittle, setTittle] = useState('Mr.'); // Corrected variable name from tittle to title
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [ticketPrice, setTicketPrice] = useState('Free');
  const [websiteLink, setWebsiteLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [isFree, setIsFree] = useState(true);
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();

  // Function to fetch user login status
  const checkLoggedIn = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        toast.error("You are not logged in. Please log in to create events.");
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  useEffect(() => {
    checkLoggedIn(); // Check login status on component mount
  }, []);

  const countries = ['USA', 'Canada', 'UK'];
  const citiesByCountry = {
    'USA': ['New York', 'Los Angeles', 'Chicago'],
    'Canada': ['Toronto', 'Vancouver', 'Montreal'],
    'UK': ['London', 'Manchester', 'Birmingham']
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setCountry(selectedCountry);
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
    setStep(1);
  };

  const handleSwitchChange = () => {
    setIsFree(!isFree);
    if (!isFree) {
      setTicketPrice('');
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setImage(file);
    } else {
      setSelectedImage(null);
      setImage(null);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setError("");

    if (!eventName || !eventDescription || !email || !firstName || !lastName || !phoneNumber || !startDate || !endDate || !startTime || !endTime) {
      setError('All required fields must be filled');
      return;
    }

    try {
      const formattedStartDate = new Date(startDate).toISOString();
      const formattedEndDate = new Date(endDate).toISOString();

      const formData = new FormData();
      formData.append("eventName", eventName);
      formData.append("eventDescription", eventDescription);
      formData.append("tittle", tittle); // Changed tittle to title
      formData.append("location", location);
      formData.append("country", country);
      formData.append("city", city);
      formData.append("startDate", formattedStartDate);
      formData.append("endDate", formattedEndDate);
      formData.append("startTime", startTime);
      formData.append("endTime", endTime);
      formData.append("meetingLink", meetingLink);
      formData.append("email", email);
      formData.append("ticketPrice", ticketPrice);
      formData.append("firstName", firstName);
      formData.append("middleName", middleName);
      formData.append("lastName", lastName);
      formData.append("phoneNumber", phoneNumber);
      formData.append("instagramLink", instagramLink);
      formData.append("twitterLink", twitterLink);
      formData.append("websiteLink", websiteLink);
      formData.append("facebookLink", facebookLink);
      if (image) {
        formData.append("image", image);
      }

      const token = localStorage.getItem('token');
      const response = await fetch("/api/createEvent", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
      <div><Navbar /></div>
      <h3 className="text-center mt-3">Create Event</h3>
      <main className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      
      <div className="container mt-3">

        <div className="row justify-content-center">
          <div className="col-lg-10 bg-white p-4 rounded shadow-lg">
            
            {error && <p className={styles.error}>{error}</p>}
            <form onSubmit={handleCreateEvent} className={styles.form}>
              <fieldset style={{ display: step === 1 ? 'block' : 'none' }}>
                
                <h4 className="">Event Details</h4>
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
                  <div className="row mt-3 mb-3 shadow-sm rounded">
                    <div className="form-group col-md-6 mb-3">
                      <label htmlFor="image" className="form-label">Upload banner Image</label>
                      <input 
                        className="form-control" 
                        name="image" 
                        type="file" 
                        id="image" 
                        accept="image/*"
                        onChange={handleImageChange} 
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <img 
                        id="showImage" 
                        src={selectedImage || '/uploads/default-image.jpg'}
                        alt="Event"
                        className="p-1 rounded-circle bg-success"
                        width="100"
                      />
                    </div>
                  </div>
                  <div className="row rounded  shadow-sm mb-5">
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

                  <div className="row rounded shadow-sm">
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
                  
                  
                  <div className="row mb-5 mt-5 rounded  shadow-sm">
                  <h6>Event Charges</h6>
                  <p>Click to switch to paid ticket price</p>
                    <div className="col-md-6">
                      <div className="form-check form-switch form-check-success">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckSuccess"
                          checked={isFree}
                          onChange={handleSwitchChange}
                        />
                        <label className="form-check-label" htmlFor="flexSwitchCheckSuccess">
                          {isFree ? 'Free Ticket' : 'Paid Ticket'}
                        </label>
                      </div>
                    </div>
                    {!isFree && (
                      <div className={`${styles.formGroup} col-md-3`} style={{ marginBottom: '20px' }}>
                        <label htmlFor="ticketPrice" className={`${styles.label}`}>Ticket Price:</label>
                        <input
                          type="text"
                          name="ticketPrice"
                          value={ticketPrice}
                          onChange={(e) => setTicketPrice(e.target.value)}
                          className={`${styles.input}`}
                        />
                      </div>
                    )}
                  </div>


                  <button onClick={handleNext} className={`${styles.button} btn btn-success`} style={{ width: 'auto' }}>
                    Next
                  </button>
                </fieldset>
                {/* Start part Two of the form */}
                <fieldset style={{ display: step === 2 ? 'block' : 'none' }}>
              <h3 className="">Organizers Details</h3>
              
              <div className="row rounded shadow-sm">
                <h6>Personal Information</h6>
                <div className={`${styles.formGroup} col-md-3`} style={{ marginBottom: '20px' }}>
                  <label htmlFor="tittle" className={styles.label}>Tittle:</label>
                  <select
                    name="title"
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

              <div className="row mt-5 rounded shadow-sm">
              <h6 className=""> Contact info</h6>
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
              
              <div className="row mt-5 shadow-sm rounded">
                <h6>Social media</h6>
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

              <div style={{ display: 'flex', flexWrap:'wrap', justifyContent: 'space-between', marginTop: '20px' }}>
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

export default CreateEvent;
