// pages/api/Events/getEvents.js
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const { limit, page } = req.query;
    const eventsLimit = limit ? parseInt(limit) : 6; // Default to 6 if no limit is specified
    const pageIndex = page ? parseInt(page) : 1;
    const skip = (pageIndex - 1) * eventsLimit;

    const totalEvents = await prisma.storeEvent.count({
      where: { userId } // Count only events for the given user
    });

    const events = await prisma.storeEvent.findMany({
      where: { userId }, // Fetch only events for the given user
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
