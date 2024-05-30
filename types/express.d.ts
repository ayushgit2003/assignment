import { Request } from 'express';
import { Multer } from 'multer';
import { Seller,   } from '@prisma/client';

declare module 'express-serve-static-core' {
  interface Request {
      user?: Seller;
      file?: Express.Multer.File;
  }
}
