import React, { useState } from "react";
import Sidebar from "../../components/dashboard/sidebar";
import Header from "../../components/dashboard/header";

const Dashboard = ({ children }) => {
  // State to control sidebar visibility on small devices
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gradient">
      {/* Sidebar - No width reservation on sm and below, fixed width on md and above */}
      <div className="md:w-64 flex-shrink-0 ">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>

      {/* Main Content Area - Full width on sm and below */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Header */}
        <div className="h-8 md:h-20 bg-gradient shadow flex-shrink-0">
          <Header
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>

        {/* Page Content */}
        <div className="flex-1 p-4 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default Dashboard;
