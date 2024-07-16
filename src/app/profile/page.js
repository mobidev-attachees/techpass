// pages/profile.js
"use client";
import React, { useEffect, useState } from "react";
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
    <div className="profile-container">
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
      
      <button onClick={handleLogout} className="btn btn-outline-danger" style={{ marginTop: '20px' }}>
        Logout
      </button>
    </div>
  );
}
