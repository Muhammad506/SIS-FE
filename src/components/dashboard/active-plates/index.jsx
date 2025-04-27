import React, { useState, useMemo, useEffect } from "react";
import {
  FaBolt,
  FaTemperatureHigh,
  FaClock,
  FaSolarPanel,
  FaInfoCircle,
  FaSun,
  FaMoon,
  FaChartLine,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

// Sample data for the graphs
const generateData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    time: `${i.toString().padStart(2, "0")}:00`,
    voltage: 11.5 + Math.random() * 2,
    power: Math.floor(200 + Math.random() * 200) * (i > 6 && i < 18 ? 1 : 0.2),
  }));
};

const initialPlates = [
  {
    id: 1,
    name: "Solar Panel A1",
    voltage: 12.5,
    temperature: 35,
    uptime: "5h 23m",
    active: true,
    powerOutput: 300,
    description: "Running smoothly with optimal voltage levels.",
    efficiency: 92,
    lastMaintenance: "2023-05-15",
    location: "Roof Section A",
  },
  {
    id: 2,
    name: "Solar Panel B2",
    voltage: 12.8,
    temperature: 38,
    uptime: "7h 12m",
    active: true,
    powerOutput: 320,
    description: "High efficiency with excellent sunlight exposure.",
    efficiency: 95,
    lastMaintenance: "2023-04-20",
    location: "Roof Section B",
  },
];

