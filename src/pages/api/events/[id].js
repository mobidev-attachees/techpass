// pages/api/events/[id].js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;
  const eventId = parseInt(id, 10);

  console.log('Request method:', req.method);
  console.log('Event ID:', eventId);

  if (req.method === 'GET') {
    try {
      const event = await prisma.storeEvent.findUnique({
        where: { id: eventId },
      });

      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }

      res.status(200).json(event);
    } catch (error) {
      console.error('Error fetching event:', error);
      res.status(500).json({ error: 'Failed to fetch event' });
    }
  } else if (req.method === 'PUT') {
    const { eventName, startDate, endDate, startTime, endTime, ticketPrice, location, eventDescription, email, tittle, firstName, middleName, lastName, phoneNumber, websiteLink, facebookLink, instagramLink, twitterLink } = req.body;

    console.log('Received data:', req.body);

    try {
      const updatedEvent = await prisma.storeEvent.update({
        where: { id: eventId },
        data: { eventName, startDate, endDate, startTime, endTime, ticketPrice, location, eventDescription, email, tittle, firstName, middleName, lastName, phoneNumber, websiteLink, facebookLink, instagramLink, twitterLink },
      });

      res.status(200).json(updatedEvent);
    } catch (error) {
      console.error('Error updating event:', error);
      res.status(500).json({ error: 'Failed to update event' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}