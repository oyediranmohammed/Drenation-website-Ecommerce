import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";

// Register Controllerconst 
  const registerUser = async (req, res) => {
  // Destructure all required fields from req.body
  const { firstName, lastName, userName, email, mobile, password, confirmPassword, location } = req.body;

  try {
    // Validate if the user already exists
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      res.status(400).json({
        success: false,
        message: "⚠️ Email already exists.",
      });
    }

    // Validate password confirmation
    if (password !== confirmPassword) {
      res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    // Hash the password before storing it in the database
    const hashPassword = await bcrypt.hash(password, 12);

    // Create a new user with the provided data
    const newUser = new User({
      firstName,
      lastName,
      userName,
      email,
      mobile,
      password: hashPassword,
      confirmPassword: password,  // Confirm password is for validation only and is not stored in DB
      location,
      profilePic: req.file?.path,  // Cloudinary URL (ensure this is handled on the frontend)
    });

    // Save the new user to the database
    await newUser.save();

    res.status(200).json({
      success: true,
      message: "✅ Registration successful.",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Registration error" });
  };
};


//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message:
          "⚠️ User does not exist with this email. Please register first.",
      });

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message:
          "⚠️ Incorrect username or password. Please check and try again.",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName : checkUser.userName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "strict", }).json({
      success: true,
      message: "✅ Logged in Successfully.",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName : checkUser.userName,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured.",
    });
  }
};

//logout

const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully",
  });
};

//auth middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorized User!",
    });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized User!",
    });
  }
};

export { registerUser, loginUser, logoutUser, authMiddleware};
