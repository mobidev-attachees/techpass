// pages/api/protected.js
import { authenticate } from '../../middlewares/authenticate';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    // Protected route logic
    res.status(200).json({ message: 'Authenticated route', userId: req.userId });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default (req, res) => authenticate(req, res, () => handler(req, res));
