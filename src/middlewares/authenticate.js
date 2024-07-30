// middlewares/authenticate.js
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const session = await prisma.session.findUnique({ where: { id: decoded.sessionId } });

    if (session && new Date(session.endTime) > new Date()) {
      req.userId = decoded.userId;
      next();
    } else {
      res.status(401).json({ error: 'Session expired' });
    }
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
