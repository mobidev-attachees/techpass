// pages/api/createEvent.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const {
    eventName, eventDescription, tittle, location, country, city, startTime, endTime,
    startDate, endDate, meetingLink, email, ticketPrice, firstName,
    middleName, lastName, phoneNumber, websiteLink, facebookLink, instagramLink, twitterLink
  } = req.body;

  // Basic input validation
  const requiredFields = [
    eventName, eventDescription, tittle, location, country, city, startTime, endTime,
    startDate, endDate, meetingLink, email, ticketPrice, firstName,
    lastName, phoneNumber
  ];

  if (requiredFields.some(field => !field)) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Create the event
    const newEvent = await prisma.storeEvent.create({
      data: {
        eventName, eventDescription, tittle, location, country, city, startTime, endTime,
        startDate, endDate, meetingLink, email, ticketPrice, firstName,
        middleName, lastName, phoneNumber, websiteLink, facebookLink, instagramLink, twitterLink,
      },
    });

    return res.status(201).json({ message: 'Event creation successful', data: newEvent });
  } catch (error) {
    console.error('Event creation error:', error);
    return res.status(500).json({ message: 'An error occurred during event creation', error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}

