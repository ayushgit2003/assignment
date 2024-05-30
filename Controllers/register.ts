import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
 


export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ "msg": "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

     
    res.status(201).json({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
     
    console.error("Error during user registration:", error);

     
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const registerSeller = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    // Check if the email already exists
    const existingSeller = await prisma.seller.findUnique({
      where: { email },
    });

    if (existingSeller) {
      return res.status(409).json({ error: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the seller
    const seller = await prisma.seller.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

     
    res.status(201).json({ id: seller.id, name: seller.name, email: seller.email });
  } catch (error) {
    console.error("Error during seller registration:", error);

    res.status(500).json({ error: "Internal Server Error" });
  }
};

