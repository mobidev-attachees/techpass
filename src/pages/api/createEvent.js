//pages\api\createEvent.js
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { eventName, eventDescription, tittle, location, country,city, startTime,endTime,startDate, endDate, venueName, meetingLink, email, ticketPrice, eventType, firstName, middleName, lastName, phoneNumber, websiteLink, facebookLink, instagramLink, twitterLink } = req.body;

  // Basic input validation
  if (!eventName || !eventDescription || !tittle || !location || !country || !city || !startTime || !endTime || !startDate || !endDate || !venueName || !meetingLink || !email || !ticketPrice ||!eventType ||!firstName ||!middleName ||!lastName ||!phoneNumber ||!websiteLink ||!facebookLink ||!instagramLink ||!twitterLink)
    {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {

    // Create the user
    const newEvent = await prisma.storeEvent.create({
      data: {
        eventName,
          eventDescription,
          tittle,
          location,
          country,
          city,
          startTime,
          endTime,
          startDate,
          endDate,
          venueName,
          eventType,
          email,
          meetingLink,
          ticketPrice,
          firstName,
          middleName,
          lastName,
          phoneNumber,
          websiteLink,
          facebookLink,
          instagramLink,
          twitterLink,

      },
    });

    return res.status(201).json({ message: 'event creation successful' });
  } catch (error) {
    console.error('Event creation error:', error);
    return res.status(500).json({ message: 'An error occurred during event creation', error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
