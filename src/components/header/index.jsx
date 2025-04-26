import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Default avatar icon

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // NEW: Create a ref for the dropdown

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]); // Run whenever dropdownOpen changes

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setDropdownOpen(false);
    navigate("/login");
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/features", label: "Features" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className=" bg-gradient fixed top-0 left-0 w-full z-50 shadow-lg">
      {/* Large Screen Nav */}
      <nav className="hidden lg:flex justify-between items-center max-w-screen-2xl mx-auto px-6 py-2 text-white">
        <Link to="/">
          <img src="/Logo.svg" alt="Logo" className="w-44" />
        </Link>

        <div className="flex gap-12">
          {navLinks.map(({ to, label }) => (
            <Link
              key={label}
              to={to}
              className={`text-lg hover:text-yellow-400 transition-colors duration-300 ${
                location.pathname === to ? "text-yellow font-semibold" : ""
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6 relative">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 cursor-pointer focus:outline-none group"
              >
                <FaUserCircle className="text-4xl text-white group-hover:text-yellow-500 transition-colors" />
                <span className="text-lg text-white group-hover:text-yellow-500 transition-colors">
                  {user.name}
                </span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-1 w-40 bg-[#1C204B] rounded-md shadow-lg py-2">
                  <Link
                    to="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-white cursor-pointer hover:bg-black/30"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 cursor-pointer hover:bg-black/30"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login">
                <button className="w-32 h-10 bg-yellow text-black font-semibold rounded-full hover:brightness-110 cursor-pointer transition-all">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="w-32 h-10 bg-yellow text-black font-semibold rounded-full hover:brightness-110 cursor-pointer transition-all">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Nav */}
      <div className="lg:hidden flex justify-between items-center px-6 py-4 border-b border-gray-300 bg-gradient">
        <Link to="/">
          <img src="/Logo.svg" alt="Logo" className="w-32" />
        </Link>
        <button onClick={toggleMenu} className="flex flex-col gap-1">
          <span
            className={`w-6 h-0.5 bg-white transition-all transform ${
              isOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition-all ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition-all transform ${
              isOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed top-16 left-0 w-full h-screen border-t border-gray-700 bg-gradient text-white z-40 py-6 transition-all">
          <div className="flex flex-col items-center gap-4">
            {navLinks.map(({ to, label }) => (
              <Link
                key={label}
                to={to}
                onClick={toggleMenu}
                className={`w-full text-center py-4 text-xl hover:bg-gray-800 rounded-md transition-all ${
                  location.pathname === to ? "bg-black/30" : ""
                }`}
              >
                {label}
              </Link>
            ))}

            <div className="flex flex-col items-center mt-4 gap-4">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={toggleMenu}
                    className="w-32 h-12 bg-yellow text-black font-semibold rounded-full hover:brightness-110 cursor-pointer transition-all flex items-center justify-center"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="w-32 h-12 bg-red-500 text-white font-semibold rounded-full hover:brightness-110 cursor-pointer transition-all"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <button className="w-32 h-12 bg-yellow text-black font-semibold rounded-full hover:brightness-110 cursor-pointer transition-all">
                      Login
                    </button>
                  </Link>
                  <Link to="/register">
                    <button className="w-32 h-12 bg-yellow text-black font-semibold rounded-full hover:brightness-110 cursor-pointer transition-all">
                      Register
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
