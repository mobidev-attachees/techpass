import formidable from "formidable";
import path from "path";
import fs from "fs/promises";
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), "public", "uploads");

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST requests allowed" });
  }

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
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
        console.error("Form parsing error:", err);
        return res.status(500).json({ message: "Form parsing error" });
      }

      const {
        eventName,
        eventDescription,
        tittle, // Corrected from tittle to title
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

      const imageUrl = files.image ? `/uploads/${path.basename(files.image[0].filepath)}` : null;

      try {
        const event = await prisma.storeEvent.create({
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
            imageUrl,
            userId, // Link event to the logged-in user
          },
        });

        return res.status(201).json(event);
      } catch (error) {
        console.error("Database error:", error);
        return res.status(500).json({ message: "Database error" });
      }
    });
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default handler;
