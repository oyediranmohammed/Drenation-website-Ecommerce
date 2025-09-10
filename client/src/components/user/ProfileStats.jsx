import React from 'react';

const ProfileStats = () => {
  // These would come from backend in a real app
  const stats = {
    adsPosted: 12,
    unreadMessages: 3,
  };

  return (
    <div className="grid grid-cols-2 gap-4 text-center">
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="text-lg font-semibold">Ads Posted</h3>
        <p className="text-2xl text-gold">{stats.adsPosted}</p>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="text-lg font-semibold">Unread Messages</h3>
        <p className="text-2xl text-gold">{stats.unreadMessages}</p>
      </div>
    </div>
  );
};

export default ProfileStats;
