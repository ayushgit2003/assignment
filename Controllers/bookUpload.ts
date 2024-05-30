import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import multer from 'multer';
import { parse } from 'csv-parse';

const prisma = new PrismaClient();
const upload = multer({ storage: multer.memoryStorage() });

const bookSchema = z.object({
  title: z.string(),
  author: z.string(),
  publishedDate: z.string(),
  price: z.string().transform((str) => parseFloat(str)),
});

const booksSchema = z.array(bookSchema);

export const uploadBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const file = req.file as Express.Multer.File;

    const books: any[] = await new Promise((resolve, reject) => {
      parse(file.buffer, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
      }, (err, records) => {
        if (err) {
          console.error('CSV Parse Error:', err);
          reject(new Error('Failed to parse CSV file'));
        } else {
          resolve(records);
        }
      });
    });

    // Ensure user is defined and is a seller
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Find the seller by user ID (assuming user ID and seller ID are the same)
    const seller = await prisma.seller.findUnique({
      where: { id: req.user.id },
    });

    if (!seller) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Validate the parsed data
    const validationResult = booksSchema.safeParse(books);
    if (!validationResult.success) {
      return res.status(400).json({ message: 'Invalid data format', errors: validationResult.error.errors });
    }

    // Print titles to the console
    validationResult.data.forEach(book => {
      console.log(book.title+" " + book.author+" " ,book.publishedDate+ " ", book.price);
       
    });

    // Create the books in a transaction
    await prisma.$transaction(
      validationResult.data.map((book) => {
        return prisma.book.create({
          data: {
            title: book.title,
            author: book.author,
            publishedDate: book.publishedDate,
            price: book.price,
            seller: { connect: { id: seller.id } },
          },
        });
      })
    );

    res.status(201).json({ message: 'Books uploaded successfully' });
  } catch (error) {
    console.error('Upload Books Error:', error);
    next(error);
  }
};


