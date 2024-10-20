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

function Eventts() {
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

  return(
    <div className="card border-0 mt-4 mb-4 shadow bg-white">
      <div className="card-body">
        <div className="d-lg-flex align-items-center mb-4 gap-3">
          <div className="position-relative">
            <input
              type="text"
              className="form-control ps-5 radius-30"
              placeholder="Search Event"
            
            aria-controls="example"
            value={searchQuery}
            onChange={handleSearchChange}
            />
          </div>
          <div className="ms-auto">
            <button className="btn btn-success radius-30 mt-2 mt-lg-0">
              <i className="bx bxs-plus-square"></i> Add New Event
            </button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table mb-0">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Event Name</th>
                <th>Event Ticket</th>
                <th>Event Banner</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Details</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
            {events.map((event, index) => (
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div>
                      <input
                        className="form-check-input me-3"
                        type="checkbox"
                        value=""
                        aria-label="..."
                      />
                    </div>
                    <div className="ms-2">
                      <h6 className="mb-0 font-14">#</h6>
                    </div>
                  </div>
                </td>
                <td className="text-capitalize">{event.eventName}</td>
                <td>
                <span className="badge  text-white shadow-sm w-100" style={{ background: 'linear-gradient(to right, #11998e, #38ef7d)'}}>
                  {event.ticketPrice}
                  </span>
                </td>
                <td>
                  <img
                    src={event.imageUrl || '/uploads/default-image.jpg'}
                    className="product-img-2 rounded"
                    alt="product"
                    width={80}
                    height={30}
                  />
                </td>
                <td>{formatDate(event.startDate)}</td>
                <td>{formatDate(event.endDate)}</td>
                <td>
                    <a
                        className="btn btn-info btn-sm radius-30 px-4"
                        href={`/event/${event.id}`}
                    >
                        Details
                    </a>
                 </td>

                <td>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm radius-30 px-4"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-warning btn-sm radius-30 px-4"
                    onClick={() => handleEdit(event.id)}
                  >
                   Edit
                  </button>
                </td>
                
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        <div className="row mt-2 mb-2">
            <div className="col-sm-12 col-md-5">
                <div className="dataTables_info" id="example_info" role="status" aria-live="polite">
                    Showing {(currentPage - 1) * 10 + 1} to {Math.min(currentPage * 10, events.length)} of {events.length} entries
                </div>
            </div>                
        </div>
      </div>
    </div>

                
  );
}
  export default Eventts;