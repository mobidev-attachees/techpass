"use client";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import './profile.css';
import Profille from '../components/Profille';
import Image from "next/image";

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
  // Set sidebar to be hidden by default
  const [sidebarActive, setSidebarActive] = useState(true); // Sidebar hidden on load
  const [collapseActive, setCollapseActive] = useState({
    homeSubmenu: false,
    pageSubmenu: false,
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [totalEvents, setTotalEvents] = useState(0); // State to store total events

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  // Function to handle collapse of sidebar submenus
  const toggleCollapse = (menu) => {
    setCollapseActive({
      ...collapseActive,
      [menu]: !collapseActive[menu],
    });
  };

  // Function to toggle dropdown in navbar
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Fetch total number of events from API
  const fetchTotalEvents = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from local storage
      if (!token) {
        console.error("No token found in local storage");
        return;
      }

      const response = await fetch("/api/Events/getEvents", {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token to the API
        },
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setTotalEvents(data.totalEvents); // Set total events from API response
      } else {
        console.error("Failed to fetch events:", data.message);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Call fetchTotalEvents when component mounts
  useEffect(() => {
    fetchTotalEvents(); // Fetch total events when the component mounts
  }, [])
  

  return (
    <div className={`wrapper ${sidebarActive ? "sidebar-active" : ""}`}>
      {/* Sidebar */}
      <nav id="sidebar" className={sidebarActive ? "active" : ""}>
        <div id="dismiss"  title=" Close menu" onClick={toggleSidebar}>
          <i class="fa fa-times" aria-hidden="true"></i>
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
              <li className="py-1 my-1"><a href="/evnts"><i class="fas fa-calendar" aria-hidden="true"></i> All events</a></li>
              <li className="py-1 my-1"><a href="/createevnt">Add event</a></li>
              
            </ul>
          </li>
          <li className="py-2 my-2 "><a href="#">Profile</a></li>
          <li className={collapseActive.pageSubmenu ? "active" : ""}>
            <a
              href="#pageSubmenu"
              onClick={() => toggleCollapse("pageSubmenu")}
              aria-expanded={collapseActive.pageSubmenu}
              className="dropdown-toggle"
            >
              Pages
            </a>
            <ul
              className={`collapse list-unstyled ${collapseActive.pageSubmenu ? "show" : ""}`}
              id="pageSubmenu"
            >
              <li><a href="#">Page 1</a></li>
              <li><a href="#">Page 2</a></li>
              <li><a href="#">Page 3</a></li>
            </ul>
          </li>
          <li><a href="#">Portfolio</a></li>
          <li><a href="#">Contact</a></li>
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
              className="btn"
              onClick={toggleSidebar}
            >
             <i class="fa fa-bars" aria-hidden="true"></i>
            </button>
            

            {/* Profile and Dropdown */}
            <div className="ml-auto d-flex align-items-center">
              <div className="dropdown">
                <button
                  className="btn dropdown-toggle"
                  id="profileDropdown"
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                  onClick={toggleDropdown}
                >
                  <img
                    src="/favicon.jpeg" // Placeholder for profile image
                    alt="Profile"
                    className="rounded-circle"
                    style={{ width: "40px", height: "40px" }}
                  />
                </button>
                <div
                  className={`dropdown-menu dropdown-menu-right ${dropdownOpen ? "show" : ""}`}
                  aria-labelledby="profileDropdown"
                >
                  <a className="dropdown-item" href="#">
                    Profile
                  </a>
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    Logout
                  </a>
                </div>
              </div>
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
