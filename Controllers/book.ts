// import { Request, Response, NextFunction } from 'express';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export const uploadBooks = async (req: Request, res: Response, next: NextFunction) => {
//   const { books } = req.body;
//   const sellerId = req.user.id;

//   const transaction = await prisma.$transaction(
//     books.map((book: any) => {
//       return prisma.book.create({
//         data: {
//           title: book.title,
//           author: book.author,
//           publishedDate: new Date(book.publishedDate),
//           price: parseFloat(book.price),
//           seller: { connect: { id: sellerId } }, // Connect book to seller
//         },
//       });
//     })
//   );

//   try {
//     await transaction;
//     res.status(201).json({ message: 'Books uploaded successfully' });
//   } catch (error) {
//     next(error);
//   }
// };



// import { Request, Response, NextFunction } from 'express';
// import { PrismaClient } from '@prisma/client';
// import { z } from 'zod';

// const prisma = new PrismaClient();

// const bookSchema = z.object({
//   title: z.string(),
//   author: z.string(),
//   publishedDate: z.string().transform((str) => new Date(str)),
//   price: z.string().transform((str) => parseFloat(str)),
// });

// const booksSchema = z.array(bookSchema);

// export const uploadBooks = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { books } = booksSchema.parse(req.body);

//     // Ensure user is defined and is a seller
//     if (!req.user || !req.user.id) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     // Find the seller by user ID (assuming user ID and seller ID are the same)
//     const seller = await prisma.seller.findUnique({
//       where: { id: req.user.id },
//     });

//     if (!seller) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     const transaction = await prisma.$transaction(
//       books.map((book) => {
//         return prisma.book.create({
//           data: {
//             title: book.title,
//             author: book.author,
//             publishedDate: book.publishedDate,
//             price: book.price,
//             seller: { connect: { id: seller.id } },
//           },
//         });
//       })
//     );

//     res.status(201).json({ message: 'Books uploaded successfully' });
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return res.status(400).json({ message: 'Invalid data', errors: error.errors });
//     }
//     next(error);
//   }
// };


// import { Request, Response, NextFunction } from 'express';
// import { PrismaClient } from '@prisma/client';
// import { z } from 'zod';
// import multer from 'multer';
// import { parse } from 'csv-parse';


// const prisma = new PrismaClient();
// const upload = multer({ storage: multer.memoryStorage() });

// const bookSchema = z.object({
//   title: z.string(),
//   author: z.string(),
//   publishedDate: z.string().transform((str) => new Date(str)),
//   price: z.string().transform((str) => parseFloat(str)),
// });

// const booksSchema = z.array(bookSchema);

// export const uploadBooks = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     // Parse and validate the request body
//     const books = booksSchema.parse(req.body);  // Directly assign the parsed value

//     // Ensure user is defined and is a seller
//     if (!req.user || !req.user.id) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     // Find the seller by user ID (assuming user ID and seller ID are the same)
//     const seller = await prisma.seller.findUnique({
//       where: { id: req.user.id },
//     });

//     if (!seller) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     // Create the books in a transaction
//     await prisma.$transaction(
//       books.map((book) => {
//         return prisma.book.create({
//           data: {
//             title: book.title,
//             author: book.author,
//             publishedDate: book.publishedDate,
//             price: book.price,
//             seller: { connect: { id: seller.id } },
//           },
//         });
//       })
//     );

//     res.status(201).json({ message: 'Books uploaded successfully' });
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return res.status(400).json({ message: 'Invalid data', errors: error.errors });
//     }
//     next(error);
//   }
// };

// export const uploadBooks = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     const books: any[] = await new Promise((resolve, reject) => {
//       parse(req.file.buffer, {
//         columns: true,
//         skip_empty_lines: true,
//       }, (err, records) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(records);
//         }
//       });
//     });

//     // Ensure user is defined and is a seller
//     if (!req.user || !req.user.id) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     // Find the seller by user ID (assuming user ID and seller ID are the same)
//     const seller = await prisma.seller.findUnique({
//       where: { id: req.user.id },
//     });

//     if (!seller) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     // Create the books in a transaction
//     await prisma.$transaction(
//       books.map((book) => {
//         return prisma.book.create({
//           data: {
//             title: book.title,
//             author: book.author,
//             publishedDate: new Date(book.publishedDate),
//             price: parseFloat(book.price),
//             seller: { connect: { id: seller.id } },
//           },
//         });
//       })
//     );

//     res.status(201).json({ message: 'Books uploaded successfully' });
//   } catch (error) {
//     next(error);
//   }
// };


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
  publishedDate: z.string().transform((str) => new Date(str)),
  price: z.string().transform((str) => parseFloat(str)),
});

const booksSchema = z.array(bookSchema);

export const uploadBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
      const file = req.file as Express.Multer.File;
    // Parse and validate the request body
    const books: any[] = await new Promise((resolve, reject) => {
      parse(file.buffer, {
        columns: true,
        skip_empty_lines: true,
      }, (err, records) => {
        if (err) {
          reject(err);
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

    // Create the books in a transaction
    await prisma.$transaction(
      books.map((book) => {
        return prisma.book.create({
          data: {
            title: book.title,
            author: book.author,
            publishedDate: new Date(book.publishedDate),
            price: parseFloat(book.price),
            seller: { connect: { id: seller.id } },
          },
        });
      })
    );

    res.status(201).json({ message: 'Books uploaded successfully' });
  } catch (error) {
    next(error);
  }
};
