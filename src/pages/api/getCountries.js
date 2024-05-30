// pages/api/getCountries.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const countries = await prisma.storeEvent.findMany({
      distinct: ['country'],
      select: { country: true },
    });

    const countryList = countries.map(event => event.country);

    return res.status(200).json(countryList);
  } catch (error) {
    console.error('Error fetching countries:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}
