// src/components/PostAdButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';

const PostAdButton = ({ user }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (user) {
      navigate('/shop/post-ad'); // Route to your ad posting page
    } else {
      navigate('/login'); // Force login first
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 flex items-center gap-2 bg-gold text-black px-4 py-2 rounded-full shadow-lg hover:bg-yellow-500 transition"
    >
      <PlusCircle size={20} />
      Post Ad
    </button>
  );
};

export default PostAdButton;
