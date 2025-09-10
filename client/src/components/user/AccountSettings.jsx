import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const AccountSettings = ({ onDone }) => {
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    userName: user?.userName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    state: user?.state || "",
    lga: user?.lga || "",
    role: user?.role || "",
    profilePicture: user?.profilePicture || "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword && formData.newPassword !== formData.confirmNewPassword) {
      alert("New passwords do not match.");
      return;
    }

    try {
      const res = await axios.put(
        "http://localhost:5000/api/users/account",
        formData,
        { withCredentials: true }
      );

      alert("Profile updated successfully!");
      if (onDone) onDone();
    } catch (error) {
      console.error("Update failed", error);
      alert(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 space-y-4 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
      {/* BASIC INFO */}
      <div>
        <label className="block font-medium">Username</label>
        <input
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
        />
      </div>

      <div>
        <label className="block font-medium">Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
        />
      </div>

      <div>
        <label className="block font-medium">Phone</label>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
        />
      </div>

      <div>
        <label className="block font-medium">State</label>
        <input
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
        />
      </div>

      <div>
        <label className="block font-medium">LGA</label>
        <input
          name="lga"
          value={formData.lga}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
        />
      </div>

      <div>
        <label className="block font-medium">Role</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
        >
          <option value="">Select role</option>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
      </div>

      <div>
        <label className="block font-medium">Profile Picture URL</label>
        <input
          name="profilePicture"
          value={formData.profilePicture}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          className="w-full px-4 py-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
        />
      </div>

      {/* PASSWORD SECTION */}
      <div className="pt-4 border-t border-gray-300 dark:border-gray-600">
        <h4 className="text-lg font-semibold mb-2">Change Password</h4>

        <div>
          <label className="block font-medium">Old Password</label>
          <input
            name="oldPassword"
            type="password"
            value={formData.oldPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
          />
        </div>

        <div>
          <label className="block font-medium">New Password</label>
          <input
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
          />
        </div>

        <div>
          <label className="block font-medium">Confirm New Password</label>
          <input
            name="confirmNewPassword"
            type="password"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
          />
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex space-x-4 pt-4">
        <button
          type="submit"
          className="px-6 py-2 bg-gold text-white font-medium rounded hover:bg-yellow-600"
        >
          Save Changes
        </button>

        <button
          type="button"
          onClick={() => onDone && onDone()}
          className="px-6 py-2 bg-gray-500 text-white font-medium rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AccountSettings;
