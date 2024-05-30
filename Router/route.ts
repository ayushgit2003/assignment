import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import { registerUser, registerSeller } from '../Controllers/register';
import { loginUser, loginSeller } from '../Controllers/login';
 import upload from '../middlewares/upload';
import { uploadBooks } from '../Controllers/book';
 

const router = Router();

router.post('/register/user', registerUser);    
router.post('/register/seller', registerSeller);
router.post('/login/user', loginUser);
router.post('/login/seller', loginSeller);

//Protected_Routes
// router.get('/books', authenticateToken, getBooks);
// router.post('/books', authenticateToken, addBook);
// router.put('/books/:id', authenticateToken, updateBook);
// router.delete('/books/:id', authenticateToken, deleteBook);

// router.post('/upload', authenticateToken, upload.single('file'), parseCSV, uploadBooks);
// router.post('/upload', authenticateToken, uploadBooks);
router.post('/upload', authenticateToken, upload.single('file'), uploadBooks);

export default router;
