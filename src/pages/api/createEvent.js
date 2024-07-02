import formidable from "formidable";
import path from "path";
import fs from "fs/promises";
import { PrismaClient } from "@prisma/client";

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

  try {
    await fs.mkdir(uploadDir, { recursive: true });

    const form = formidable({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5 MB
      filename: (name, ext, part, form) => {
        return `${Date.now()}-${part.originalFilename}`;
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
        title,
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

      const imageUrl = files.image ? `/uploads/${files.image.newFilename}` : null;

      try {
        const event = await prisma.event.create({
          data: {
            eventName: eventName?.[0] || null,
            eventDescription: eventDescription?.[0] || null,
            title: title?.[0] || null,
            location: location?.[0] || null,
            country: country?.[0] || null,
            city: city?.[0] || null,
            startTime: startTime?.[0] || null,
            endTime: endTime?.[0] || null,
            startDate: startDate?.[0] || null,
            endDate: endDate?.[0] || null,
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
          },
        });
        return res.status(201).json(event);
      } catch (error) {
        console.error("Database error:", error);
        return res.status(500).json({ message: "Database error" });
      }
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export default handler;
