import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); 

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/features", label: "Features" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="bg-gradient fixed top-0 left-0 w-full z-50 shadow-lg">
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

        <div className="flex items-center gap-6">
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
        </div>
      </nav>

      {/* Mobile Nav */}
      <div className="lg:hidden flex justify-between items-center px-6 py-4 border-b border-gray-300 bg-gradient">
        <Link to="/">
          <img src="Logo.svg" alt="Logo" className="w-32" />
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
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
