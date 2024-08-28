// pages/api/event/[id].js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'ID is missing or invalid' });
  }

  const eventId = parseInt(id, 10);

  if (isNaN(eventId)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    const event = await prisma.storeEvent.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    return res.status(200).json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
