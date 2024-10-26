import formidable from "formidable";
import path from "path";
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from "cloudinary";

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

    const form = formidable({
      maxFileSize: 1000 * 1024 * 1024, // 1 GB
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Form parsing error:", err);
        return res.status(500).json({ message: "Form parsing error" });
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

      let imageUrl = null;
      if (files.image) {
        try {
          // Upload image to Cloudinary in the "events" folder
          const uploadResponse = await cloudinary.uploader.upload(files.image[0].filepath, {
            folder: 'events', // Specify the folder name here
          });
          imageUrl = uploadResponse.secure_url; // Get the secure URL of the uploaded image
        } catch (uploadError) {
          console.error("Cloudinary upload error:", uploadError);
          return res.status(500).json({ message: "Image upload to Cloudinary failed" });
        }
      }

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
