import { useState } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { href: "#", label: "Home" },
    { href: "#", label: "About Us" },
    { href: "#", label: "Features" },
    { href: "#", label: "Contact Us" },
  ];

  return (
    <header className="bg-gradient fixed top-0 left-0 w-full z-50 shadow-lg ">
      {/* Large Screen Nav */}
      <nav className="hidden lg:flex justify-between items-center max-w-screen-2xl mx-auto px-6 py-2 text-white">
        <a href="#">
          <img src="/Logo.svg" alt="Logo" className="w-44" />
        </a>

        <div className="flex gap-12">
          {navLinks.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              className="text-lg hover:text-yellow-400  transition-colors duration-300"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <a to="/">
            <button className="w-32 h-10 bg-yellow text-black font-semibold rounded-full hover:brightness-110 cursor-pointer transition-all">
              Login
            </button>
          </a>
          <a to="/">
            <button className="w-32 h-10 bg-yellow text-black font-semibold rounded-full hover:brightness-110 cursor-pointer transition-all">
              Register
            </button>
          </a>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div className="lg:hidden flex justify-between items-center px-6 py-4 border-b border-gray-300 bg-gradiet">
        <a href="#">
          <img src="Logo.svg" alt="Logo" className="w-32" />
        </a>
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
            {navLinks.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                onClick={toggleMenu}
                className="w-full text-center py-4 text-xl hover:bg-gray-800 rounded-md transition-all"
              >
                {label}
              </a>
            ))}

            <div className="flex flex-col items-center mt-4 gap-4">
              <a to="/">
                <button className="w-32 h-12 bg-yellow text-black font-semibold rounded-full hover:brightness-110 cursor-pointer transition-all">
                  Login
                </button>
              </a>
              <a to="/">
                <button className="w-32 h-12 bg-yellow text-black font-semibold rounded-full hover:brightness-110 cursor-pointer transition-all">
                  Register
                </button>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
