import React from 'react';
import { PlusCircle } from 'lucide-react';

function PostAdButton({ handlePostAd }) {
  return (
    <button
      onClick={handlePostAd}
      className="fixed bottom-6 right-6 flex items-center gap-2 bg-gold text-black px-5 py-3 rounded-full shadow-lg hover:scale-105 transition font-semibold"
    >
      <PlusCircle size={20} />
      Post Ad
    </button>
  );
}

export default PostAdButton;

