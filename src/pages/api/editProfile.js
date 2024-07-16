import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const {
      username,
      email,
      firstName,
      lastName,
      address,
      profileImage,
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
    } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: {
        username,
        email,
        firstName,
        lastName,
        address,
        profileImage,
        dob: dob ? new Date(dob) : null, // Convert DOB to Date if provided
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
      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Edit profile error:', error);
    res.status(500).json({ message: 'An error occurred while updating profile' });
  }
}