const ActivePlates = () => {
  const [plates, setPlates] = useState(initialPlates);
  const [expandedPlate, setExpandedPlate] = useState(null);
  const [chartData, setChartData] = useState(generateData());
  const [isDaytime, setIsDaytime] = useState(true);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(generateData());
      if (Math.random() > 0.9) {
        const randomIndex = Math.floor(Math.random() * plates.length);
        setPlates((prev) => {
          const newPlates = [...prev];
          newPlates[randomIndex] = {
            ...newPlates[randomIndex],
            active: !newPlates[randomIndex].active,
            powerOutput: newPlates[randomIndex].active
              ? 0
              : Math.floor(250 + Math.random() * 100),
          };
          return newPlates;
        });
      }
    }, 5000);

    const dayNightCheck = setInterval(() => {
      const hours = new Date().getHours();
      setIsDaytime(hours > 6 && hours < 18);
    }, 60000);

    return () => {
      clearInterval(interval);
      clearInterval(dayNightCheck);
    };
  }, [plates.length]);

  const togglePlate = (id) => {
    setPlates((prev) =>
      prev.map((plate) =>
        plate.id === id
          ? {
              ...plate,
              active: !plate.active,
              powerOutput: plate.active
                ? 0
                : Math.floor(250 + Math.random() * 100),
            }
          : plate
      )
    );
  };

  const toggleExpandPlate = (id) => {
    setExpandedPlate(expandedPlate === id ? null : id);
  };

  // Calculate summary statistics
  const { totalPowerOutput, averageEfficiency, activeCount } = useMemo(() => {
    const activePlates = plates.filter((plate) => plate.active);
    const totalPower = activePlates.reduce(
      (sum, plate) => sum + plate.powerOutput,
      0
    );
    const avgEff =
      activePlates.length > 0
        ? activePlates.reduce((sum, plate) => sum + plate.efficiency, 0) /
          activePlates.length
        : 0;

    return {
      totalPowerOutput: totalPower,
      averageEfficiency: avgEff.toFixed(1),
      activeCount: activePlates.length,
    };
  }, [plates]);

  // Status bar data
  const statusData = [
    { label: "Total Panels", value: plates.length, icon: <FaSolarPanel /> },
    { label: "Active Panels", value: activeCount, icon: <FaSun /> },
    {
      label: "Inactive Panels",
      value: plates.length - activeCount,
      icon: <FaMoon />,
    },
    { label: "Total Output", value: `${totalPowerOutput} W`, icon: <FaBolt /> },
    {
      label: "Avg Efficiency",
      value: `${averageEfficiency}%`,
      icon: <FaChartLine />,
    },
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 ">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
            Active Solar Plates
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
            Real-time monitoring and analytics for your solar panel array
          </p>
        </header>

        {/* Status Bar */}
        <div className="bg-[#1E2A47] border-2 border-[#2D3C60] rounded-sm mb-6 p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-20">
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

        {/* Main Content */}
        <div className="space-y-8">
          {/* Panels List */}
          <div className="bg-[#1E2A47] border-2 border-[#2D3C60] rounded-sm mb-6 p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <FaSolarPanel className="text-blue-400" /> Panel Status
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {plates.map((plate) => (
                <div
                  key={plate.id}
                  className={`bg-[#1E2A47] border-2 border-[#2D3C60] rounded-sm p-4 overflow-hidden 
                    ${
                      plate.active
                        ? "border-green-500/30 hover:border-green-500/50"
                        : "border-red-500/30 hover:border-red-500/50"
                    } transition-all duration-300 hover:shadow-xl`}
                >
                  <div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div>
                        <h2 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
                          {plate.name}
                          <button
                            onClick={() => toggleExpandPlate(plate.id)}
                            className="text-gray-400 hover:text-white transition-colors"
                            aria-label={`${
                              expandedPlate === plate.id ? "Collapse" : "Expand"
                            } details`}
                          >
                            <FaInfoCircle size={16} />
                          </button>
                        </h2>
                        <div className="flex items-center mt-1 gap-2 flex-wrap">
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                              plate.active
                                ? "bg-green-900/50 text-green-400"
                                : "bg-red-900/50 text-red-400"
                            }`}
                          >
                            {plate.active ? "Active" : "Inactive"}
                          </span>
                          <span className="text-xs text-gray-400">
                            {plate.location}
                          </span>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={plate.active}
                          onChange={() => togglePlate(plate.id)}
                          aria-label={`Toggle ${plate.name} ${
                            plate.active ? "off" : "on"
                          }`}
                        />
                        <div className="w-10 h-5 bg-gray-700 rounded-full peer peer-checked:bg-green-600 peer-focus:ring-2 peer-focus:ring-green-800 relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
                      </label>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-4">
                      <div className="flex items-center bg-gray-900/50 rounded-lg p-2">
                        <FaBolt className="text-yellow-400 mr-2" />
                        <div>
                          <p className="text-xs text-gray-400">Voltage</p>
                          <p className="font-medium text-white text-sm">
                            {plate.voltage} V
                            <span
                              className={`ml-2 text-xs ${
                                plate.voltage > 12.3
                                  ? "text-green-400"
                                  : plate.voltage > 11.8
                                  ? "text-amber-400"
                                  : "text-red-400"
                              }`}
                            >
                              {plate.voltage > 12.3
                                ? "Optimal"
                                : plate.voltage > 11.8
                                ? "Fair"
                                : "Low"}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center bg-gray-900/50 rounded-lg p-2">
                        <FaTemperatureHigh className="text-red-400 mr-2" />
                        <div>
                          <p className="text-xs text-gray-400">Temperature</p>
                          <p className="font-medium text-white text-sm">
                            {plate.temperature}°C
                            <span
                              className={`ml-2 text-xs ${
                                plate.temperature < 35
                                  ? "text-green-400"
                                  : plate.temperature < 40
                                  ? "text-amber-400"
                                  : "text-red-400"
                              }`}
                            >
                              {plate.temperature < 35
                                ? "Cool"
                                : plate.temperature < 40
                                ? "Warm"
                                : "Hot"}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center bg-gray-900/50 rounded-lg p-2">
                        <FaClock className="text-blue-400 mr-2" />
                        <div>
                          <p className="text-xs text-gray-400">Uptime</p>
                          <p className="font-medium text-white text-sm">
                            {plate.uptime}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center bg-gray-900/50 rounded-lg p-2">
                        <FaSolarPanel className="text-green-400 mr-2" />
                        <div>
                          <p className="text-xs text-gray-400">Power Output</p>
                          <p className="font-medium text-white text-sm">
                            {plate.powerOutput} W
                            <span
                              className={`ml-2 text-xs ${
                                plate.powerOutput > 250
                                  ? "text-green-400"
                                  : plate.powerOutput > 100
                                  ? "text-amber-400"
                                  : "text-red-400"
                              }`}
                            >
                              {plate.powerOutput > 250
                                ? "High"
                                : plate.powerOutput > 100
                                ? "Medium"
                                : "Low"}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`mt-4 transition-all duration-300 overflow-hidden ${
                        expandedPlate === plate.id ? "max-h-96" : "max-h-0"
                      }`}
                    >
                      <div className="pt-4 border-t border-gray-700">
                        <p className="text-sm text-gray-300 mb-3">
                          {plate.description}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="bg-gray-700/30 rounded-lg p-3">
                            <p className="text-xs text-gray-400 mb-1">
                              Efficiency
                            </p>
                            <div className="flex items-center gap-2">
                              <div className="w-full bg-gray-600 rounded-full h-2">
                                <div
                                  className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-green-500"
                                  style={{ width: `${plate.efficiency}%` }}
                                ></div>
                              </div>
                              <span className="text-white font-medium text-sm">
                                {plate.efficiency}%
                              </span>
                            </div>
                          </div>
                          <div className="bg-gray-700/30 rounded-lg p-3">
                            <p className="text-xs text-gray-400 mb-1">
                              Last Maintenance
                            </p>
                            <p className="text-white font-medium text-sm">
                              {plate.lastMaintenance}
                            </p>
                            <p className="text-xs mt-1 text-gray-400">
                              {new Date(plate.lastMaintenance).getTime() >
                              Date.now() - 30 * 24 * 60 * 60 * 1000
                                ? "Recently maintained"
                                : "Due for maintenance"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Charts Section */}
          <div className="bg-[#1E2A47] border-2 border-[#2D3C60] rounded-sm mb-6 p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <FaChartLine className="text-blue-400" /> Performance Trends
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Voltage Trend Chart */}
              <div className="bg-gray-900/50 rounded-lg p-3">
                <h3 className="text-sm sm:text-md font-semibold text-white mb-3 flex items-center gap-2">
                  <FaBolt className="text-yellow-400" /> Voltage Trend (24h)
                </h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
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
                        domain={[10, 14]}
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
                      <Line
                        type="monotone"
                        dataKey="voltage"
                        stroke="#818cf8"
                        strokeWidth={2}
                        dot={{ r: 2 }}
                        activeDot={{ r: 6, strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Power Output Chart */}
              <div className="bg-gray-900/50 rounded-lg p-3">
                <h3 className="text-sm sm:text-md font-semibold text-white mb-3 flex items-center gap-2">
                  <FaChartLine className="text-green-400" /> Power Output (24h)
                </h3>
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
                        dataKey="power"
                        stroke="#4ade80"
                        fill="#4ade80"
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-400 text-center">
              {isDaytime ? (
                <span className="text-green-400">
                  Currently generating power during daylight hours
                </span>
              ) : (
                <span className="text-blue-400">
                  Reduced output during nighttime hours
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivePlates;
