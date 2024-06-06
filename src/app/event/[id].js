// pages/event/[eventId].js
"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EventPage() {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/events/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            setError(data.message);
          } else {
            setEvent(data);
          }
          setLoading(false);
        })
        .catch((err) => {
          setError('Failed to fetch event');
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {event ? (
        <>
          <h1>{event.eventName}</h1>
          <p>{event.eventDescription}</p>
          <p>Location: {event.location}</p>
          <p>Country: {event.country}</p>
          <p>City: {event.city}</p>
          <p>Start Date: {new Date(event.startDate).toLocaleDateString()}</p>
          <p>End Date: {new Date(event.endDate).toLocaleDateString()}</p>
          <p>Start Time: {event.startTime}</p>
          <p>End Time: {event.endTime}</p>
          <p>Meeting Link: {event.meetingLink}</p>
          <p>Email: {event.email}</p>
          <p>Title: {event.tittle}</p>
          <p>Ticket Price: {event.ticketPrice}</p>
          <p>First Name: {event.firstName}</p>
          <p>Middle Name: {event.middleName}</p>
          <p>Last Name: {event.lastName}</p>
          <p>Phone Number: {event.phoneNumber}</p>
          <p>Website: {event.websiteLink}</p>
          <p>Facebook: {event.facebookLink}</p>
          <p>Instagram: {event.instagramLink}</p>
          <p>Twitter: {event.twitterLink}</p>
        </>
      ) : (
        <p>No event found</p>
      )}
    </div>
  );
}

