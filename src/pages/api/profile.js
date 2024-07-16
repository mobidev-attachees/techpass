// Import necessary modules
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

// Instantiate Prisma client
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Extract JWT token from Authorization header
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }

  try {
    // Verify and decode the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user profile based on decoded user ID
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        address: true,
        profileImage: true,
        dob: true,
        country: true,
        city: true,
        phoneNumber: true,
        github: true,
        twitter: true,
        website: true,
        instagram: true,
        facebook: true,
        linkedlin: true,
        bio: true,
      },
    });

    // If user not found, return appropriate error
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user profile data
    return res.status(200).json(user);
  } catch (error) {
    console.error('Profile fetch error:', error);
    return res.status(500).json({ message: 'An error occurred while fetching profile' });
  }
}
