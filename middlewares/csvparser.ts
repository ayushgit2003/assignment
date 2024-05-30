import { Request, Response, NextFunction } from 'express';
import csv from 'csv-parser';
import { Readable } from 'stream';

export const parseCSV = (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const results: any[] = [];
  const stream = Readable.from(req.file.buffer.toString('utf-8'));

  stream
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      req.body.books = results;
      next();
    })
    .on('error', (error) => {
      res.status(500).json({ error: 'Error parsing CSV file' });
    });
};
