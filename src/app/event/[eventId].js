// pages/event/[eventId].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const EventPage = () => {
  const router = useRouter();
  const { eventId } = router.query;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (eventId) {
      const fetchEvent = async () => {
        try {
          const response = await fetch(`/api/events/${eventId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch event');
          }
          const data = await response.json();
          setEvent(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchEvent();
    }
  }, [eventId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!event) {
    return <p>No event found</p>;
  }

  return (
    <div>
      <h1>{event.eventName}</h1>
      <p>{new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}</p>
      <p>{event.location}</p>
      <p>{event.ticketPrice}</p>
      <p>{event.description}</p>
    </div>
  );
};

export default EventPage;
