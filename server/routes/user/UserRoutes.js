import express from 'express';
import  authMiddleware  from '../../middleware/authMiddleware.js';
import  updateUserAccount  from '../../controllers/user/updateUserAccount.js'; // Adjust import based on your structure

const router = express.Router();

// @route   PUT /api/users/account
// @desc    Update user account details
// @access  Private
router.put('/account', authMiddleware, updateUserAccount);

export default router;
