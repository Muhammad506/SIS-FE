/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { FaSolarPanel, FaExclamationCircle, FaChartLine } from "react-icons/fa";

const ControlPage = () => {
  const [iotData, setIotData] = useState(null);
  const [flags, setFlags] = useState({
    field4: 0,
    field5: 0,
    field6: 0,
    field7: 0,
  });
  const [error, setError] = useState(null);
  const [apiLogs, setApiLogs] = useState([]);

  // Add log entry
  const addLog = (message, type = "info") => {
    const timestamp = new Date().toLocaleTimeString();
    setApiLogs((prev) => [...prev, { timestamp, message, type }].slice(-20));
  };

  // Fetch IoT data using proxy
  const fetchIotData = async () => {
    setError(null);
    addLog("Fetching control data from /api/fetch-seed-data");

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/iot/fetch-seed-data`,
        {
          timeout: 35000,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      addLog("API request successful", "success");
      console.log("API Response:", res.data);

      if (!res.data?.data?.feeds) {
        throw new Error("API response missing feeds data");
      }

      const feeds = res.data.data.feeds;

      if (!feeds || feeds.length === 0) {
        addLog("No feed data available", "warning");
        return;
      }

      const latestFeed = feeds[feeds.length - 1];
      setIotData(latestFeed);

      setFlags({
        field4: Number(latestFeed?.field4 ?? 0),
        field5: Number(latestFeed?.field5 ?? 0),
        field6: Number(latestFeed?.field6 ?? 0),
        field7: Number(latestFeed?.field7 ?? 0),
      });
    } catch (error) {
      console.error("API Error:", error);
      let errorMessage = "Failed to fetch control data";

      if (error.response) {
        errorMessage = `Server error: ${error.response.status}`;
        if (error.response.data) {
          errorMessage += ` - ${JSON.stringify(error.response.data)}`;
        }
      } else if (error.request) {
        errorMessage = "No response received from server";
      } else {
        errorMessage = `Request error: ${error.message}`;
      }

      addLog(errorMessage, "error");
      setError(errorMessage);
    }
  };

  const toggleFlag = async (fieldKey) => {
    const fieldNumber = Number(fieldKey.replace("field", ""));
    const newValue = flags[fieldKey] === 1 ? 0 : 1;
    addLog(`Attempting to toggle ${fieldKey} to ${newValue}`);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/toggle-relay`,
        {
          field: fieldNumber,
          value: newValue,
        },
        {
          timeout: 35000,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      addLog(`Toggle successful: ${JSON.stringify(response.data)}`, "success");
      setFlags((prev) => ({ ...prev, [fieldKey]: newValue }));
    } catch (err) {
      let errorMessage = "Failed to toggle relay";

      if (err.response) {
        errorMessage = `Server error: ${err.response.status} - ${err.response.statusText}`;
        addLog(`Error response: ${JSON.stringify(err.response.data)}`, "error");
      } else if (err.request) {
        errorMessage = "No response from server";
      } else {
        errorMessage = `Request error: ${err.message}`;
      }

      addLog(errorMessage, "error");
    }
  };

  useEffect(() => {
    fetchIotData();
    const intervalId = setInterval(fetchIotData, 10000);
    return () => clearInterval(intervalId);
  }, []);

  // Helper function to get flag label
  const getFlagLabel = (fieldKey) => {
    const labels = {
      field4: "Solar Flag 1",
      field5: "Solar Flag 2",
      field6: "Inverter Flag",
      field7: "Load Flag",
    };
    return labels[fieldKey] || fieldKey;
  };

  // Memoized status bar data
  const statusData = useMemo(
    () => [
      {
        label: "Active Flags",
        value: Object.values(flags).filter((v) => v === 1).length,
        icon: <FaChartLine />,
      },
    ],
    [flags]
  );

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8  font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
            Control Center
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
            Manage and toggle relays for your solar power system
          </p>
        </header>

        {/* Status Bar */}
        <div className="bg-[#1E2A47] border-2 border-[#2D3C60] rounded-sm mb-6 p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8">
            {statusData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-yellow-400">{item.icon}</span>
                <div className="text-center">
                  <p className="text-xs text-gray-400">{item.label}</p>
                  <p className="font-semibold text-white text-sm sm:text-base">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-900/50 border-2 border-red-500/50 rounded-sm p-4 mb-6">
            <div className="flex items-center">
              <FaExclamationCircle className="h-6 w-6 text-red-400 mr-3" />
              <div>
                <p className="font-semibold text-red-300">Error</p>
                <p className="text-red-400">{error}</p>
              </div>
            </div>
            <button
              onClick={fetchIotData}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* Control Center */}
        <div className="bg-[#1E2A47] border-2 border-[#2D3C60] rounded-sm p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <FaSolarPanel className="text-green-400" /> Control Center
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {["field4", "field5", "field6", "field7"].map((fieldKey) => (
              <div
                key={fieldKey}
                className={`bg-[#1E2A47] border-2 border-[#2D3C60] rounded-sm p-4 overflow-hidden 
                  ${
                    flags[fieldKey]
                      ? "border-green-500/30 hover:border-green-500/50"
                      : "border-red-500/30 hover:border-red-500/50"
                  } transition-all duration-300 hover:shadow-xl`}
              >
                <h3 className="text-lg font-semibold text-white mb-3">
                  {getFlagLabel(fieldKey)}
                </h3>
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      flags[fieldKey]
                        ? "bg-green-900/50 text-green-400"
                        : "bg-red-900/50 text-red-400"
                    }`}
                  >
                    {flags[fieldKey] ? "Active" : "Inactive"}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={flags[fieldKey]}
                      onChange={() => toggleFlag(fieldKey)}
                      aria-label={`Toggle ${getFlagLabel(fieldKey)} ${
                        flags[fieldKey] ? "off" : "on"
                      }`}
                    />
                    <div className="w-10 h-5 bg-gray-700 rounded-full peer peer-checked:bg-green-600 peer-focus:ring-2 peer-focus:ring-green-800 relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPage;
