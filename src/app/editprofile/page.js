// src/app/editprofile/page.js
"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const EditProfile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

  // Initialize state variables with user data or empty strings
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [dob, setDob] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [github, setGithub] = useState('');
  const [twitter, setTwitter] = useState('');
  const [website, setWebsite] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [linkedlin, setLinkedlin] = useState('');
  const [bio, setBio] = useState('');

  // Set state variables once user data is fetched
  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setEmail(user.email || '');
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setAddress(user.address || '');
      setProfileImage(user.profileImage || '');
      setDob(user.dob ? new Date(user.dob).toISOString().split('T')[0] : '');
      setCountry(user.country || '');
      setCity(user.city || '');
      setPhoneNumber(user.phoneNumber || '');
      setGithub(user.github || '');
      setTwitter(user.twitter || '');
      setWebsite(user.website || '');
      setInstagram(user.instagram || '');
      setFacebook(user.facebook || '');
      setLinkedlin(user.linkedlin || '');
      setBio(user.bio || '');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch('/api/editProfile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          username,
          email,
          firstName,
          lastName,
          address,
          profileImage,
          dob,
          country,
          city,
          phoneNumber,
          github,
          twitter,
          website,
          instagram,
          facebook,
          linkedlin,
          bio
        })
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setSuccess('Profile updated successfully!');
        router.push('/profile');
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error('Edit profile error:', error);
      setError('An error occurred while updating profile');
    }
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-profile-container">
      <h1>Edit Profile</h1>
      {success && <div className="success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>First Name</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Profile Image</label>
          <input type="text" value={profileImage} onChange={(e) => setProfileImage(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Country</label>
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
        </div>
        <div className="form-group">
          <label>City</label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
        <div className="form-group">
          <label>GitHub</label>
          <input type="text" value={github} onChange={(e) => setGithub(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Twitter</label>
          <input type="text" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Website</label>
          <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Instagram</label>
          <input type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Facebook</label>
          <input type="text" value={facebook} onChange={(e) => setFacebook(e.target.value)} />
        </div>
        <div className="form-group">
          <label>LinkedIn</label>
          <input type="text" value={linkedlin} onChange={(e) => setLinkedlin(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Bio</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
