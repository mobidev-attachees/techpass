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

const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'profiles');

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

      const newProfileImageUrl = files.profileImage ? `/uploads/profiles/${path.basename(files.profileImage[0].filepath)}` : null;

      // Fetch existing user data
      const existingUser = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Delete the old profile image if a new image is uploaded
      if (newProfileImageUrl && existingUser.profileImage) {
        const oldImagePath = path.join(process.cwd(), 'public', existingUser.profileImage);
        try {
          await fs.unlink(oldImagePath);
          console.log(`Deleted old profile image: ${oldImagePath}`);
        } catch (error) {
          console.error(`Error deleting old profile image: ${oldImagePath}`, error);
        }
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
