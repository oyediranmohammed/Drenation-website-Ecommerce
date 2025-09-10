import React, { useState } from 'react';
import UserNavbar from '@/components/navbar/UserNavbar';
import { useSelector } from 'react-redux';
import AccountSettings from './../../components/user/AccountSettings';

const AccountPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-gold transition duration-300">
      <UserNavbar />

      <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
        <h2 className="text-2xl font-semibold">My Account</h2>

        {!isEditing ? (
          <div className="space-y-4 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <p><strong>Username:</strong> {user?.userName}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Phone:</strong> {user?.phone}</p>

            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 px-6 py-2 bg-gold text-white font-medium rounded hover:bg-yellow-600"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <AccountSettings onDone={() => setIsEditing(false)} />
        )}
      </div>
    </div>
  );
};

export default AccountPage;
