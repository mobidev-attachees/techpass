// pages/api/login.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  try {
    // Check if user with the provided email exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Create a new session in the database
    const session = await prisma.session.create({
      data: {
        sessionName: `Session for ${user.username}`, // Example session name
        sessionDescription: `Session created at ${new Date().toISOString()}`,
        startTime: new Date().toISOString(), // Adjust as needed
        endTime: new Date(Date.now() + 7 * 60 * 60 * 10000).toISOString(), // 1 hour from now
        speaker: user.username, // Example speaker name
        users: {
          connect: {
            id: user.id
          }
        }
      },
    });

    // Generate a JWT token with the session ID
    const token = jwt.sign(
      { userId: user.id, sessionId: session.id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Return the JWT token and session ID in the response
    return res.status(200).json({ token, sessionId: session.id, message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'An error occurred during login' });
  }
}
