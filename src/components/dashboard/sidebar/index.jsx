import { Link, useLocation } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { FiHome, FiBatteryCharging, FiPower } from "react-icons/fi";
import { VscLayersActive } from "react-icons/vsc";
import { MdOutlineEnergySavingsLeaf } from "react-icons/md";
import { TbHeartRateMonitor } from "react-icons/tb";

// Static menu items to avoid re-creating on every render
const menuItems = [
  { name: "Dashboard", icon: <FiHome />, link: "/dashboard" },
  {
    name: "Active Plates",
    icon: <VscLayersActive />,
    link: "/dashboard/active-plates",
  },
  {
    name: "Power Generated",
    icon: <FiPower />,
    link: "/dashboard/power-generated",
  },
  {
    name: "Energy Savings",
    icon: <MdOutlineEnergySavingsLeaf />,
    link: "/dashboard/energy-savings",
  },
  {
    name: "Battery Status",
    icon: <FiBatteryCharging />,
    link: "/dashboard/battery-status",
  },
  {
    name: "Systems Monitored",
    icon: <TbHeartRateMonitor />,
    link: "/dashboard/total-system-monitored",
  },
];

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isActive = (link) => location.pathname === link;

  return (
    <div className="relative bg-gradient-to-b">
      {/* Sidebar for Medium and Larger Screens */}
      <div className="hidden md:flex fixed top-0 left-0 h-full w-64 text-white flex-col shadow-lg border-r border-gray-600 z-10">
        <Link to="/" aria-label="Home">
          <div className="px-4 py-2 flex flex-col items-center border-b border-gray-600">
            <img
              src="/Logo.svg"
              alt="Solar Intelli Solutions Logo"
              className="h-16"
            />
          </div>
        </Link>

        <nav className="flex-grow my-4 overflow-y-auto">
          <ul className="space-y-3 px-4">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={`p-4 rounded flex items-center space-x-3 transition-all duration-300 ${
                  isActive(item.link) ? "bg-gray-700" : "hover:bg-gray-700"
                }`}
              >
                <div className="text-lg">{item.icon}</div>
                <Link to={item.link} aria-label={item.name}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Sidebar for Small Screens - Overlay */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full sm:w-60 h-full bg-gradient text-white transition-transform duration-300 ease-in-out z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center border-b border-gray-600 px-4 py-3">
          <Link to="/" aria-label="Home">
            <img
              src="/Logo.svg"
              alt="Solar Intelli Solutions Logo"
              className="h-10"
            />
          </Link>
          <button
            onClick={toggleSidebar}
            className="focus:outline-none"
            aria-label="Close Sidebar"
          >
            <AiOutlineClose className="text-2xl" />
          </button>
        </div>

        <nav>
          <ul className="space-y-3 px-4 py-4">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={`p-3 rounded flex items-center space-x-3 transition-all duration-300 ${
                  isActive(item.link) ? "bg-gray-700" : "hover:bg-gray-700"
                }`}
              >
                <div className="text-lg">{item.icon}</div>
                <Link
                  to={item.link}
                  onClick={toggleSidebar}
                  aria-label={item.name}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Backdrop for Small Screens */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default Sidebar;
