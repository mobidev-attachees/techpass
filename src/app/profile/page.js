"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import './profile.css';
import Profille from '../components/Profille';
import Image from "next/image";
import toast from "react-hot-toast";

function PageComponent({ totalEvents }) {
  return (
    <div className="sample-component container">
      <div className="">
        <Profille />
      </div>
    </div>
  );
}

function Profile() {
  // State for sidebar visibility, collapse, and dropdown
  const [sidebarActive, setSidebarActive] = useState(true);
  const [collapseActive, setCollapseActive] = useState({
    homeSubmenu: false,
    pageSubmenu: false,
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // State for authentication, user info, and total events
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [totalEvents, setTotalEvents] = useState(0);
  
  const router = useRouter();

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  // Handle sidebar submenu collapse
  const toggleCollapse = (menu) => {
    setCollapseActive({
      ...collapseActive,
      [menu]: !collapseActive[menu],
    });
  };

  // Toggle dropdown in navbar
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Fetch total number of events from API
  const fetchTotalEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in local storage");
        return;
      }

      const response = await fetch("/api/Events/getEvents", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setTotalEvents(data.totalEvents);
      } else {
        console.error("Failed to fetch events:", data.message);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Fetch user profile from API
  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch('/api/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setIsLoggedIn(false);
      localStorage.removeItem('token');
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    toast.success("Logged out successfully", {
      duration: 4000,
      position: 'top-right',
      style: {
        background: '#4caf50',
        color: '#ffffff',
        zIndex: 99999,
      },
    });
    router.push('/login');
  };

  // Check authentication and fetch data when component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile(token);
      fetchTotalEvents();
    }
  }, []);
 
  

  return (
    <div className={`wrapper ${sidebarActive ? "sidebar-active" : ""}`}>
      {/* Sidebar */}
      <nav id="sidebar" className={sidebarActive ? "active" : ""}>
        <div id="dismiss"  title=" Close menu" onClick={toggleSidebar}>
          <i className="fa fa-times" aria-hidden="true"></i>
        </div>
        <div className="sidebar-header d-flex justify-content-center">
        <a className="navbar-brand" href="/"><Image src="/favicon.jpeg" width="60" height="60" alt="profile image" className='rounded-circle'></Image><h4>TechPass</h4></a>
          
        </div>
        <ul className="list-unstyled components rounded py-3 my-3">
          <li className={collapseActive.homeSubmenu ? "active" : ""}>
            <a
              href="#homeSubmenu"
              onClick={() => toggleCollapse("homeSubmenu")}
              aria-expanded={collapseActive.homeSubmenu}
              className="dropdown-toggle text-lg"
            >
             <i className="fa fa-bookmark" aria-hidden="true"></i> <strong>Manage Events</strong>
            </a>
            <ul
              className={`collapse list-unstyled ${collapseActive.homeSubmenu ? "show" : ""}`}
              id="homeSubmenu"
            >
              <li className="py-1 my-1"><a href="/dashboard"><i className="fas fa-calendar" aria-hidden="true"></i> Manage  your events</a></li>
              <li className="py-1 my-1"><a href="/createevent">Add event</a></li>
              
            </ul>
          </li>
          <li className="py-2 my-2 "><a href="/userProfile">Profile</a></li>
          </ul>
      </nav>

      {/* Page Content */}
      <div id="content" className={sidebarActive ? "sidebar-open" : ""}>
        {/* Top Navbar */}
        <nav className="navbar navbar-expand-lg  bg-white rounded shadow-sm">
          <div className="container-fluid">
            {/* Sidebar Toggler */}
            <button
              type="button"
              id="sidebarCollapse"
              className="btn text-sm"
              onClick={toggleSidebar}
            >
             <i className="fa fa-bars" aria-hidden="true"></i>
            </button>
            

            {/* Profile and Dropdown */}
            <div className="ml-auto d-flex align-items-center">
  {isLoggedIn ? (
    <div className="dropdown">
      <button
        className="btn dropdown-toggle"
        id="profileDropdown"
        aria-haspopup="true"
        aria-expanded={dropdownOpen}
        onClick={toggleDropdown}
      >
        <img
          src={user.profileImage || '/uploads/profiles/default-image.jpg'} // Display user's profile image or placeholder
          alt="Profile"
          className="rounded-circle"
          style={{ width: "40px", height: "40px" }}
        />
      </button>
      <div
        className={`dropdown-menu dropdown-menu-right ${dropdownOpen ? "show" : ""}`}
        aria-labelledby="profileDropdown"
      >
        <a className="dropdown-item" href="/userProfile">
          Profile
        </a>
        <div className="dropdown-divider"></div>
        <a className="dropdown-item" onClick={handleLogout}>
          Logout
        </a>
      </div>
    </div>
  ) : (
    <div className="d-flex">
      <a className="btn btn-link" href="/login">
        Login
      </a>
      <a className="btn btn-link" href="/register">
        Register
      </a>
    </div>
  )}
</div>

          </div>
        </nav>

        {/* Sample component displaying the total number of events */}
        <PageComponent />
      </div>
    </div>
  );
}

export default Profile;
