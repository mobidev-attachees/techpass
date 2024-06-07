// pages/api/getEvents.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { limit, page } = req.query;
  const eventsLimit = limit ? parseInt(limit) : 6; // Default to 6 if no limit is specified
  const pageIndex = page ? parseInt(page) : 1;
  const skip = (pageIndex - 1) * eventsLimit;

  try {
    const totalEvents = await prisma.storeEvent.count(); // Get the total number of events
    const events = await prisma.storeEvent.findMany({
      take: eventsLimit,
      skip: skip,
      orderBy: {
        startDate: 'asc', // Order by start date
      },
    });

    return res.status(200).json({ events, totalEvents });
  } catch (error) {
    console.error('Error fetching events:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}
