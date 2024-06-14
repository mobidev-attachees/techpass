// pages/api/updateEvent.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    res.setHeader('Allow', ['PUT']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const eventId = req.query.id;

  // Extract event data from request body
  const {
    eventName,
    eventDescription,
    location,
    country,
    city,
    startDate,
    endDate,
    startTime,
    endTime,
    meetingLink,
    email,
    tittle,
    firstName,
    middleName,
    lastName,
    phoneNumber,
    ticketPrice,
    websiteLink,
    facebookLink,
    instagramLink,
    twitterLink
  } = req.body;

  try {
    const updatedEvent = await prisma.storeEvent.update({
      where: { id: parseInt(eventId) },
      data: {
        eventName,
        eventDescription,
        location,
        country,
        city,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        startTime,
        endTime,
        meetingLink,
        email,
        tittle,
        firstName,
        middleName,
        lastName,
        phoneNumber,
        ticketPrice: ticketPrice === 'free' ? 'free' : ticketPrice, // Update ticketPrice appropriately
        websiteLink,
        facebookLink,
        instagramLink,
        twitterLink
      }
    });

    return res.status(200).json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

