import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import toast from "react-hot-toast";
import './Sidebar.css'; // Assuming this file includes styles for the component

const Spinner = dynamic(() => import('../components/Spinner'), { ssr: false });
const Toaster = dynamic(() => import('react-hot-toast').then(mod => mod.Toaster), { ssr: false });

const Sidebar = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [activeLink, setActiveLink] = useState('Dashboard');
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

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleLinkClick = (name) => {
    setActiveLink(name);
  };

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
          toast.success("Event deleted successfully");
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem('token');
      router.push('/login');
    }
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

  return (
    <div id="body-pd" className={isSidebarVisible ? 'body-pd' : ''}>
      <header className={`header ${isSidebarVisible ? 'body-pd' : ''}`} id="header">
        <div className="header_toggle" onClick={toggleSidebar} id="header-toggle">
          {isSidebarVisible ? "Close" : "Menu"}
        </div>
        <div className="header_img">
          <img src="https://i.imgur.com/hczKIze.jpg" alt="Profile" />
        </div>
      </header>
      <div className={`l-navbar ${isSidebarVisible ? 'show' : ''}`} id="nav-bar">
        <nav className="nav">
          <div>
            <a href="#" className="nav_logo">
              <span className="nav_logo-name">TechPass</span>
            </a>
            <div className="nav_list">
              {['Dashboard', 'Users', 'Messages', 'Bookmark', 'Files', 'Stats'].map((name) => (
                <a
                  href="#"
                  key={name}
                  className={`nav_link ${activeLink === name ? 'active' : ''}`}
                  onClick={() => handleLinkClick(name)}
                >
                  {name}
                </a>
              ))}
            </div>
          </div>
          <a href="#" className="nav_link" onClick={handleLogout}>
            <span className="nav_name">SignOut</span>
          </a>
        </nav>
      </div>
      <div className="main-content">
        <h4>Profile and Events</h4>
        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="container">
            {!user ? (
              <Spinner />
            ) : (
                    <div className="row">
                        <div className="col-lg-12 rounded shadow-lg">
                            <div className="">
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

                    </div>
              
            )}
          </div>
        )}
        <Toaster />
      </div>
    </div>
  );
};

export default Sidebar;
