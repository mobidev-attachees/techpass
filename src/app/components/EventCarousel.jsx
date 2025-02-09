import { useEffect, useState } from "react";
import Image from 'next/image';


const EventCarousel = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events/getAllEvents?limit=6&page=1");
        if (!res.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await res.json();
        setEvents(data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to load events");
      }
    };

    fetchEvents();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  

  return (
    <div id="eventCarousel" className="carousel slide carousel-dark" data-bs-ride="carousel">
  {/* Carousel Indicators */}
  <ol className="carousel-indicators">
    {events.map((_, index) => (
      <li
        key={index}
        data-bs-target="#eventCarousel"
        data-bs-slide-to={index}
        className={index === 0 ? "active" : ""}
      ></li>
    ))}
  </ol>

  {/* Carousel Inner */}
  <div className="carousel-inner">
    {events.map((event, index) => (
      <div
        key={event.id}
        className={`carousel-item ${index === 0 ? "active" : ""}`}
        data-bs-interval={index === 0 ? "10000" : "2000"}
      >
        <div className="row align-items-end">
          {/* Caption Section */}
          <div className="flex-column col-md-4 col-sm-2 carousel-caption text-start position-absolute bottom-0 start-0 p-2 text-dark">
            <div
              className="p-3"
              style={{
                whiteSpace: "normal",
                wordWrap: "break-word",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                backdropFilter: "blur(0.05px)",
                borderRadius: "2.5px",
              }}
            >
              <h5 className="text-white"><strong>{event.eventName}</strong></h5>
              <p>
                {event.eventDescription.split(" ").slice(0, 7).join(" ")}
                {event.eventDescription.split(" ").length > 7 && "..."}
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="col-md-8 py-3 my-3 p-2">
            <Image
              src={event.imageUrl || "/placeholder.jpg"}
              className="d-block w-100 rounded"
              alt={event.eventName}
              style={{ objectFit: "cover", height: "300px" }}
            />
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* Previous and Next Buttons */}
  <a
    className="carousel-control-prev"
    href="#eventCarousel"
    role="button"
    data-bs-slide="prev"
  >
    <span
      className="carousel-control-prev-icon"
      aria-hidden="true"
      style={{ filter: "invert(1)" }}
    ></span>
    <span className="visually-hidden">Previous</span>
  </a>
  <a
    className="carousel-control-next"
    href="#eventCarousel"
    role="button"
    data-bs-slide="next"
  >
    <span
      className="carousel-control-next-icon"
      aria-hidden="true"
      style={{ filter: "invert(1)" }}
    ></span>
    <span className="visually-hidden">Next</span>
  </a>
</div>

  

  );
};

export default EventCarousel;
