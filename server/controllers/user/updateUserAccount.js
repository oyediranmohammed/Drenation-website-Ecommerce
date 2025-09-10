import User from '../../models/User.js'; // Make sure this path is correct

// @route   PUT /api/users/account
// @desc    Update user account details
// @access  Private (authMiddleware)
const updateUserAccount = async (req, res) => {
  try {
    const { userName, email, phone } = req.body;

    // Ensure req.user is set by authMiddleware
    const userId = req?.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized access - No user ID found in request.',
      });
    }

    // Find user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Update only the provided fields
    user.userName = userName ?? user.userName;
    user.email = email ?? user.email;
    user.phone = phone ?? user.phone;

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: 'Account updated successfully!',
      user: {
        id: updatedUser._id,
        userName: updatedUser.userName,
        email: updatedUser.email,
        phone: updatedUser.phone,
      },
    });
  } catch (error) {
    console.error('Update Account Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'An error occurred while updating your account.',
    });
  }
};

export default updateUserAccount;
