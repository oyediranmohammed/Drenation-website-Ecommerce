import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const updateAccount = async (req, res) => {
  const userId = req.user._id;
  const {
    userName,
    email,
    phone,
    state,
    lga,
    role,
    profilePicture,
    oldPassword,
    newPassword,
    confirmNewPassword,
  } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update profile fields
    user.userName = userName || user.userName;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.state = state || user.state;
    user.lga = lga || user.lga;
    user.role = role || user.role;
    user.profilePicture = profilePicture || user.profilePicture;

    // Handle password change
    if (oldPassword || newPassword || confirmNewPassword) {
      if (!oldPassword || !newPassword || !confirmNewPassword) {
        return res.status(400).json({ message: "All password fields are required" });
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Old password is incorrect" });
      }

      if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ message: "New passwords do not match" });
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    await user.save();

    res.json({ message: "Account updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
