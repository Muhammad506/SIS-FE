/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  FaBatteryThreeQuarters,
  FaExclamationCircle,
  FaChartLine,
  FaBatteryFull,
} from "react-icons/fa";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BatteryPage = () => {
  const [iotData, setIotData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [stats, setStats] = useState({
    battery: { avg: "0.00", min: "0.00", max: "0.00", current: "0.00" },
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
    addLog("Fetching battery data from /api/fetch-seed-data");

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/iot/fetch-seed-data`,
        {
          timeout: 35000,
          headers: {
            "Content-Type": "application/json.Artery",
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

      // Prepare chart data and statistics
      const chartData = feeds.map((feed, index) => ({
        time: feed.created_at
          ? new Date(feed.created_at).toLocaleTimeString()
          : `T${index + 1}`,
        battery: Number(feed.field1) || 0,
      }));

      setChartData(chartData);

      // Calculate statistics
      const calcStats = (data, key) => {
        if (!data || data.length === 0) {
          return { avg: "0.00", min: "0.00", max: "0.00", current: "0.00" };
        }
        const values = data.map((item) => item[key]);
        return {
          avg: (
            values.reduce((sum, val) => sum + val, 0) / values.length
          ).toFixed(2),
          min: Math.min(...values).toFixed(2),
          max: Math.max(...values).toFixed(2),
          current: values[values.length - 1].toFixed(2),
        };
      };

      setStats({
        battery: calcStats(chartData, "battery"),
      });
    } catch (error) {
      console.error("API Error:", error);
      let errorMessage = "Failed to fetch battery data";

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

  useEffect(() => {
    fetchIotData();
    const intervalId = setInterval(fetchIotData, 35000);
    return () => clearInterval(intervalId);
  }, []);

  // Memoized status bar data
  const statusData = useMemo(
    () => [
      {
        label: "Battery Level",
        value: `${stats.battery.current}%`,
        icon: <FaBatteryThreeQuarters />,
      },
    ],
    [stats]
  );

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
            Battery Monitoring
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
            Real-time battery level monitoring for your solar power system
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

        {/* Battery Status Section */}
        <div className="bg-[#1E2A47] border-2 border-[#2D3C60] rounded-sm mb-6 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <FaBatteryFull className="text-cyan-400" /> Battery Status
          </h2>
          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="flex items-center gap-4">
              <FaBatteryFull className="text-cyan-400 text-3xl" />
              <div className="w-full">
                <p className="text-sm text-gray-300 mb-2">System Battery</p>
                <div className="flex items-center gap-2">
                  <div className="w-full bg-gray-600 rounded-full h-3">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                      style={{ width: `${stats.battery.current}%` }}
                    ></div>
                  </div>
                  <p className="font-medium text-white text-sm">
                    {stats.battery.current}%
                    <span
                      className={`ml-2 text-xs ${
                        parseFloat(stats.battery.current) > 70
                          ? "text-green-400"
                          : parseFloat(stats.battery.current) > 30
                          ? "text-amber-400"
                          : "text-red-400"
                      }`}
                    >
                      {parseFloat(stats.battery.current) > 70
                        ? "High"
                        : parseFloat(stats.battery.current) > 30
                        ? "Medium"
                        : "Low"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            {chartData.length > 0 ? (
              <div className="mt-4">
                <p className="text-xs text-gray-400 mb-2">
                  Battery Level History (24h)
                </p>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={chartData}
                      margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis
                        dataKey="time"
                        tick={{ fill: "#9CA3AF", fontSize: 10 }}
                        tickMargin={8}
                      />
                      <YAxis
                        domain={[0, 100]}
                        tick={{ fill: "#9CA3AF", fontSize: 10 }}
                        tickMargin={8}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          borderColor: "#374151",
                          borderRadius: "0.5rem",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                        itemStyle={{ color: "#F3F4F6", fontSize: 12 }}
                        labelStyle={{ fontWeight: "bold", color: "#F3F4F6" }}
                      />
                      <Area
                        type="monotone"
                        dataKey="battery"
                        stroke="#22d3ee"
                        fill="#22d3ee"
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-gray-400">
                  <div>
                    <p>Avg: {stats.battery.avg}%</p>
                  </div>
                  <div>
                    <p>Min: {stats.battery.min}%</p>
                  </div>
                  <div>
                    <p>Max: {stats.battery.max}%</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-400 text-center mt-4">
                No data available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatteryPage;
