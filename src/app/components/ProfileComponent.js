// src/app/profile/page.js
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Calendar } from 'react-bootstrap-icons';
import toast from "react-hot-toast";
import 'boxicons/css/boxicons.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from "next/image";


const Spinner = dynamic(() => import('../components/Spinner'), { ssr: false });
const Toaster = dynamic(() => import('react-hot-toast').then(mod => mod.Toaster), { ssr: false });

function ProfileComponent() {
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
    <div className="col-12 col-lg-8 col-xl-6 d-flex shadow-sm bg-white">
    <div className="card w-100 radius-10 border-0">
      <div className="card-body">
        <div className="card radius-10  border-start border-0 border-4 border-success shadow-sm bg-white mt-3 mb-3">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <div>
              <h3> Personal info</h3>
                <p className="mb-0 text-success">Name: {user.firstName} {user.lastName}</p>
                <h4 className="my-1 text-success">{user.email}</h4>
                <p className="mb-0 font-13 text-success">{user.phoneNumber}</p>
              </div>
              <div className="widgets-icons-2 bg-gradient-cosmic text-dark ms-auto">
              <img 
                    src={user?.profileImage || '/uploads/profiles/default-image.jpg'} 
                    alt="User profile" 
                    width="100" 
                    height="100" 
                    className="rounded-circle me-2" 
                  />
              </div>
            </div>
          </div>
        </div>
        <div className="card radius-10 shadow-sm border-start border-0 border-4 border-info mt-3 mb-3 bg-white"> 
          <div className="card-body">
            <div className="d-flex align-items-center flex-wrap">
              <div className="d-flex flex-column" style={{ width: '100%' }}>
                <h4 className="mb-0 text-secondary">Bio:</h4>
                <p className="mb-0 font-13 text-wrap" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{user.bio}</p>
              </div>

              
            </div>
          </div>
        </div>

        <div className="card radius-10 mb-0  border-start border-0 border-4 border-warning shadow-sm bg-white">
          <div className="card-body">
            <div className="d-flex align-items-center">
            <div className="row row-cols-auto g-3">
                  <div className="col">
                    <a type="button" className="btn btn-success" href="/editprofile">
                      Edit profile 
                    </a>
                  </div>
                  {/* <div className="col">
                    <button type="button" className="btn btn-danger">
                      Notifications 
                    </button>
                  </div>
                  <div className="col">
                    <button type="button" className="btn btn-success">
                      Notifications 
                    </button>
                  </div>
                  <div className="col">
                    <button type="button" className="btn btn-warning">
                      Notifications 
                    </button>
                  </div>
                  <div className="col">
                    <button type="button" className="btn btn-info">
                      Notifications 
                    </button>
                  </div>
                  <div className="col">
                    <button type="button" className="btn btn-dark">
                      Notifications <span className="badge bg-secondary">4</span>
                    </button>
                  </div> */}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
}
export default ProfileComponent;