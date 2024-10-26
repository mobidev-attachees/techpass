// src/pages/api/updateEvent/[id].js
import formidable from 'formidable';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

    const form = formidable({
      maxFileSize: 1000 * 1024 * 1024, // 1 GB
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Form parsing error:', err);
        return res.status(500).json({ message: 'Form parsing error' });
      }

      const eventId = req.query.id;

      const existingEvent = await prisma.storeEvent.findUnique({
        where: { id: parseInt(eventId) },
      });

      if (!existingEvent) {
        return res.status(404).json({ message: 'Event not found' });
      }

      if (existingEvent.userId !== userId) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      const normalizeField = (field) => (Array.isArray(field) ? field[0] : field);

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

      let newImageUrl = existingEvent.imageUrl;

      if (files.image) {
        try {
          const uploadResponse = await cloudinary.uploader.upload(files.image[0].filepath, {
            folder: 'events', // Specify the folder name here
          });
          newImageUrl = uploadResponse.secure_url;

          if (existingEvent.imageUrl) {
            const publicId = existingEvent.imageUrl.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`events/${publicId}`);
          }
        } catch (uploadError) {
          console.error('Cloudinary upload error:', uploadError);
          return res.status(500).json({ message: 'Image upload to Cloudinary failed' });
        }
      }

      try {
        const updatedEvent = await prisma.storeEvent.update({
          where: { id: parseInt(eventId) },
          data: {
            eventName: normalizeField(eventName) || undefined,
            eventDescription: normalizeField(eventDescription) || undefined,
            tittle: normalizeField(tittle) || undefined,
            location: normalizeField(location) || undefined,
            country: normalizeField(country) || undefined,
            city: normalizeField(city) || undefined,
            startTime: normalizeField(startTime) || undefined,
            endTime: normalizeField(endTime) || undefined,
            startDate: parseDate(normalizeField(startDate)) || undefined,
            endDate: parseDate(normalizeField(endDate)) || undefined,
            meetingLink: normalizeField(meetingLink) || undefined,
            email: normalizeField(email) || undefined,
            ticketPrice: normalizeField(ticketPrice) || undefined,
            firstName: normalizeField(firstName) || undefined,
            middleName: normalizeField(middleName) || undefined,
            lastName: normalizeField(lastName) || undefined,
            phoneNumber: normalizeField(phoneNumber) || undefined,
            instagramLink: normalizeField(instagramLink) || undefined,
            twitterLink: normalizeField(twitterLink) || undefined,
            websiteLink: normalizeField(websiteLink) || undefined,
            facebookLink: normalizeField(facebookLink) || undefined,
            imageUrl: newImageUrl,
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
