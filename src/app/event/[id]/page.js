import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getEvent(id) {
  if (!id) {
    console.error("ID is missing or invalid");
    return null;
  }
  
  const eventId = parseInt(id, 10);
  
  if (isNaN(eventId)) {
    console.error("Invalid ID format");
    return null;
  }

  const event = await prisma.storeEvent.findUnique({
    where: { id: eventId },
  });
  
  return event;
}

export default async function EventPage({ params }) {
  const { id } = params;
  const event = await getEvent(id);

  if (!event) {
    return <p>No event found</p>;
  }

  return (
    <div>
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
    </div>
  );
}
