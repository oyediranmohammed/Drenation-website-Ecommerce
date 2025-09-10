import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dljmim20t/upload/images';
const UPLOAD_PRESET = 'drenation_presets';

const ProfilePicture = () => {
  const { user } = useSelector((state) => state.auth);
  const [preview, setPreview] = useState(user?.profilePic || '');
  const [uploading, setUploading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      const response = await axios.post(CLOUDINARY_URL, formData);
      const imageUrl = response.data.secure_url;

      console.log('Uploaded to Cloudinary:', imageUrl);

      // TODO: Send imageUrl to your backend to update user profile
      // await axios.put('/api/user/profile-picture', { imageUrl });

    } catch (err) {
      console.error('Cloudinary upload failed', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <img
        src={preview || '/default-avatar.png'}
        alt="Profile"
        className="w-32 h-32 object-cover rounded-full border-2 border-gold"
      />
      <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm" />
      {uploading && <p className="text-sm text-gold">Uploading...</p>}
    </div>
  );
};

export default ProfilePicture;
