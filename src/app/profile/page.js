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
      {/* Display sessions or other user data if needed */}
      <div className="sessions">
        <h2>Sessions</h2>
        {user.sessions.length > 0 ? (
          <ul>
            {user.sessions.map(session => (
              <li key={session.id}>{session.sessionName}</li>
            ))}
          </ul>
        ) : (
          <p>No sessions available</p>
        )}
      </div>
      <button onClick={handleLogout} className="btn btn-outline-danger" style={{ marginTop: '20px' }}>
        Logout
      </button>
    </div>
  );
}
