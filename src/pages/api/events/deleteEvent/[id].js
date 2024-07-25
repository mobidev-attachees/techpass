// pages/api/deleteEvent/[id].js

import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), 'public', 'uploads');

const handler = async (req, res) => {
  if (req.method !== 'DELETE') {
    return res.status(405).send({ message: 'Only DELETE requests allowed' });
  }

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const eventId = req.query.id;

    // Fetch existing event data
    const existingEvent = await prisma.storeEvent.findUnique({
      where: { id: parseInt(eventId) },
    });

    if (!existingEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if the user is authorized to delete the event
    if (existingEvent.userId !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    try {
      // Delete the event from the database
      const deletedEvent = await prisma.storeEvent.delete({
        where: { id: parseInt(eventId) },
      });

      // Optionally, delete the image file if exists
      if (existingEvent.imageUrl) {
        const imagePath = path.join(process.cwd(), 'public', existingEvent.imageUrl);
        try {
          await fs.unlink(imagePath);
          console.log(`Deleted image: ${imagePath}`);
        } catch (error) {
          console.error(`Error deleting image: ${imagePath}`, error);
        }
      }

      res.status(200).json({ message: 'Event deleted successfully', event: deletedEvent });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ message: 'Database error', error: error.message });
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(401).json({ message: 'Invalid or expired token', error: error.message });
  }
};

export default handler;
