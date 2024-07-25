"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function EditProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    address: '',
    profileImage: '',
    dob: '',
    country: '',
    phoneNumber: '',
    github: '',
    twitter: '',
    website: '',
    instagram: '',
    facebook: '',
    linkedin: '',
    bio: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const defaultImageUrl = '/default-profile-image.png'; // Replace with your default image path

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setFormData({
          username: data.username,
          address: data.address,
          profileImage: data.profileImage || '',
          dob: data.dob,
          country: data.country,
          phoneNumber: data.phoneNumber,
          github: data.github,
          twitter: data.twitter,
          website: data.website,
          instagram: data.instagram,
          facebook: data.facebook,
          linkedin: data.linkedin,
          bio: data.bio
        });
        setSelectedImage(data.profileImage || defaultImageUrl);
      } else {
        console.error('Failed to fetch profile data:', response.statusText);
        toast.error("Failed to fetch profile data");
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error("Error fetching profile data");
    } finally {
      setLoading(false);
    }
  };

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
      setSelectedImage(defaultImageUrl);
      setImageFile(null);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
    };

    try {
      const formDataToSend = new FormData();
      for (const key in updatedData) {
        formDataToSend.append(key, updatedData[key]);
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
        router.replace('/profile');
      } else if (response.status === 401) {
        toast.error("You are not logged in or unauthorized access", {
          duration: 4000,
          position: 'top-right',
          style: {
            background: '#ff0000',
            color: '#ffffff',
            zIndex: 99999,
          },
        });
        router.replace('/login');
      } else {
        const errorText = await response.text();
        console.error('Failed to update profile:', errorText);
        toast.error(`Error: ${errorText}`);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(`Error: ${error.message}`);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="profileImage">Profile Image</label>
          <input
            type="file"
            id="profileImage"
            onChange={handleImageChange}
          />
          <div>
            <Image 
              src={selectedImage || defaultImageUrl} 
              alt="Profile Preview" 
              width={100} 
              height={100} 
            />
          </div>
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="github">GitHub</label>
          <input
            type="text"
            id="github"
            name="github"
            value={formData.github}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="twitter"
            name="twitter"
            value={formData.twitter}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="instagram">Instagram</label>
          <input
            type="text"
            id="instagram"
            name="instagram"
            value={formData.instagram}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="facebook">Facebook</label>
          <input
            type="text"
            id="facebook"
            name="facebook"
            value={formData.facebook}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="linkedin">LinkedIn</label>
          <input
            type="text"
            id="linkedin"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}
