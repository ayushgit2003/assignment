import multer, { Multer } from 'multer';

interface UploadMiddleware extends Multer {
  // Add any custom properties or methods here if needed
}

const upload: UploadMiddleware = multer({ storage: multer.memoryStorage() });

export default upload;