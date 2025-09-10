import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
} from '../../controllers/auth/auth-controller.js';
import upload from '../../middleware/upload.js';

const router = express.Router();


// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', upload.single('profilePic'), registerUser);



// @route   POST /api/auth/login
// @desc    Login user
router.post('/login', loginUser);

// @route   POST /api/auth/logout
// @desc    Logout user
router.post('/logout', logoutUser);

// @route   GET /api/auth/check-auth
// @desc    Check if user is authenticated
router.get('/check-auth', authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Authenticated User',
    user: req.user,
  });
});

export default router;
