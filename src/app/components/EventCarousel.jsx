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
    <div id="eventCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {events.map((event, index) => (
            <div
              key={event.id}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
                <div className="row align-items-end ">
                  <div className="flex-column col-md-4 col-sm-2 carousel-caption text-start position-absolute bottom-0 start-0 p-2 text-dark">
                    
                      <div className="p-3" style={{
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                        backgroundColor: "rgba(255, 255, 255, 0.5)", // semi-transparent background
                        backdropFilter: "blur(0.05px)", // blur the background
                        borderRadius: "2.5px",

                      }}> 
                        <h5 className="text-white"><strong>{event.eventName}</strong></h5>
                        <p>
                          {event.eventDescription
                            .split(" ")
                            .slice(0, 7)
                            .join(" ")}
                          {event.eventDescription.split(" ").length > 7 && "..."}
                        </p>
                      </div>
                  </div>
                  <div className="col-md-8 py-3 my-3 p-2 ">
                    <img
                      src={event.imageUrl || "/placeholder.jpg"} // Fallback to placeholder if no imageUrl
                      className="d-block w-100 rounded"
                      alt={event.eventName}
                      style={{ objectFit: "cover", height: "300px" }}
                    />
                  </div>
                </div>
              
            </div>
          ))}
        </div>
  
    {/* Updated Previous and Next buttons */}
    <button
      className="carousel-control-prev"
      type="button"
      data-bs-target="#eventCarousel"
      data-bs-slide="prev"
      style={{  }} 
    >
      <span
        className="carousel-control-prev-icon"
        aria-hidden="true"
        style={{ filter: "invert(1)" }} // Makes the icon visible (white)
      ></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button
      className="carousel-control-next"
      type="button"
      data-bs-target="#eventCarousel"
      data-bs-slide="next"
      style={{}} 
    >
      <span
        className="carousel-control-next-icon"
        aria-hidden="true"
        style={{ filter: "invert(1)" }} // Makes the icon visible (white)
      ></span>
      <span className="visually-hidden text-dark">Next</span>
    </button>
  </div>
  

  );
};

export default EventCarousel;
