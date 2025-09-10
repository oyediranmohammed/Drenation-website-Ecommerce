import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Bookmark,
  MessageSquare,
  Bell,
  Megaphone,
  User,
  LogOut,
  Settings,
  BarChart,
  Store,
  MessageCircle,
} from 'lucide-react';
import logo from '../../assets/logo.jpg';
import { logoutUser } from '@/store/auth-slice';

const UserNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white dark:bg-black shadow-md py-4 px-6 flex items-center justify-between relative">
      <Link to="/shop/home" className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="h-10 rounded" />
        <span className="font-bold text-xl dark:text-gold">Drenation.ng</span>
      </Link>

      <nav className="flex items-center gap-6 text-black dark:text-white relative">
        <Link to="/shop/saved" className="hover:text-gold" title="Saved Ads">
          <Bookmark size={22} />
        </Link>
        <Link to="/shop/messages" className="hover:text-gold" title="Messages">
          <MessageSquare size={22} />
        </Link>
        <Link to="/shop/notifications" className="hover:text-gold" title="Notifications">
          <Bell size={22} />
        </Link>
        <Link to="/shop/my-ads" className="hover:text-gold" title="My Ads">
          <Megaphone size={22} />
        </Link>

        {/* User dropdown with click */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="hover:text-gold"
            title="Account"
          >
            <User size={22} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg py-2 z-50">
              {/* Profile Link */}
              <Link
                to="/shop/account"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <User size={18} />
                Profile
              </Link>

              <Link
                to="/shop/settings"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Settings size={18} />
                Settings
              </Link>
              <Link
                to="/shop/performance"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <BarChart size={18} />
                Performance
              </Link>
              <Link
                to="/shop"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Store size={18} />
                Shop
              </Link>
              <Link
                to="/shop/feedback"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <MessageCircle size={18} />
                Feedback
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-800 text-red-600"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default UserNavbar;
