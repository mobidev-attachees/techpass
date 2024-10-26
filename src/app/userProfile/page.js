"use client";
import React from 'react';
import ProfileComponent from '../components/ProfileComponent';
import Navbar from '../components/Navbar';

function userProfile() {
  return (
    <div className="container">
    <div className="rounded shadow-sm mb-3 bg-white">
        <Navbar  />
    </div>
      <div >
      <ProfileComponent />
      </div>
    </div>
  );
}

export default userProfile;
