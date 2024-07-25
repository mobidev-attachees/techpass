"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

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

export default function Profile() {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

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
    <div className="card">
      <div className="card-body">
        <div className="table-responsive">
          <div id="example_wrapper" className="dataTables_wrapper dt-bootstrap5">
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <div className="dataTables_length" id="example_length">
                  <label>
                    Show{' '}
                    <select
                      name="example_length"
                      aria-controls="example"
                      className="form-select form-select-sm"
                    >
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>{' '}
                    entries
                  </label>
                </div>
              </div>
              <div className="col-sm-12 col-md-6">
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
                  style={{ width: '100%' }}
                  role="grid"
                  aria-describedby="example_info"
                >
                  <thead>
                    <tr role="row">
                      <th className="sorting_asc" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{ width: '106px' }}>Name</th>
                      <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Position: activate to sort column ascending" style={{ width: '170px' }}>Position</th>
                      <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Office: activate to sort column ascending" style={{ width: '73px' }}>Office</th>
                      <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Age: activate to sort column ascending" style={{ width: '27px' }}>Age</th>
                      <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Start date: activate to sort column ascending" style={{ width: '67px' }}>Start date</th>
                      <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Salary: activate to sort column ascending" style={{ width: '52px' }}>Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event, index) => (
                      <tr key={index} role="row" className={index % 2 === 0 ? 'even' : 'odd'}>
                        <td className="sorting_1">{event.name}</td>
                        <td>{event.position}</td>
                        <td>{event.office}</td>
                        <td>{formatDate(event.endDate)}</td>
                        <td>{formatDate(event.startDate)}</td>
                        <td>{event.salary}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th rowSpan="1" colSpan="1">Name</th>
                      <th rowSpan="1" colSpan="1">Position</th>
                      <th rowSpan="1" colSpan="1">Office</th>
                      <th rowSpan="1" colSpan="1">Age</th>
                      <th rowSpan="1" colSpan="1">Start date</th>
                      <th rowSpan="1" colSpan="1">Salary</th>
                    </tr>
                  </tfoot>
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
                      <button aria-controls="example" data-dt-idx="0" tabIndex="0" className="page-link" onClick={handlePrevPage}>Prev</button>
                    </li>
                    <li className="paginate_button page-item active">
                      <button aria-controls="example" data-dt-idx="1" tabIndex="0" className="page-link">{currentPage}</button>
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
  );
}
