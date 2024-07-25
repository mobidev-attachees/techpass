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
      if (existingEvent.userId !== userId) { // Assuming storeEvent has a userId field
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

      const newImageUrl = files.image ? `/uploads/${path.basename(files.image[0].filepath)}` : null;

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
            eventName: eventName?.[0] || undefined,
            eventDescription: eventDescription?.[0] || undefined,
            tittle: tittle?.[0] || undefined,
            location: location?.[0] || undefined,
            country: country?.[0] || undefined,
            city: city?.[0] || undefined,
            startTime: startTime?.[0] || undefined,
            endTime: endTime?.[0] || undefined,
            startDate: parseDate(startDate?.[0]) || undefined,
            endDate: parseDate(endDate?.[0]) || undefined,
            meetingLink: meetingLink?.[0] || undefined,
            email: email?.[0] || undefined,
            ticketPrice: ticketPrice?.[0] || undefined,
            firstName: firstName?.[0] || undefined,
            middleName: middleName?.[0] || undefined,
            lastName: lastName?.[0] || undefined,
            phoneNumber: phoneNumber?.[0] || undefined,
            instagramLink: instagramLink?.[0] || undefined,
            twitterLink: twitterLink?.[0] || undefined,
            websiteLink: websiteLink?.[0] || undefined,
            facebookLink: facebookLink?.[0] || undefined,
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
