import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import { Toaster } from '@/components/ui/sonner';

function AuthLayout() {
  // Apply saved theme on load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div className="flex min-h-screen w-full">
      {/* Left panel (visible only on large screens) */}
      <div className="hidden lg:flex items-center justify-center w-1/2 px-12 bg-gold dark:bg-black transition-colors">
        <div className="max-w-md space-y-6 text-center">
          <Link to="/">
            <img
              src={logo}
              alt="Drenation Logo"
              className="mx-auto w-[300px] h-auto rounded p-1 dark:bg-black"
            />
            <h1 className="text-4xl font-extrabold tracking-tight text-black dark:text-gold">
              Welcome to Drenation Shopping Site
            </h1>
          </Link>
        </div>
      </div>

      {/* Right panel (always visible) */}
      <div className="flex flex-1 flex-col text-white items-center justify-center bg-black lg:dark:bg-zinc-900 sm:dark:bg-black px-4 py-12 sm:px-6 lg:px-8 transition-colors">
        {/* Logo visible only on small screens */}
        <div className="mb-6 lg:hidden">
            
          <Link to="/">
            <img
              src={logo}
              alt="Drenation Logo"
              className="mx-auto w-[180px] h-auto rounded p-1 dark:bg-black"
            />
          </Link>
        </div>

        {/* Authentication form or content */}
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
