import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Email validation regex
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      match: /^\+?(\d{1,4})?(\d{10})$/, // Phone number validation
    },
    location: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8, // Minimum length validation
      match: /^(?=.*[A-Z])(?=.*\d)/, // Password validation for at least one uppercase letter and one number
    },
    profilePic: {
      type: String, // Assuming the profile picture is a URL (e.g., from cloud storage)
      default: null,
    },
    role: {
      type: String,
      default: 'user',
    },
    confirmPassword: {
      type: String, // This field is only used for validation and not stored in the database
      required: true,
    },
  },
  { timestamps: true }
);

// Create a method to compare passwords (for login)
UserSchema.methods.comparePassword = function (candidatePassword) {
  return this.password === candidatePassword;
};

const User = mongoose.model('User', UserSchema);

export default User;
