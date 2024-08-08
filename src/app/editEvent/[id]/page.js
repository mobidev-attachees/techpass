// src/app/editEvent/[id]/page.js
"use client"; // Ensure this is declared at the top
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation'; // Correct import for useRouter and useParams
import Image from 'next/image';
import styles from "./page.module.css";
import PhoneInput from 'react-phone-number-input/input';
import toast from 'react-hot-toast';
import BannerCarousel from '../../components/BannerCarousel';
import Navbar from '../../components/Navbar';


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
    isFree: true, // Default to free ticket
    ticketPrice: 'free', // Default ticket price
    location: 'physical',
    meetingLink: '',
    country: '',
    city: '',
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

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/events/${id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setEvent(data);
            setFormData({
              eventName: data.eventName,
              startDate: new Date(data.startDate).toISOString().split('T')[0],
              endDate: new Date(data.endDate).toISOString().split('T')[0],
              startTime: data.startTime,
              endTime: data.endTime,
              isFree: data.ticketPrice === 'free',
              ticketPrice: data.ticketPrice || 'free', // Set ticket price or 'free' for free events
              location: data.location || 'physical',
              meetingLink: data.meetingLink || '',
              country: data.country || '',
              city: data.city || '',
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
            setSelectedImage(data.imageUrl || null); // Set the current image URL if available
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching event:', error);
          setLoading(false);
        });
    }
  }, [id]);

  const [showPartTwo, setShowPartTwo] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setImageFile(file);
    } else {
      setSelectedImage(null);
      setImageFile(null);
    }
  };

  const handleSwitchChange = () => {
    setFormData((prevState) => ({
      ...prevState,
      isFree: !prevState.isFree,
      ticketPrice: prevState.isFree ? '' : 'free', // Toggle between '' and 'free'
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      ticketPrice: formData.isFree ? 'free' : formData.ticketPrice,
    };

    try {
      const formDataToSend = new FormData();
      for (const key in updatedData) {
        formDataToSend.append(key, updatedData[key]);
      }
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      const response = await fetch(`/api/updateEvent/${id}`, {
        method: 'PUT',
        body: formDataToSend,
      });

      if (response.ok) {
        toast.success("Event updated successfully", {
          duration: 4000,
          position: 'top-right',
          style: {
            background: '#4caf50',
            color: '#ffffff',
            zIndex: 99999
          },
        });
        router.push(`/event/${id}`);
      } else {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          console.error('Failed to update event:', errorData.error);
          alert(`Error: ${errorData.error}`);
        } else {
          const errorText = await response.text();
          console.error('Failed to update event:', errorText);
          alert(`Error: ${errorText}`);
        }
      }
    } catch (error) {
      console.error('Error updating event:', error);
      alert(`Error: ${error.message}`);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
   <div>
   <Navbar />
   </div>
      <h3 className="text-center mt-3">Edit Event</h3>
      <div className="row justify-content-center p-4">
      <div className="col-lg-10 bg-white p-4 rounded shadow-lg">
        <form onSubmit={handleSubmit} className='row mt-4'>
          {/* Part One */}
          {!showPartTwo && (
            <>
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
              <div className={styles.formGroup} style={{ marginBottom: '20px', width:'80%' }}>
                <label htmlFor="eventDescription" className={styles.label}>Event Description:</label>
                <textarea
                  type="text"
                  name="eventDescription"
                  value={formData.eventDescription}
                  onChange={handleInputChange}
                  className={styles.input}
                  rows="4" 
                  cols="50"
                />
              </div>
              <div className=" row mt-3 mb-3 shadow-sm rounded">
                  <div className="form-group col-md-6 mb-3">
                  <label htmlFor="image">Edit event banner</label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group col-md-6 mb-3">
                  {selectedImage && (
                    <Image
                      src={selectedImage || '/uploads/default-image.jpg'}
                      alt="Event Image"
                      width={100}
                      height={100}
                      className=" rounded-circle p-1 bg-success"
                    />
                  )}
                </div>
              </div>
              
              
              <div className="row rounded shadow-sm mb-5">
                <div className={`col-md-6 ${styles.formGroup}`} style={{ marginBottom: '20px' }}>
                  <label htmlFor="location" className={styles.label}>Location:</label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={styles.input}
                  >
                    <option value="physical">Physical</option>
                    <option value="virtual">Virtual</option>
                  </select>
                </div>
                <div className={`col-md-6 ${styles.formGroup}`} style={{ marginBottom: '20px' }}>
                  {formData.location === 'virtual' && (
                    <div className="row">
                      <div className="col-md-12">
                        <label htmlFor="meetingLink" className={styles.label}>Meeting Link:</label>
                        <input
                          type="text"
                          name="meetingLink"
                          value={formData.meetingLink}
                          onChange={handleInputChange}
                          className={styles.input}
                        />
                      </div>
                    </div>
                  )}
                  {formData.location === 'physical' && (
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="country" className={styles.label}>Country:</label>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className={styles.input}
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="city" className={styles.label}>City:</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className={styles.input}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="row rounded shadow-sm">
                <div className={`${styles.formGroup} col-md-3`} style={{ marginBottom: '20px' }}>
                  <label htmlFor="startDate" className={styles.label}>Start Date:</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>
                <div className={`${styles.formGroup} col-md-3`} style={{ marginBottom: '20px' }}>
                  <label htmlFor="endDate" className={styles.label}>End Date:</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>
                <div className={`${styles.formGroup} col-md-3`} style={{ marginBottom: '20px' }}>
                  <label htmlFor="startTime" className={styles.label}>Start Time:</label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>
                <div className={`${styles.formGroup} col-md-3`} style={{ marginBottom: '20px' }}>
                  <label htmlFor="endTime" className={styles.label}>End Time:</label>
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>
              </div>
              <div className="col mb-5 mt-5 rounded shadow-sm">
                  <h6>Event Charges</h6>
                  <p>Click to switch to paid ticket price</p>
                  <div className="col-md-6">
                    <div className="form-check form-switch form-check-success">
                      <input
                        className="form-check-input form-check-success"
                        type="checkbox"
                        id="flexSwitchCheckSuccess"
                        checked={formData.isFree}
                        onChange={handleSwitchChange}
                      />
                      <label className="form-check-label" htmlFor="flexSwitchCheckSuccess">
                        {formData.isFree ? 'Free Ticket' : 'Paid Ticket'}
                      </label>
                    </div>
                  </div>
                  {!formData.isFree && (
                    <div className="col-md-3 mt-3" style={{ marginBottom: '20px' }}>
                      <label htmlFor="ticketPrice">Ticket Price:</label>
                      <input
                        type="text"
                        name="ticketPrice"
                        value={formData.ticketPrice}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                  )}
                </div>
              <div className='d-grid p-2 justify-content-md-end'>
                <button type="button" className='btn btn-outline-success btn-rounded' onClick={() => setShowPartTwo(true)}>Next</button>
              </div>
            </>
          )}

          {/* Part Two */}
          {showPartTwo && (
            <>
              <div className="row rounded shadow-sm">
                <h6>Personal Information</h6>
                <div className={`${styles.formGroup} col-md-3`} style={{ marginBottom: '20px' }}>
                  <label htmlFor="tittle" className={styles.label}>Tittle:</label>
                  <select
                    name="tittle"
                    value={formData.tittle}
                    onChange={handleInputChange}
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
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`${styles.input} form-control`}
                  />
                </div>

                <div className={`${styles.formGroup} col-md-3`} style={{ marginBottom: '20px' }}>
                  <label htmlFor="middleName" className={styles.label}>Middle Name:</label>
                  <input
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleInputChange}
                    className={`${styles.input} form-control`}
                  />
                </div>

                <div className={`${styles.formGroup} col-md-3`} style={{ marginBottom: '20px' }}>
                  <label htmlFor="lastName" className={styles.label}>Last Name:</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`${styles.input} form-control`}
                  />
                </div>
              </div>
              <div className="row mt-5 rounded shadow-sm">
                <h6 className="text-decoration-underline">Contact info</h6>
                <div className={`${styles.formGroup} col-md-4`} style={{ marginBottom: '20px' }}>
                  <label htmlFor="phoneNumber" className={styles.label}>Phone Number:</label>
                  <input
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={`${styles.input} form-control`}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className={`${styles.formGroup} col-md-4`} style={{ marginBottom: '20px' }}>
                  <label htmlFor="email" className={styles.label}>Email address:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`${styles.input} form-control`}
                  />
                </div>
                <div className={`${styles.formGroup} col-md-4`} style={{ marginBottom: '20px' }}>
                  <label htmlFor="websiteLink" className={styles.label}>Website Link:</label>
                  <input
                    type="url"
                    name="websiteLink"
                    value={formData.websiteLink}
                    onChange={handleInputChange}
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
                    value={formData.facebookLink}
                    onChange={handleInputChange}
                    className={`${styles.input} form-control`}
                  />
                </div>
                <div className={`${styles.formGroup} col-md-4`} style={{ marginBottom: '20px' }}>
                  <label htmlFor="instagramLink" className={styles.label}>Instagram Link:</label>
                  <input
                    type="url"
                    name="instagramLink"
                    value={formData.instagramLink}
                    onChange={handleInputChange}
                    className={`${styles.input} form-control`}
                  />
                </div>
                <div className={`${styles.formGroup} col-md-4`} style={{ marginBottom: '20px' }}>
                  <label htmlFor="twitterLink" className={styles.label}>Twitter Link:</label>
                  <input
                    type="url"
                    name="twitterLink"
                    value={formData.twitterLink}
                    onChange={handleInputChange}
                    className={`${styles.input} form-control`}
                  />
                </div>
              </div>
              <div className='d-grid p-2'>
                <button type="submit" className='btn btn-outline-success btn-lg'>Save</button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
    </div>
  );
  
}
