import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const EventDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchEvent = async () => {
        try {
          const response = await fetch(`/api/events/getEventById?id=${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch event");
          }
          const data = await response.json();
          setEvent(data);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchEvent();
    }
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!event) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{event.eventName}</h1>
      <p>Date: {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}</p>
      <p>Location: {event.location}</p>
      <p>Time: {event.time}</p>
      <p>Ticket Price: {event.ticketPrice}</p>
      <p>Description: {event.description}</p>
    </div>
  );
};

export default EventDetails;
