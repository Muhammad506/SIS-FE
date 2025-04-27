import React, { useState } from "react";
import Sidebar from "../../components/dashboard/sidebar";
import Header from "../../components/dashboard/header";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gradient">
      <div className="md:w-64 flex-shrink-0 ">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <div className="h-8 md:h-20 bg-gradient shadow flex-shrink-0">
          <Header
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>

        {/* Page Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
