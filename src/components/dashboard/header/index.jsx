import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FiBell, FiLogOut, FiSettings, FiUser } from "react-icons/fi";
import { AiOutlineMenu } from "react-icons/ai";

const Header = ({ setIsSidebarOpen, isSidebarOpen }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const profileRef = useRef();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleProfileMenu = () => {
    setIsProfileOpen((prev) => !prev);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const getInitials = (name) => {
    if (!name) return "JD";
    const names = name.split(" ");
    return names.length > 1
      ? `${names[0][0]}${names[1][0]}`.toUpperCase()
      : name.slice(0, 2).toUpperCase();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="text-white md:h-20 shadow-md border-b border-gray-600 bg-gradient relative  w-full">
      <div className="flex items-center justify-between sm:justify-end px-4 sm:px-6 lg:px-8 py-3 sm:py-5 w-full">
        {/* Hamburger Menu for Small Screens */}
        <button
          onClick={toggleSidebar}
          className="md:hidden focus:outline-none text-xl sm:text-2xl text-gray-300 hover:text-[#5B9B37] transition-colors duration-300"
          aria-label="Toggle Sidebar"
          aria-expanded={isSidebarOpen}
        >
          <AiOutlineMenu />
        </button>

        <div className="flex items-center space-x-4 sm:space-x-6">
          {/* Notifications */}
          <button
            className="relative text-xl sm:text-2xl text-gray-300 hover:text-[#5B9B37] transition-colors duration-300"
            aria-label="Notifications"
          >
            <FiBell />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center border-2 border-[#021430] shadow-sm">
              3
            </span>
          </button>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={toggleProfileMenu}
              className="flex items-center space-x-2 focus:outline-none"
              aria-label="Profile Menu"
              aria-expanded={isProfileOpen}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#5B9B37] to-[#4A8B2E] flex items-center justify-center text-white font-semibold text-sm sm:text-base shadow-md">
                {user ? getInitials(user.name) : "JD"}
              </div>
              <span className="hidden sm:inline text-sm sm:text-base font-medium text-gray-200">
                {user ? user.name : "User"}
              </span>
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#0f1c47] text-gray-200 rounded-xl shadow-xl py-2 z-50 border border-gray-600/50">
                {/* Profile Header */}
                <div className="px-4 py-3 border-b border-gray-600/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5B9B37] to-[#4A8B2E] flex items-center justify-center text-white font-semibold text-base shadow-sm">
                      {user ? getInitials(user.name) : "JD"}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {user ? user.name : "User"}
                      </p>
                      <p className="text-xs text-gray-400">
                        {user ? user.email : "user@example.com"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Dropdown Items */}
                <Link
                  to="/profile"
                  className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-600/50 transition-colors duration-200"
                  onClick={toggleProfileMenu}
                  aria-label="Profile"
                >
                  <FiUser className="text-lg text-gray-300" />
                  <span className="text-sm">Profile</span>
                </Link>
                <Link
                  to="/setting"
                  className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-600/50 transition-colors duration-200"
                  onClick={toggleProfileMenu}
                  aria-label="Settings"
                >
                  <FiSettings className="text-lg text-gray-300" />
                  <span className="text-sm">Settings</span>
                </Link>
                <button
                  className="w-full text-left flex items-center space-x-3 px-4 py-2 hover:bg-gray-600/50 transition-colors duration-200 border-t border-gray-600/50"
                  onClick={handleLogout}
                  aria-label="Logout"
                >
                  <FiLogOut className="text-lg text-gray-300" />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
