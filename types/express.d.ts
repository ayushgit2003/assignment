import { Request } from 'express';
import { Multer } from 'multer';
import { User } from '@prisma/client';

declare module 'express-serve-static-core' {
  interface Request {
      user?: User;
      file?: Express.Multer.File;
  }
}
