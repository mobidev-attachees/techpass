"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Image from 'next/image';
import styles from "./page.module.css";

export default function EditProfile() {
  const router = useRouter();
  
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    dob: '',
    country: '',
    city: '',
    phoneNumber: '',
    github: '',
    twitter: '',
    website: '',
    instagram: '',
    facebook: '',
    linkedlin: '',
    bio: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await fetch('/api/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setFormData({
            username: data.username || '',
            email: data.email || '',
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            address: data.address || '',
            dob: data.dob ? new Date(data.dob).toISOString().split('T')[0] : '',
            country: data.country || '',
            city: data.city || '',
            phoneNumber: data.phoneNumber || '',
            github: data.github || '',
            twitter: data.twitter || '',
            website: data.website || '',
            instagram: data.instagram || '',
            facebook: data.facebook || '',
            linkedlin: data.linkedlin || '',
            bio: data.bio || ''
          });
          setProfileImage(data.profileImage || null);
        } else {
          const errorData = await response.json();
          setError(errorData.message);
          if (response.status === 401) {
            router.push('/login');
          }
        }
      } catch (error) {
        console.error('Profile fetch error:', error);
        setError('An error occurred while fetching profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

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
      setProfileImage(imageUrl);
      setImageFile(file);
    } else {
      setProfileImage(null);
      setImageFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      if (imageFile) {
        formDataToSend.append('profileImage', imageFile);
      }

      const token = localStorage.getItem('token');
      const response = await fetch('/api/editProfile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        toast.success("Profile updated successfully", {
          duration: 4000,
          position: 'top-right',
          style: {
            background: '#4caf50',
            color: '#ffffff',
            zIndex: 99999,
          },
        });
        router.push('/profile');
      } else {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          toast.error(`Error: ${errorData.message}`, {
            duration: 4000,
            position: 'top-right',
            style: {
              background: '#ff0000',
              color: '#ffffff',
              zIndex: 99999,
            },
          });
        } else {
          const errorText = await response.text();
          toast.error(`Error: ${errorText}`, {
            duration: 4000,
            position: 'top-right',
            style: {
              background: '#ff0000',
              color: '#ffffff',
              zIndex: 99999,
            },
          });
        }
      }
    } catch (error) {
      console.error('Edit profile error:', error);
      toast.error(`Error: ${error.message}`, {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#ff0000',
          color: '#ffffff',
          zIndex: 99999,
        },
      });
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="container">
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
                <a className="nav-link text-success" href="/createevent">Create Event</a>
              </li>
              <li className="nav-item">
                <a className="nav-link link text-success" href="/events">All Events</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <Image src="/avatar-2.png" width="30" height="30" alt="profile image" className='rounded-circle'></Image>
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                  <li><a className="dropdown-item" href="/dashboard">Dashboard</a></li>
                  <li><a className="dropdown-item" href="/profile">Profile</a></li>
                  <li></li>
                  <li><a className="dropdown-item" href="/login">Logout</a></li>
                </ul>
              </li>
            </ul>
            
          </div>
        </div>
      </nav>
      <h3 className="text-center mt-3">Edit Event</h3>
      <div className="row justify-content-center p-4">
      <div className="col-lg-10 bg-white p-4 rounded shadow-lg">
        <form onSubmit={handleFormSubmit} className='row mt-4'>
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
