// src/app/profile.js
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import toast, { Toaster } from 'react-hot-toast';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleDelete = async (eventId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login?message=You are not logged in. Please log in first.');
      return;
    }

    if (confirm('Are you sure you want to delete this event?')) {
      try {
        const response = await fetch(`/api/events/deleteEvent/${eventId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          toast.success("Event deleted successfully", {
            duration: 4000,
            position: 'top-right',
            style: {
              background: '#4caf50',
              color: '#ffffff',
              zIndex: 99999,
            },
          });
          // Remove the event from the state
          setEvents(events.filter(event => event.id !== eventId));
        } else {
          const errorData = await response.json();
          setError(errorData.message);
          if (response.status === 401) {
            router.push('/login?message=You are not logged in. Please log in first.');
          }
        }
      } catch (error) {
        console.error('Delete event error:', error);
        setError('An error occurred while deleting the event');
      }
    }
  };

  const handleEdit = (eventId) => {
    router.push(`/editEvent/${eventId}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    const daySuffix = (d) => {
      if (d > 3 && d < 21) return 'th';
      switch (d % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };

    return `${day}${daySuffix(day)} ${month} ${year}`;
  };

  useEffect(() => {
    const fetchProfileAndEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login?message=You are not logged in. Please log in first.');
          return;
        }

        // Fetch user profile
        const profileResponse = await fetch('/api/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!profileResponse.ok) {
          const errorData = await profileResponse.json();
          setError(errorData.message);
          if (profileResponse.status === 401) {
            router.push('/login?message=You are not logged in. Please log in first.');
          }
          return;
        }

        const profileData = await profileResponse.json();
        setUser(profileData);

        // Fetch user events with pagination and search
        const eventsResponse = await fetch(`/api/events/getEvents?page=${currentPage}&search=${searchQuery}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!eventsResponse.ok) {
          const errorData = await eventsResponse.json();
          setError(errorData.message);
          if (eventsResponse.status === 401) {
            router.push('/login?message=You are not logged in. Please log in first.');
          }
          return;
        }

        const eventsData = await eventsResponse.json();
        setEvents(eventsData.events);
        setTotalPages(Math.ceil(eventsData.total / 10)); // Assuming 10 events per page
      } catch (error) {
        console.error('Profile fetch error:', error);
        setError('An error occurred while fetching profile and events');
      }
    };

    fetchProfileAndEvents(); 
  }, [router, currentPage, searchQuery]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }


  return (
    <div className="d-flex">
      {/* Sidebar for large screens */}
      <div className="d-none d-md-flex flex-column flex-shrink-0 p-3 text-white bg-success" style={{ width: '280px' }}>
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <img src="favicon.jpeg" alt="" width="32" height="32" className="rounded-circle me-2" />
          <span className="fs-4">Techpass</span>
        </a>
        <hr />
        <div className="dropdown">
          <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
            <strong>{user.username}</strong>
          </a>
          <ul className="dropdown-menu dropdown-menu text-small shadow" aria-labelledby="dropdownUser1">
            <li><a className="dropdown-item" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
            </svg> Edit Profile</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" onClick={handleLogout}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill-dash" viewBox="0 0 16 16">
              <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M11 12h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1m0-7a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
              <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
            </svg> Sign out</a></li>
          </ul>
        </div>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item text-white">
            <a href="/" className="nav-link text-white" aria-current="page">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"/>
              <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"/>
            </svg> Home
            </a>
          </li>
          <li>
            <a href="/dashboard" className="nav-link text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-speedometer" viewBox="0 0 16 16">
              <path d="M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2M3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.39.39 0 0 0-.029-.518z"/>
              <path fill-rule="evenodd" d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.95 11.95 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0"/>
            </svg> Dashboard
            </a>
          </li>
        </ul>
        <hr />
        
      </div>

      {/* Sidebar toggle for small screens */}
      <div className="d-md-none">
        <nav className="navbar navbar-light bg-success">
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="sidebar">
            <span className="navbar-toggler-icon"></span>
          </button>
        </nav>
        <div className="offcanvas offcanvas-start bg-success text-white" tabindex="-1" id="sidebar" aria-labelledby="sidebarLabel">
          <div className="offcanvas-header">
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
              <img src="favicon.jpeg" alt="" width="32" height="32" className="rounded-circle me-2" />
                <span className="fs-4">Techpass</span>
            </a>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="dropdown">
            <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
              <strong>{user.username}</strong>
            </a>
            <ul className="dropdown-menu dropdown-menu text-small shadow" aria-labelledby="dropdownUser1">
              <li><a className="dropdown-item" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
              </svg> Edit Profile</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" onClick={handleLogout}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill-dash" viewBox="0 0 16 16">
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M11 12h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1m0-7a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
              </svg> Sign out</a></li>
            </ul>
        </div>
          <div className="offcanvas-body">
            <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item text-white">
            <a href="/" className="nav-link text-white" aria-current="page">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"/>
              <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"/>
            </svg> Home
            </a>
          </li>
          <li>
            <a href="/dashboard" className="nav-link text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-speedometer" viewBox="0 0 16 16">
              <path d="M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2M3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.39.39 0 0 0-.029-.518z"/>
              <path fill-rule="evenodd" d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.95 11.95 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0"/>
            </svg> Dashboard
            </a>
          </li>
            </ul>
          </div>
        </div>
      </div>

      <main className="flex-grow-1 p-3">
        <div className="pt-3">
        <Toaster />
          <h2 className="text-primary">Profile</h2>
          <div className="">
            <div className="">
              
              <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
                <div className="container py-5 h-100">
                  <div className="row d-flex justify-content-start align-items-center h-100">
                    <div className="col col-lg-8 mb-4 mb-lg-0">
                      <div className="card mb-3" style={{ borderRadius: '.5rem' }}>
                        <div className="row g-0">
                          <div
                            className="col-md-4 gradient-custom text-center text-white bg-success align-items-center mt"
                            style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem', background: '' }}
                          >
                          <div className="media-img media--img media-img-md rounded-full mt-5">
                              <img
                                className="rounded-full rounded-circle"
                                src="/avatar-2.png"
                                alt="Student thumbnail image"
                              />
                            </div>
                            <h5>{user.username} {user.lastName}</h5>
                            <p>Web Designer</p>
                          </div>
                          <div className="col-md-8">
                            <div className="card-body p-4">
                              <h6> Personal Info</h6>
                              <hr className="mt-0 mb-4" />
                              <div className="row pt-1">
                                <div className="col-6 mb-3">
                                  <h6>Email</h6>
                                  <p className="text-muted">{user.email}</p>
                                </div>
                                <div className="col-6 mb-3">
                                  <h6>Phone</h6>
                                  <p className="text-muted">{ user.phoneNumber}</p>
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
              <div className="card">
                <div className="card-body">
                <h4 className="text-center text-success">Your Events</h4>
                  <div className="table-responsive">
                    <div id="example_wrapper" className="dataTables_wrapper dt-bootstrap5">
                      <div className="row">
                        <div className="col-sm-12 col-md-6 mb-3">
                          <div id="example_filter" className="dataTables_filter">
                            <label>
                              Search:
                              <input
                                type="search"
                                className="form-control form-control-sm"
                                placeholder=""
                                aria-controls="example"
                                value={searchQuery}
                                onChange={handleSearchChange}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                          <table
                            id="example"
                            className="table table-striped table-bordered dataTable"
                            
                            role="grid"
                            aria-describedby="example_info"
                          >
                            <thead>
                              <tr role="row">
                                <th className="sorting_asc" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{ width: '106px' }}>Event name</th>
                                <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Position: activate to sort column ascending" style={{ width: '170px' }}>Start Date</th>
                                <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Office: activate to sort column ascending" style={{ width: '73px' }}>End Date</th>
                                <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Age: activate to sort column ascending" style={{ width: '27px' }}>Event Ticket</th>
                                <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Start date: activate to sort column ascending" style={{ width: '67px' }}>Action</th>
                              </tr>
                            </thead>
                            <tbody>
  {events.map((event, index) => (
    <tr key={event.id} role="row" className={index % 2 === 0 ? 'even' : 'odd'}>
      <td className="sorting_1">{event.eventName}</td>
      <td>{formatDate(event.startDate)}</td>
      <td>{formatDate(event.endDate)}</td>
      <td>{event.ticketPrice}</td>
      <td className="d-flex justify-content-evenly">
        <button
          type="button"
          className="btn btn-danger px-2"
          onClick={() => handleDelete(event.id)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
          </svg>
        </button>
        <button
          type="button"
          className="btn btn-success px-2"
          onClick={() => handleEdit(event.id)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
          </svg>
        </button>
      </td>
    </tr>
  ))}
</tbody>

                          </table>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12 col-md-5">
                          <div className="dataTables_info" id="example_info" role="status" aria-live="polite">
                            Showing {(currentPage - 1) * 10 + 1} to {Math.min(currentPage * 10, events.length)} of {events.length} entries
                          </div>
                        </div>
                        <div className="col-sm-12 col-md-7">
                          <div className="dataTables_paginate paging_simple_numbers" id="example_paginate">
                            <ul className="pagination">
                              <li className={`paginate_button page-item previous ${currentPage === 1 ? 'disabled' : ''}`} id="example_previous">
                                <button aria-controls="example" data-dt-idx="0" tabIndex="0" className="page-link" onClick={handlePrevPage}>Previous</button>
                              </li>
                              <li className={`paginate_button page-item next ${currentPage === totalPages ? 'disabled' : ''}`} id="example_next">
                                <button aria-controls="example" data-dt-idx="1" tabIndex="0" className="page-link" onClick={handleNextPage}>Next</button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
