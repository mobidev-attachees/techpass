// src/app/profile/page.js
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Calendar } from 'react-bootstrap-icons';
import toast from "react-hot-toast";
import 'boxicons/css/boxicons.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const Spinner = dynamic(() => import('../components/Spinner'), { ssr: false });
const Toaster = dynamic(() => import('react-hot-toast').then(mod => mod.Toaster), { ssr: false });

function ProfileContent() {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEvents, setTotalEvents] = useState(0); // State for total number of events
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
          setTotalPages(Math.ceil(eventsData.totalEvents / 10)); // Assuming 10 events per page
          setTotalEvents(eventsData.totalEvents); // Set total number of events
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
          setTotalEvents(totalEvents - 1); // Decrease the total number of events
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
    return <div className="d-flex justify-content-center"><Spinner /></div>;
  }

  
  

  return (
    <div className="container">
      <main className="">
      <Toaster />
      <div className="ps-3">
						<nav aria-label="breadcrumb ">
							<ol className="breadcrumb mb-0 p-0 ">
								<li className="breadcrumb-item"><a href="javascript:;"></a>
								</li>
								<li className="breadcrumb-item active text-success fs-6 text-uppercase" aria-current="page"><strong>User Dashboard</strong></li>
							</ol>
						</nav>
					</div>                
                <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4">
                  <div className="col mt-3 mb-2 ">
                    <div className="card radius-10 border-start border-0 border-4 border-info">
                      <div className="card-body  rounded shadow  bg-white">
                        <div className="d-flex align-items-center">
                          <div className="">
                            <p className="mb-0 text-secondary">Total Events</p>
                            <h4 className="my-1 text-info">{totalEvents}</h4>
                            <p className="mb-0 font-13">All your events</p>
                          </div>
                          <div className="widgets-icons-2 rounded-circle bg-gradient-blues ms-auto" style={{ background: 'linear-gradient(to right, #66d2e1,#66d2e1)' }}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="80" // Adjusted width
                            height="80" // Adjusted height
                            viewBox="0 0 24 27" // Original viewBox
                            style={{ fill: 'rgba(255, 255, 255, 1)' }} // Solid black color
                            >
                            <path d="M21 20V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2zM9 18H7v-2h2v2zm0-4H7v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm2-5H5V7h14v2z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col mt-3 mb-2">
                    <div className="card radius-10 border-start border-0 border-4 border-danger">
                      <div className="card-body rounded shadow  bg-white">
                        <div className="d-flex align-items-center">
                          <div>
                            <p className="mb-0 text-secondary">Click rate</p>
                            <h4 className="my-1 text-danger">$84,245</h4>
                            <p className="mb-0 font-13">Average clicks</p>
                          </div>
                          <div className="widgets-icons-2 rounded-circle  text-white ms-auto" style={{ background: 'linear-gradient(to right,  #00c6ff, #0072ff)' }}>
                            
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="80"
                              height="80"
                              viewBox="0 0 20 30"
                              style={{ fill: 'rgba(255, 255, 255, 1)' }} // Solid black color
                            >
                              <path d="M3 3v17a1 1 0 0 0 1 1h17v-2H5V3H3z" />
                              <path d="M15.293 14.707a.999.999 0 0 0 1.414 0l5-5-1.414-1.414L16 12.586l-2.293-2.293a.999.999 0 0 0-1.414 0l-5 5 1.414 1.414L13 12.414l2.293 2.293z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col mt-3 mb-2">
                    <div className="card radius-10 border-start border-0 border-4 border-success">
                      <div className="card-body rounded shadow  bg-white">
                        <div className="d-flex align-items-center">
                          <div>
                            <p className="mb-0 text-secondary">Followers</p>
                            <h4 className="my-1 text-success">34.6k</h4>
                            <p className="mb-0 font-13">All followers</p>
                          </div>
                          <div className="widgets-icons-2 rounded-circle bg-gradient-ohhappiness text-white ms-auto bg-success " style={{ background: 'linear-gradient(to right, #009B77, #56ab2f, #E2D200)' }}>
                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="80" // Adjusted width
                              height="80" // Adjusted height
                              viewBox="0 0 24 25" // Original viewBox
                              style={{ fill: 'rgba(255, 255, 255, 1)' }} // Solid black color
                            >
                              <path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col mt-3 mb-2">
                    <div className="card radius-10 border-start border-0 border-4 border-warning">
                      <div className="card-body rounded shadow  bg-white">
                        <div className="d-flex align-items-center">
                          <div>
                            <p className="mb-0 text-secondary">All attending</p>
                            <h4 className="my-1 text-warning">8.4K</h4>
                            <p className="mb-0 font-20"><a href="/events" className="text-decoration-none text-dark" title="see all events">See events</a></p>
                          </div>
                          <div className="widgets-icons-2 rounded-circle ms-auto" style={{ background: 'linear-gradient(to right, #ff7f50, #ff8c00, #ffa500)' }}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="80" // Adjusted width
                              height="80" // Adjusted height
                              viewBox="0 0 24 27" // Original viewBox
                              style={{ fill: 'rgba(255, 255, 255, 1)' }} // Solid black color
                            >
                              <path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zm6-3.586-3.707-3.707 1.414-1.414L11 15.586l4.293-4.293 1.414 1.414L11 18.414zM5 7h14v2H5V7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card radius-10 mt-3 mb-3 shadow-sm bg-white border-0">
      <div className="card-header">
        <div className="d-flex align-items-center">
          <div>
            <h6 className="mb-0 text-success">Events</h6>
          </div>
          <div className="dropdown ms-auto">
            <a
              className="dropdown-toggle dropdown-toggle-nocaret"
              href="#"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bx bx-dots-horizontal-rounded font-22 text-option"></i>
            </a>
            <ul className="dropdown-menu rounded shadow">
              <li>
                <a className="dropdown-item" href="/events">
                  Browse all events
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/dashboard">
                  Manage your events
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="/createevent">
                  Add new event
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Event Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Ticket Price</th>
              </tr>
            </thead>
            <tbody>
            {events.map((event, index) => (
              <tr>
                <td className="fs-5 text-capitalize">{event.eventName}</td>
                <td>{formatDate(event.startDate)}</td>
                <td>{formatDate(event.endDate)}</td>
                <td>
                  <span className="badge  text-white shadow-sm w-100" style={{ background: 'linear-gradient(to right, #11998e, #38ef7d)'}}>
                  {event.ticketPrice}
                  </span>
                </td>
                
              </tr>
            ))}
            </tbody>
          </table>
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