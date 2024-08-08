import formidable from 'formidable';
import path from 'path';
import fs from 'fs/promises';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), 'public', 'uploads');

const handler = async (req, res) => {
  if (req.method !== 'PUT') {
    return res.status(405).send({ message: 'Only PUT requests allowed' });
  }

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    await fs.mkdir(uploadDir, { recursive: true });

    const form = formidable({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 1000 * 1024 * 1024, // 1 GB
      filename: (name, ext, part, form) => {
        const timestamp = Date.now();
        const originalFilename = part.originalFilename;
        const sanitizedFilename = originalFilename.replace(/\s+/g, '-'); // Replace spaces with dashes
        return `${timestamp}-${sanitizedFilename}`;
      },
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Form parsing error:', err);
        return res.status(500).json({ message: 'Form parsing error' });
      }

      const eventId = req.query.id;

      // Fetch existing event data
      const existingEvent = await prisma.storeEvent.findUnique({
        where: { id: parseInt(eventId) },
      });

      if (!existingEvent) {
        return res.status(404).json({ message: 'Event not found' });
      }

      // Check if the user is authorized to update the event
      if (existingEvent.userId !== userId) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      const {
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
        meetingLink,
        email,
        ticketPrice,
        firstName,
        middleName,
        lastName,
        phoneNumber,
        instagramLink,
        twitterLink,
        websiteLink,
        facebookLink,
      } = fields;

      const parseDate = (dateString) => {
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? null : date.toISOString();
      };

      const newImageUrl = files.image ? `/uploads/${path.basename(files.image[0].path)}` : null;

      // Delete the old image if a new image is uploaded
      if (newImageUrl && existingEvent.imageUrl) {
        const oldImagePath = path.join(process.cwd(), 'public', existingEvent.imageUrl);
        try {
          await fs.unlink(oldImagePath);
          console.log(`Deleted old image: ${oldImagePath}`);
        } catch (error) {
          console.error(`Error deleting old image: ${oldImagePath}`, error);
        }
      }

      try {
        const updatedEvent = await prisma.storeEvent.update({
          where: { id: parseInt(eventId) },
          data: {
            eventName: eventName || undefined,
            eventDescription: eventDescription || undefined,
            tittle: tittle || undefined,
            location: location || undefined,
            country: country || undefined,
            city: city || undefined,
            startTime: startTime || undefined,
            endTime: endTime || undefined,
            startDate: parseDate(startDate) || undefined,
            endDate: parseDate(endDate) || undefined,
            meetingLink: meetingLink || undefined,
            email: email || undefined,
            ticketPrice: ticketPrice || undefined,
            firstName: firstName || undefined,
            middleName: middleName || undefined,
            lastName: lastName || undefined,
            phoneNumber: phoneNumber || undefined,
            instagramLink: instagramLink || undefined,
            twitterLink: twitterLink || undefined,
            websiteLink: websiteLink || undefined,
            facebookLink: facebookLink || undefined,
            imageUrl: newImageUrl || existingEvent.imageUrl,
          },
        });

        return res.status(200).json(updatedEvent);
      } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ message: 'Database error' });
      }
    });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export default handler;
