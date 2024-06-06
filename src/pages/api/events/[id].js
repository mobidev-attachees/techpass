import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    if (!id || isNaN(parseInt(id, 10))) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const eventId = parseInt(id, 10);
    const event = await prisma.storeEvent.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
