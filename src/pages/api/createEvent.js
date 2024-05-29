// pages/api/createEvent.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

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
    tittle, // Ensure correct spelling
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

  // Validate required fields
  if (!eventName || !eventDescription || !email || !firstName || !lastName || !phoneNumber || !startDate || !endDate || !startTime || !endTime) {
    return res.status(400).json({ message: 'All required fields must be filled' });
  }

  try {
    const event = await prisma.storeEvent.create({
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
        ticketPrice,
        websiteLink,
        facebookLink,
        instagramLink,
        twitterLink
      }
    });

    return res.status(201).json(event);
  } catch (error) {
    console.error('Error creating event:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

