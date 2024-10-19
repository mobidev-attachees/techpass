//src/app/profile/page.js
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Calendar } from 'react-bootstrap-icons';
import toast from "react-hot-toast";

const Spinner = dynamic(() => import('../components/Spinner'), { ssr: false });
const Toaster = dynamic(() => import('react-hot-toast').then(mod => mod.Toaster), { ssr: false });

function ProfileContent() {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchProfileAndEvents = async () => {
      if (typeof window !== "undefined") {
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
            if (profileResponse.status === 401) {
              router.push('/login?message=You are not logged in. Please log in first.');
            } else {
              setError(errorData.message);
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
            if (eventsResponse.status === 401) {
              router.push('/login?message=You are not logged in. Please log in first.');
            } else {
              setError(errorData.message);
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
      }
    };

    fetchProfileAndEvents();
  }, [router, currentPage, searchQuery]);

  const handleDelete = async (eventId) => {
    const token = typeof window !== "undefined" && localStorage.getItem('token');
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
    if (typeof window !== "undefined") {
      router.push(`/editEvent/${eventId}`);
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem('token');
      router.push('/login');
    }
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

  if (error) {
    return (
      <div className="alert alert-danger">
        {error.includes('login') ? (
          router.push('/login?message=You are not logged in. Please log in first.')
        ) : (
          error
        )}
      </div>
    );
  }

  if (!user) {
    return <div className=" d-flex justify-content-center">
    <Spinner />
    </div>;
  }
  return (
    <div className="d-flex">
      <main className="flex-grow-1 p-3">
        <div className="pt-3">
        <Toaster />
          <h2 className="text-success">Profile</h2>
                <div className="container  h-100">
                  <div className="row d-flex justify-content-start align-items-center h-100">
                    <div className="col col-lg-8 mb-lg-0">
                      <div className="card mb-3" style={{ borderRadius: '.5rem' }}>
                        <div className="row g-0">
                          <div
                            className="col-md-4 gradient-custom text-center text-white bg-success align-items-center mt"
                            style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem', background: '' }}
                          >
                          <div className="media-img media--img media-img-md rounded-full mt-5">
                              <img
                                className="rounded-full rounded-circle"
                                src={user.profileImage || '/uploads/profiles/default-image.jpg'}
                                alt="Student thumbnail image"
                                width={100}
                                height={100}
                              />
                            </div>
                            <h5>{user.username} {user.lastName}</h5>
                            <p>Web Designer</p>
                          </div>
                          <div className="col-md-8">
                            <div className="card-body p-4">
                              <h5 className="text-success"> Personal Info</h5>
                              
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
                              <hr className="mt-0 mb-4" />                             
                              <div className="row d-flex">
                                <div className="col-6 mb-3">
                                  <div className="radius-10 shadow">
                                    <div className="card-body">
                                      <div className="d-flex align-items-center">
                                        <div 
                                          className="rounded-circle p-1 border d-flex justify-content-center align-items-center"
                                          style={{ width: '30px', height: '30px' }}
                                        >
                                          {/* <Calendar size={70} /> */}
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                          <p className="mt-0">Media heading</p>
                                          <p className="mb-0">lorem</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-6 mb-3">
                                  <div className="radius-10 shadow">
                                    <div className="card-body">
                                      <div className="d-flex align-items-center">
                                        <div 
                                          className="rounded-circle p-1 border d-flex justify-content-center align-items-center"
                                          style={{ width: '50px', height: '50px' }}
                                        >
                                          <Calendar size={70} />
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                          <p className="mt-0 text-success">Total events</p>
                                          <p className="mb-0">lorem</p>
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
                    </div>
                  </div>
                </div>
                <div className="container py-5 h-100 rounded shadow-sm card">
              
                <h6 className="text-primary">Events</h6>
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
                        <div className="col-12">
                          <div className="table-responsive">
                            <table
                              id="example"
                              className="table table-striped table-bordered"
                              role="grid"
                              aria-describedby="example_info"
                            >
                              <thead>
                                <tr role="row">
                                  <th
                                    className="sorting_asc"
                                    tabIndex="0"
                                    aria-controls="example"
                                    rowSpan="1"
                                    colSpan="1"
                                    aria-sort="ascending"
                                    aria-label="Name: activate to sort column descending"
                                    style={{ width: '106px' }}
                                  >
                                    Event Name
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex="0"
                                    aria-controls="example"
                                    rowSpan="1"
                                    colSpan="1"
                                    aria-label="Start Date: activate to sort column ascending"
                                    style={{ width: '200px' }}
                                  >
                                    Start Date
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex="0"
                                    aria-controls="example"
                                    rowSpan="1"
                                    colSpan="1"
                                    aria-label="End Date: activate to sort column ascending"
                                    style={{ width: '27px' }}
                                  >
                                    End Date
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex="0"
                                    aria-controls="example"
                                    rowSpan="1"
                                    colSpan="1"
                                    aria-label="Event Ticket: activate to sort column ascending"
                                    style={{ width: '27px' }}
                                  >
                                    Event Ticket
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex="0"
                                    aria-controls="example"
                                    rowSpan="1"
                                    colSpan="1"
                                    aria-label="Action: activate to sort column ascending"
                                    style={{ width: '67px' }}
                                  >
                                    Action
                                  </th>
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
                                        className="btn btn-danger btn-sm px-2"
                                        title="Delete this event"
                                        onClick={() => handleDelete(event.id)}
                                      >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                        </svg>
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-success btn-sm px-2"
                                        title="edit event"
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
      </main>
    </div>
  );
}
export default function Profile() {
  return (
      <ProfileContent />
    
  );
}