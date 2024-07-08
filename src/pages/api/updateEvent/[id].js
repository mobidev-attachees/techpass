import formidable from 'formidable';
import path from 'path';
import fs from 'fs/promises';
import { PrismaClient } from '@prisma/client';

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

  try {
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
            eventName: eventName?.[0] || null,
            eventDescription: eventDescription?.[0] || null,
            tittle: tittle?.[0] || null,
            location: location?.[0] || null,
            country: country?.[0] || null,
            city: city?.[0] || null,
            startTime: startTime?.[0],
            endTime: endTime?.[0],
            startDate: parseDate(startDate?.[0]),
            endDate: parseDate(endDate?.[0]),
            meetingLink: meetingLink?.[0] || null,
            email: email?.[0] || null,
            ticketPrice: ticketPrice?.[0] || null,
            firstName: firstName?.[0] || null,
            middleName: middleName?.[0] || null,
            lastName: lastName?.[0] || null,
            phoneNumber: phoneNumber?.[0] || null,
            instagramLink: instagramLink?.[0] || null,
            twitterLink: twitterLink?.[0] || null,
            websiteLink: websiteLink?.[0] || null,
            facebookLink: facebookLink?.[0] || null,
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
