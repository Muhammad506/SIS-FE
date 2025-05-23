import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient text-gray-300 border-t border-gray-700">
      <div className="max-w-7xl mx-auto py-10 px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info Section */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="flex flex-col items-center">
            <img src="/Logo.svg" alt="Logo" className="w-56" />
            <p className="text-gray-300 text-sm max-w-xs mt-4">
              Solar Intelli Solutions provides top-notch solar energy solutions,
              ensuring efficient and sustainable energy management for a greener
              future.
            </p>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4 xl:ml-28">
          <h2 className="text-lg font-semibold text-yellow">Quick Links</h2>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400 font-semibold text-sm"
                : "text-sm hover:underline"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400 font-semibold text-sm"
                : "text-sm hover:underline"
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/features"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400 font-semibold text-sm"
                : "text-sm hover:underline"
            }
          >
            Features
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400 font-semibold text-sm"
                : "text-sm hover:underline"
            }
          >
            Contact Us
          </NavLink>
        </div>

        {/* Contact & Social Media Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          <h2 className="text-lg font-semibold text-yellow">Contact</h2>
          <p className="text-sm">Email: info@solarintelli.com</p>
          <p className="text-sm">Phone: +123 456 7890</p>
          <div className="flex gap-6 pt-4">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="w-8 h-8 hover:text-yellow-400 cursor-pointer" />
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="w-8 h-8 hover:text-yellow-400 cursor-pointer" />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="w-8 h-8 hover:text-yellow-400 cursor-pointer" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="py-3 text-center text-sm text-gray-300 border-t border-gray-700">
        © 2025 Solar Intelli Solutions. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
