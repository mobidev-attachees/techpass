// pages/api/updateEvent.js
import formidable from 'formidable';
import path from 'path';
import fs from 'fs/promises';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const uploadDir = path.join(process.cwd(), 'public', 'uploads');

// Ensure the upload directory exists
const ensureUploadDirExists = async () => {
  try {
    await fs.mkdir(uploadDir, { recursive: true });
  } catch (err) {
    console.error('Error creating upload directory:', err);
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    res.setHeader('Allow', ['PUT']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  await ensureUploadDirExists();

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

    // Extract event data from parsed fields
    const {
      eventName,
      eventDescription,
      location,
      country,
      city,
      startDate,
      endDate,
      startTime,
      endTime,
      meetingLink,
      email,
      tittle,
      firstName,
      middleName,
      lastName,
      phoneNumber,
      ticketPrice,
      websiteLink,
      facebookLink,
      instagramLink,
      twitterLink,
    } = fields;

    let imageUrl = null;

    if (files.image) {
      imageUrl = `/uploads/${path.basename(files.image.filepath)}`;
    }

    try {
      const updatedEvent = await prisma.storeEvent.update({
        where: { id: parseInt(eventId) },
        data: {
          eventName: eventName?.[0] || null,
          eventDescription: eventDescription?.[0] || null,
          location: location?.[0] || null,
          country: country?.[0] || null,
          city: city?.[0] || null,
          startDate: new Date(startDate?.[0]),
          endDate: new Date(endDate?.[0]),
          startTime: startTime?.[0] || null,
          endTime: endTime?.[0] || null,
          meetingLink: meetingLink?.[0] || null,
          email: email?.[0] || null,
          tittle: tittle?.[0] || null,
          firstName: firstName?.[0] || null,
          middleName: middleName?.[0] || null,
          lastName: lastName?.[0] || null,
          phoneNumber: phoneNumber?.[0] || null,
          ticketPrice: ticketPrice?.[0] === 'free' ? 'free' : ticketPrice?.[0],
          websiteLink: websiteLink?.[0] || null,
          facebookLink: facebookLink?.[0] || null,
          instagramLink: instagramLink?.[0] || null,
          twitterLink: twitterLink?.[0] || null,
          imageUrl: imageUrl || undefined,
        },
      });

      return res.status(200).json(updatedEvent);
    } catch (error) {
      console.error('Error updating event:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });
}
