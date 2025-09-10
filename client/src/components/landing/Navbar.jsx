import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import logo from '../../assets/logo.jpg';

function Navbar() {
  return (
    <header className="flex items-center p-4 shadow-md bg-gold dark:bg-black">
      <Link to="/" className="flex items-center">
        <img
          src={logo}
          alt="Drenation logo"
          className="h-10 w-auto rounded bg-white dark:bg-black"
        />
        <h1 className="text-2xl font-bold dark:text-gold text-black ml-4">Drenation.ng</h1>
      </Link>
      <div className="flex items-center gap-4 ml-auto">
        <Link
          to="/auth/login"
          className="text-sm px-4 py-2 rounded bg-black text-gold dark:bg-gold dark:text-black font-semibold"
        >
          Login
        </Link>
        <Link
          to="/auth/register"
          className="text-sm px-4 py-2 rounded bg-gold text-black dark:bg-black dark:text-gold font-semibold border border-gold"
        >
          Register
        </Link>
        
      </div>
    </header>
  );
}

export default Navbar;
