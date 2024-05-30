// pages/api/getEvents.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { limit } = req.query;
  const eventsLimit = limit ? parseInt(limit) : 4; // Default to 4 if no limit is specified

  try {
    const events = await prisma.storeEvent.findMany({
      take: eventsLimit,
      orderBy: {
        startDate: 'asc', // Order by start date
      },
    });

    return res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}
