import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, role: 'user' }, JWT_SECRET, { expiresIn: '4h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "error message" });
  }
};

export const loginSeller = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const seller = await prisma.seller.findUnique({ where: { email } });
    if (!seller || !(await bcrypt.compare(password, seller.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: seller.id, role: 'seller' }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "error message" });
  }
};
