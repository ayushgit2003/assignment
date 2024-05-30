import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middlewares/authMiddleware';

const prisma = new PrismaClient();



// GET /books
export const getBooks = async (req: AuthRequest, res: Response, next: NextFunction) => {
 try {
     

    // const books = await prisma.book.findMany({
    //   where: { sellerId: req.user.id },
    // });
     const books = await prisma.book.findMany();
    res.json(books);
  } catch (error) {
    next(error);
  }
};


// GET /books/:id
// export const getBookById = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     const book = await prisma.book.findFirst({
//       where: { id: Number(req.params.id), sellerId: req.user.id },
//     });

//     if (!book) {
//       return res.status(404).json({ message: 'Book not found or unauthorized' });
//     }

//     res.json(book);
//   } catch (error) {
//     next(error);
//   }
// };

export const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await prisma.book.findFirst({
      where: { id: Number(req.params.id) },
    });

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    next(error);
  }
};
// PUT /books/:id
export const updateBookById = async (req: Request, res: Response, next: NextFunction) => {
   try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { title, author,publishedDate, price } = req.body;

    const updatedBook = await prisma.book.updateMany({
      where: { id: Number(req.params.id), sellerId: req.user.id },
      data: { title, author, price ,publishedDate},
    });

    if (updatedBook.count === 0) {
      return res.status(404).json({ message: 'Book not found or unauthorized' });
    }

    res.json({ message: 'Book updated successfully' });
  } catch (error) {
    next(error);
  }
};
// DELETE /books/:id


export const deleteBookById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const deletedBook = await prisma.book.deleteMany({
      where: { id: Number(req.params.id), sellerId: req.user.id },
    });

    if (deletedBook.count === 0) {
      return res.status(404).json({ message: 'Book not found or unauthorized' });
    }

    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    next(error);
  }
};