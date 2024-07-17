// pages/profile.js
"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login?message=You are not logged in. Please log in first.');
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
        } else {
          const errorData = await response.json();
          setError(errorData.message);
          if (response.status === 401) {
            router.push('/login?message=You are not logged in. Please log in first.');
          }
        }
      } catch (error) {
        console.error('Profile fetch error:', error);
        setError('An error occurred while fetching profile');
      }
    };

    fetchProfile();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container container">
      <h1>Profile</h1>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>First Name:</strong> {user.firstName}</p>
      <p><strong>Last Name:</strong> {user.lastName}</p>
      <p><strong>Address:</strong> {user.address || "Not provided"}</p>
      <p><strong>Profile Image:</strong> {user.profileImage ? <img src={user.profileImage} alt="Profile" style={{ maxWidth: '100px', maxHeight: '100px' }} /> : "Not provided"}</p>
      <p><strong>Date of Birth:</strong> {user.dob ? new Date(user.dob).toLocaleDateString() : "Not provided"}</p>
      <p><strong>Country:</strong> {user.country || "Not provided"}</p>
      <p><strong>Phone Number:</strong> {user.phoneNumber || "Not provided"}</p>
      <p><strong>GitHub:</strong> {user.github || "Not provided"}</p>
      <p><strong>Twitter:</strong> {user.twitter || "Not provided"}</p>
      <p><strong>Website:</strong> {user.website || "Not provided"}</p>
      <p><strong>Instagram:</strong> {user.instagram || "Not provided"}</p>
      <p><strong>Facebook:</strong> {user.facebook || "Not provided"}</p>
      {/* Add other profile details as needed */}
      <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-8 mb-4 mb-lg-0">
            <div className="card mb-3" style={{ borderRadius: '.5rem' }}>
              <div className="row g-0">
                <div
                  className="col-md-4 gradient-custom text-center text-white bg-success align-items-center"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem', background: '' }}
                >
                 <div className="media-img media--img media-img-md rounded-full">
                    <img
                      className="rounded-full rounded-circle"
                      src="/avatar-2.png"
                      alt="Student thumbnail image"
                    />
                  </div>
                  <h5>Marie Horwitz</h5>
                  <p>Web Designer</p>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                  </svg>
                </div>
                <div className="col-md-8">
                  <div className="card-body p-4">
                    <h6>Information</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        <h6>Email</h6>
                        <p className="text-muted">info@example.com</p>
                      </div>
                      <div className="col-6 mb-3">
                        <h6>Phone</h6>
                        <p className="text-muted">123 456 789</p>
                      </div>
                    </div>
                    <h6>Projects</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        <h6>Recent</h6>
                        <p className="text-muted">Lorem ipsum</p>
                      </div>
                      <div className="col-6 mb-3">
                        <h6>Most Viewed</h6>
                        <p className="text-muted">Dolor sit amet</p>
                      </div>
                    </div>
                    <div className="d-flex justify-content-start">
                      <a href="#!">
                        <i className="fab fa-facebook-f fa-lg me-3"></i>
                      </a>
                      <a href="#!">
                        <i className="fab fa-twitter fa-lg me-3"></i>
                      </a>
                      <a href="#!">
                        <i className="fab fa-instagram fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
      
      <button onClick={handleLogout} className="btn btn-outline-danger" style={{ marginTop: '20px' }}>
        Logout
      </button>
    </div>
  );
}
