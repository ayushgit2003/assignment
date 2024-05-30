import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import { registerUser, registerSeller } from '../Controllers/register';
import { loginUser, loginSeller } from '../Controllers/login';
 import upload from '../middlewares/upload';
import { uploadBooks } from '../Controllers/bookUpload';
import { getBookById } from '../Controllers/book';
import { getBooks } from '../Controllers/book';
import { updateBookById } from '../Controllers/book';
import { deleteBookById } from '../Controllers/book';
 

const router = Router();

router.post('/register/user', registerUser);    
router.post('/register/seller', registerSeller);
router.post('/login/user', loginUser);
router.post('/login/seller', loginSeller);
router.get('/books', getBooks);
router.get('/books/:id', getBookById);
router.put('/books/:id', authenticateToken, updateBookById);
router.delete('/books/:id', authenticateToken, deleteBookById);
router.post('/upload', authenticateToken, upload.single('file'), uploadBooks);

export default router;
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6InNlbGxlciIsImlhdCI6MTcxNzA5NzU0NCwiZXhwIjoxNzE3MTAxMTQ0fQ.bMpAYMl41DOw7R0VaVYcq4JlvXFzjpiH_4JUB7FoZUY