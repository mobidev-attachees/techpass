// src/pages/editProfile.js
import formidable from 'formidable';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';

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

      const {
        username,
        email,
        firstName,
        lastName,
        address,
        dob,
        country,
        city,
        phoneNumber,
        github,
        twitter,
        website,
        instagram,
        facebook,
        linkedlin,
        bio,
      } = fields;

      let newProfileImageUrl = null;

      if (files.profileImage) {
        try {
          // Upload profile image to Cloudinary in the "profiles" folder
          const uploadResponse = await cloudinary.uploader.upload(files.profileImage[0].filepath, {
            folder: 'profiles',
          });
          newProfileImageUrl = uploadResponse.secure_url;
        } catch (uploadError) {
          console.error('Cloudinary upload error:', uploadError);
          return res.status(500).json({ message: 'Image upload to Cloudinary failed' });
        }
      }

      // Fetch existing user data
      const existingUser = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      try {
        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: {
            username: username?.[0] || undefined,
            email: email?.[0] || undefined,
            firstName: firstName?.[0] || undefined,
            lastName: lastName?.[0] || undefined,
            address: address?.[0] || undefined,
            profileImage: newProfileImageUrl || existingUser.profileImage,
            dob: dob?.[0] ? new Date(dob[0]) : undefined,
            country: country?.[0] || undefined,
            city: city?.[0] || undefined,
            phoneNumber: phoneNumber?.[0] || undefined,
            github: github?.[0] || undefined,
            twitter: twitter?.[0] || undefined,
            website: website?.[0] || undefined,
            instagram: instagram?.[0] || undefined,
            facebook: facebook?.[0] || undefined,
            linkedlin: linkedlin?.[0] || undefined,
            bio: bio?.[0] || undefined,
          },
        });

        return res.status(200).json(updatedUser);
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
