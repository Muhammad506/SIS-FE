/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   FaBatteryThreeQuarters,
//   FaSolarPanel,
//   FaBolt,
//   FaSyncAlt,
//   FaTrash,
//   FaExclamationCircle,
// } from "react-icons/fa";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const Home = () => {
//   const [iotData, setIotData] = useState(null);
//   const [chartData, setChartData] = useState({
//     battery: { labels: [], datasets: [] },
//     solar: { labels: [], datasets: [] },
//     power: { labels: [], datasets: [] },
//   });
//   const [stats, setStats] = useState({
//     battery: { avg: "0.00", min: "0.00", max: "0.00", current: "0.00" },
//     solar: { avg: "0.00", min: "0.00", max: "0.00", current: "0.00" },
//     power: { avg: "0.00", min: "0.00", max: "0.00", current: "0.00" },
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [apiLogs, setApiLogs] = useState([]);
//   const [flags, setFlags] = useState({
//     field4: 0,
//     field5: 0,
//     field6: 0,
//     field7: 0,
//   });

//   // Add log entry
//   const addLog = (message, type = "info") => {
//     const timestamp = new Date().toLocaleTimeString();
//     setApiLogs((prev) => [...prev, { timestamp, message, type }].slice(-20));
//   };

//   // Fetch IoT data using proxy
//   const fetchIotData = async () => {
//     setLoading(true);
//     setError(null);
//     addLog("Fetching data from /api/fetch-seed-data");

//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_URL}/iot/fetch-seed-data`,
//         {
//           timeout: 35000,
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//           },
//         }
//       );

//       addLog("API request successful", "success");
//       console.log("API Response:", res.data);

//       if (!res.data?.data?.feeds) {
//         throw new Error("API response missing feeds data");
//       }

//       const feeds = res.data.data.feeds;

//       if (!feeds || feeds.length === 0) {
//         addLog("No feed data available", "warning");
//         setLoading(false);
//         return;
//       }

//       const latestFeed = feeds[feeds.length - 1];
//       setIotData(latestFeed);

//       setFlags({
//         field4: Number(latestFeed?.field4 ?? 0),
//         field5: Number(latestFeed?.field5 ?? 0),
//         field6: Number(latestFeed?.field6 ?? 0),
//         field7: Number(latestFeed?.field7 ?? 0),
//       });

//       // Prepare chart data and statistics
//       const labels = feeds.map((feed, index) =>
//         feed.created_at
//           ? new Date(feed.created_at).toLocaleTimeString()
//           : `T${index + 1}`
//       );
//       const batteryData = feeds.map((feed) => Number(feed.field1) || 0);
//       const solarData = feeds.map((feed) => Number(feed.field2) || 0);
//       const powerData = feeds.map((feed) => Number(feed.field3) || 0);

//       // Calculate statistics
//       const calcStats = (data) => {
//         if (!data || data.length === 0) {
//           return { avg: "0.00", min: "0.00", max: "0.00", current: "0.00" };
//         }
//         return {
//           avg: (data.reduce((sum, val) => sum + val, 0) / data.length).toFixed(
//             2
//           ),
//           min: Math.min(...data).toFixed(2),
//           max: Math.max(...data).toFixed(2),
//           current: data[data.length - 1].toFixed(2),
//         };
//       };

//       setChartData({
//         battery: {
//           labels,
//           datasets: [
//             {
//               label: "Battery Level (%)",
//               data: batteryData,
//               borderColor: "rgb(59, 130, 246)",
//               backgroundColor: "rgba(59, 130, 246, 0.5)",
//               tension: 0.4,
//             },
//           ],
//         },
//         solar: {
//           labels,
//           datasets: [
//             {
//               label: "Solar Output",
//               data: solarData,
//               borderColor: "rgb(234, 179, 8)",
//               backgroundColor: "rgba(234, 179, 8, 0.5)",
//               tension: 0.4,
//             },
//           ],
//         },
//         power: {
//           labels,
//           datasets: [
//             {
//               label: "Power Generated (W)",
//               data: powerData,
//               borderColor: "rgb(168, 85, 247)",
//               backgroundColor: "rgba(168, 85, 247, 0.5)",
//               tension: 0.4,
//             },
//           ],
//         },
//       });

//       setStats({
//         battery: calcStats(batteryData),
//         solar: calcStats(solarData),
//         power: calcStats(powerData),
//       });

//       setLoading(false);
//     } catch (error) {
//       console.error("API Error:", error);
//       let errorMessage = "Failed to fetch IoT data";

//       if (error.response) {
//         errorMessage = `Server error: ${error.response.status}`;
//         if (error.response.data) {
//           errorMessage += ` - ${JSON.stringify(error.response.data)}`;
//         }
//       } else if (error.request) {
//         errorMessage = "No response received from server";
//       } else {
//         errorMessage = `Request error: ${error.message}`;
//       }

//       addLog(errorMessage, "error");
//       setError(errorMessage);
//       setLoading(false);
//     }
//   };

//   const toggleFlag = async (fieldKey) => {
//     const fieldNumber = Number(fieldKey.replace("field", ""));
//     const newValue = flags[fieldKey] === 1 ? 0 : 1;
//     addLog(`Attempting to toggle ${fieldKey} to ${newValue}`);

//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_API_URL}/toggle-relay`,
//         {
//           field: fieldNumber,
//           value: newValue,
//         },
//         {
//           timeout: 35000,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       addLog(`Toggle successful: ${JSON.stringify(response.data)}`, "success");
//       setFlags((prev) => ({ ...prev, [fieldKey]: newValue }));
//     } catch (err) {
//       let errorMessage = "Failed to toggle relay";

//       if (err.response) {
//         errorMessage = `Server error: ${err.response.status} - ${err.response.statusText}`;
//         addLog(`Error response: ${JSON.stringify(err.response.data)}`, "error");
//       } else if (err.request) {
//         errorMessage = "No response from server";
//       } else {
//         errorMessage = `Request error: ${err.message}`;
//       }

//       addLog(errorMessage, "error");
//     }
//   };

//   useEffect(() => {
//     fetchIotData();
//     const intervalId = setInterval(fetchIotData, 10000);
//     return () => clearInterval(intervalId);
//   }, []);

//   // Helper function to get flag label
//   const getFlagLabel = (fieldKey) => {
//     const labels = {
//       field4: "🌞 Solar Flag 1",
//       field5: "🔆 Solar Flag 2",
//       field6: "🔌 Inverter Flag",
//       field7: "💡 Load Flag",
//     };
//     return labels[fieldKey] || fieldKey;
//   };

//   // Chart options
//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "",
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     <div className=" py-8 px-4 sm:px-6 lg:px-8 font-sans  bg-gradient-to-r from-[ #021430] via-[#0f1c47] to-[ #021430] ">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <header className="mb-20 text-center px-4">
//           <p className="px-6 py-2 bg-transparent text-white mx-auto w-fit rounded-full font-semibold shadow-md border border-white/20 backdrop-blur-sm">
//             Dashboard
//           </p>
//           <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white drop-shadow-xl leading-tight">
//             Smart Solar Monitoring
//           </h1>
//         </header>

//         {/* System Overview - Charts and Stats */}
//         <section className="mb-12">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
//             <span className="w-4 h-4 rounded-full bg-indigo-500 mr-3"></span>
//             System Overview
//           </h2>

//           {error && (
//             <div className="bg-red-50 border-l-4 border-red-500 p-5 mb-6 rounded-lg shadow-sm">
//               <div className="flex items-center">
//                 <FaExclamationCircle className="h-6 w-6 text-red-500 mr-3" />
//                 <div>
//                   <p className="font-semibold text-red-800">Error</p>
//                   <p className="text-red-700">{error}</p>
//                 </div>
//               </div>
//               <button
//                 onClick={fetchIotData}
//                 className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
//               >
//                 Retry Connection
//               </button>
//             </div>
//           )}

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {/* Battery Chart and Dashboard Stats */}
//             <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
//               <div className="flex items-center mb-4">
//                 <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
//                   <FaBatteryThreeQuarters className="h-6 w-6" />
//                 </div>
//                 <h3 className="ml-3 text-lg font-semibold text-gray-900">
//                   Battery Level
//                 </h3>
//               </div>
//               {chartData.battery.labels.length > 0 ? (
//                 <>
//                   <Line
//                     data={chartData.battery}
//                     options={{
//                       ...chartOptions,
//                       plugins: {
//                         ...chartOptions.plugins,
//                         title: {
//                           display: true,
//                           text: "Battery Level Over Time",
//                         },
//                       },
//                     }}
//                   />
//                   <div className="mt-4">
//                     <div className="flex justify-center">
//                       <div className="w-32 h-32">
//                         <CircularProgressbar
//                           value={parseFloat(stats.battery.current)}
//                           text={`${stats.battery.current}%`}
//                           styles={buildStyles({
//                             textColor: "#1f2937",
//                             pathColor:
//                               parseFloat(stats.battery.current) > 70
//                                 ? "#10b981"
//                                 : parseFloat(stats.battery.current) > 30
//                                 ? "#f59e0b"
//                                 : "#ef4444",
//                             trailColor: "#e5e7eb",
//                           })}
//                         />
//                       </div>
//                     </div>
//                     <div className="mt-4 bg-gray-50 p-4 rounded-lg">
//                       <h4 className="text-sm font-semibold text-gray-700 mb-2">
//                         Historical Statistics
//                       </h4>
//                       <div className="grid grid-cols-3 gap-2 text-sm text-gray-600">
//                         <div>
//                           <p className="font-medium">Avg</p>
//                           <p>{stats.battery.avg}%</p>
//                         </div>
//                         <div>
//                           <p className="font-medium">Min</p>
//                           <p>{stats.battery.min}%</p>
//                         </div>
//                         <div>
//                           <p className="font-medium">Max</p>
//                           <p>{stats.battery.max}%</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               ) : (
//                 <p className="text-gray-600 text-center">No data available</p>
//               )}
//             </div>

//             {/* Solar Chart and Table Stats */}
//             <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
//               <div className="flex items-center mb-4">
//                 <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
//                   <FaSolarPanel className="h-6 w-6" />
//                 </div>
//                 <h3 className="ml-3 text-lg font-semibold text-gray-900">
//                   Solar Output
//                 </h3>
//               </div>
//               {chartData.solar.labels.length > 0 ? (
//                 <>
//                   <Line
//                     data={chartData.solar}
//                     options={{
//                       ...chartOptions,
//                       plugins: {
//                         ...chartOptions.plugins,
//                         title: {
//                           display: true,
//                           text: "Solar Output Over Time",
//                         },
//                       },
//                     }}
//                   />
//                   <div className="mt-4">
//                     <h4 className="text-sm font-semibold text-gray-700 mb-2">
//                       Historical Statistics
//                     </h4>
//                     <table className="w-full text-sm text-gray-600">
//                       <tbody>
//                         <tr>
//                           <td className="py-1 font-medium">Average</td>
//                           <td className="py-1 text-right">{stats.solar.avg}</td>
//                         </tr>
//                         <tr>
//                           <td className="py-1 font-medium">Minimum</td>
//                           <td className="py-1 text-right">{stats.solar.min}</td>
//                         </tr>
//                         <tr>
//                           <td className="py-1 font-medium">Maximum</td>
//                           <td className="py-1 text-right">{stats.solar.max}</td>
//                         </tr>
//                         <tr>
//                           <td className="py-1 font-medium">Current</td>
//                           <td className="py-1 text-right">
//                             {stats.solar.current}
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>
//                 </>
//               ) : (
//                 <p className="text-gray-600 text-center">No data available</p>
//               )}
//             </div>

//             {/* Power Chart and Dashboard Stats */}
//             <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
//               <div className="flex items-center mb-4">
//                 <div className="p-3 rounded-full bg-purple-100 text-purple-600">
//                   <FaBolt className="h-6 w-6" />
//                 </div>
//                 <h3 className="ml-3 text-lg font-semibold text-gray-900">
//                   Power Generated
//                 </h3>
//               </div>
//               {chartData.power.labels.length > 0 ? (
//                 <>
//                   <Line
//                     data={chartData.power}
//                     options={{
//                       ...chartOptions,
//                       plugins: {
//                         ...chartOptions.plugins,
//                         title: {
//                           display: true,
//                           text: "Power Generated Over Time",
//                         },
//                       },
//                     }}
//                   />
//                   <div className="mt-4">
//                     <div className="flex justify-center">
//                       <div className="w-32 h-32">
//                         <CircularProgressbar
//                           value={parseFloat(stats.power.current)}
//                           maxValue={1000} // Adjust based on your max power expectation
//                           text={`${stats.power.current}W`}
//                           styles={buildStyles({
//                             textColor: "#1f2937",
//                             pathColor: "#8b5cf6",
//                             trailColor: "#e5e7eb",
//                           })}
//                         />
//                       </div>
//                     </div>
//                     <div className="mt-4 bg-gray-50 p-4 rounded-lg">
//                       <h4 className="text-sm font-semibold text-gray-700 mb-2">
//                         Historical Statistics
//                       </h4>
//                       <div className="grid grid-cols-3 gap-2 text-sm text-gray-600">
//                         <div>
//                           <p className="font-medium">Avg</p>
//                           <p>{stats.power.avg} W</p>
//                         </div>
//                         <div>
//                           <p className="font-medium">Min</p>
//                           <p>{stats.power.min} W</p>
//                         </div>
//                         <div>
//                           <p className="font-medium">Max</p>
//                           <p>{stats.power.max} W</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               ) : (
//                 <p className="text-gray-600 text-center">No data available</p>
//               )}
//             </div>
//           </div>
//         </section>

//         {/* Control Panel */}
//         <section className="mb-12">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
//             <span className="w-4 h-4 rounded-full bg-green-500 mr-3"></span>
//             Control Center
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {["field4", "field5", "field6", "field7"].map((fieldKey) => (
//               <div
//                 key={fieldKey}
//                 className={`bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl border-l-4 ${
//                   flags[fieldKey] ? "border-green-500" : "border-gray-200"
//                 }`}
//               >
//                 <div className="p-6">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                     {getFlagLabel(fieldKey).split(" ")[0]}
//                     <span className="ml-2">
//                       {getFlagLabel(fieldKey).split(" ").slice(1).join(" ")}
//                     </span>
//                   </h3>
//                   <div className="flex items-center justify-between">
//                     <span
//                       className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
//                         flags[fieldKey]
//                           ? "bg-green-100 text-green-800"
//                           : "bg-gray-100 text-gray-800"
//                       }`}
//                     >
//                       {flags[fieldKey] ? "ACTIVE" : "INACTIVE"}
//                     </span>
//                     <button
//                       onClick={() => toggleFlag(fieldKey)}
//                       className={`px-4 py-2 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-105 ${
//                         flags[fieldKey]
//                           ? "bg-green-600 hover:bg-green-700"
//                           : "bg-gray-600 hover:bg-gray-700"
//                       }`}
//                     >
//                       {flags[fieldKey] ? "Turn OFF" : "Turn ON"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* API Debug Console */}
//         <section className="mb-12">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
//               <span className="w-4 h-4 rounded-full bg-purple-500 mr-3"></span>
//               System Logs
//             </h2>
//             <div className="flex space-x-3">
//               <button
//                 onClick={fetchIotData}
//                 className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 flex items-center"
//               >
//                 <FaSyncAlt className="h-5 w-5 mr-2" />
//                 Refresh
//               </button>
//               <button
//                 onClick={() => setApiLogs([])}
//                 className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 flex items-center"
//               >
//                 <FaTrash className="h-5 w-5 mr-2" />
//                 Clear
//               </button>
//             </div>
//           </div>
//           <div className="bg-gray-900 rounded-2xl p-6 font-mono text-sm h-80 overflow-y-auto shadow-inner">
//             {apiLogs.length === 0 ? (
//               <div className="text-gray-400 italic text-center py-10">
//                 No logs available. System interactions will appear here.
//               </div>
//             ) : (
//               apiLogs.map((log, index) => (
//                 <div
//                   key={index}
//                   className={`mb-3 border-l-4 pl-3 py-2 rounded-r-lg transition-colors duration-200 ${
//                     log.type === "error"
//                       ? "border-red-500 bg-red-900/20 text-red-300"
//                       : log.type === "success"
//                       ? "border-green-500 bg-green-900/20 text-green-300"
//                       : log.type === "warning"
//                       ? "border-yellow-500 bg-yellow-900/20 text-yellow-300"
//                       : "border-indigo-500 bg-indigo-900/20 text-gray-200"
//                   }`}
//                 >
//                   <span className="text-gray-500">[{log.timestamp}]</span>{" "}
//                   {log.message}
//                 </div>
//               ))
//             )}
//           </div>
//         </section>

//         {/* Raw Data */}
//         <section>
//           <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
//             <span className="w-4 h-4 rounded-full bg-orange-500 mr-3"></span>
//             Raw Data Feed
//           </h2>
//           <div className="bg-white rounded-2xl shadow-lg p-6 overflow-x-auto">
//             <pre className="text-sm text-gray-800 font-mono bg-gray-50 p-4 rounded-lg">
//               {iotData
//                 ? JSON.stringify(iotData, null, 2)
//                 : "Waiting for data..."}
//             </pre>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  FaBatteryThreeQuarters,
  FaSolarPanel,
  FaBolt,
  FaSyncAlt,
  FaTrash,
  FaExclamationCircle,
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

const Home = () => {
  const [iotData, setIotData] = useState(null);
  const [chartData, setChartData] = useState({
    battery: [],
    solar: [],
    power: [],
  });
  const [stats, setStats] = useState({
    battery: { avg: "0.00", min: "0.00", max: "0.00", current: "0.00" },
    solar: { avg: "0.00", min: "0.00", max: "0.00", current: "0.00" },
    power: { avg: "0.00", min: "0.00", max: "0.00", current: "0.00" },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiLogs, setApiLogs] = useState([]);
  const [flags, setFlags] = useState({
    field4: 0,
    field5: 0,
    field6: 0,
    field7: 0,
  });

  // Add log entry
  const addLog = (message, type = "info") => {
    const timestamp = new Date().toLocaleTimeString();
    setApiLogs((prev) => [...prev, { timestamp, message, type }].slice(-20));
  };

  // Fetch IoT data using proxy
  const fetchIotData = async () => {
    setLoading(true);
    setError(null);
    addLog("Fetching data from /api/fetch-seed-data");

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
        setLoading(false);
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

      // Prepare chart data and statistics
      const chartData = feeds.map((feed, index) => ({
        time: feed.created_at
          ? new Date(feed.created_at).toLocaleTimeString()
          : `T${index + 1}`,
        battery: Number(feed.field1) || 0,
        solar: Number(feed.field2) || 0,
        power: Number(feed.field3) || 0,
      }));

      setChartData({
        battery: chartData,
        solar: chartData,
        power: chartData,
      });

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
        solar: calcStats(chartData, "solar"),
        power: calcStats(chartData, "power"),
      });

      setLoading(false);
    } catch (error) {
      console.error("API Error:", error);
      let errorMessage = "Failed to fetch IoT data";

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
      setLoading(false);
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
        label: "Battery Level",
        value: `${stats.battery.current}%`,
        icon: <FaBatteryThreeQuarters />,
      },
      {
        label: "Solar Output",
        value: stats.solar.current,
        icon: <FaSolarPanel />,
      },
      {
        label: "Power Generated",
        value: `${stats.power.current} W`,
        icon: <FaBolt />,
      },
      {
        label: "Active Flags",
        value: Object.values(flags).filter((v) => v === 1).length,
        icon: <FaChartLine />,
      },
    ],
    [stats, flags]
  );

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8  font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
            Smart Solar Monitoring
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
            Real-time monitoring and control for your solar power system
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

        {/* Main Content */}
        <div className="space-y-8">
          {/* System Overview */}
          <div className="bg-[#1E2A47] border-2 border-[#2D3C60] rounded-sm p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <FaChartLine className="text-blue-400" /> System Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Battery Level */}
              <div className="bg-gray-900/50 rounded-lg p-3">
                <h3 className="text-sm sm:text-md font-semibold text-white mb-3 flex items-center gap-2">
                  <FaBatteryThreeQuarters className="text-cyan-400" /> Battery
                  Level
                </h3>
                {chartData.battery.length > 0 ? (
                  <>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={chartData.battery}
                          margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#374151"
                          />
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
                            labelStyle={{
                              fontWeight: "bold",
                              color: "#F3F4F6",
                            }}
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
                    <div className="mt-4">
                      <div className="w-full bg-gray-600 rounded-full h-3">
                        <div
                          className="h-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                          style={{ width: `${stats.battery.current}%` }}
                        ></div>
                      </div>
                      <p className="mt-2 text-sm text-white font-medium">
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
                  </>
                ) : (
                  <p className="text-gray-400 text-center">No data available</p>
                )}
              </div>

              {/* Solar Output */}
              <div className="bg-gray-900/50 rounded-lg p-3">
                <h3 className="text-sm sm:text-md font-semibold text-white mb-3 flex items-center gap-2">
                  <FaSolarPanel className="text-yellow-400" /> Solar Output
                </h3>
                {chartData.solar.length > 0 ? (
                  <>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={chartData.solar}
                          margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#374151"
                          />
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
                            labelStyle={{
                              fontWeight: "bold",
                              color: "#F3F4F6",
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="solar"
                            stroke="#eab308"
                            strokeWidth={2}
                            dot={{ r: 2 }}
                            activeDot={{ r: 6, strokeWidth: 2 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-white font-medium">
                        Current: {stats.solar.current}
                      </p>
                      <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-gray-400">
                        <div>
                          <p>Avg: {stats.solar.avg}</p>
                        </div>
                        <div>
                          <p>Min: {stats.solar.min}</p>
                        </div>
                        <div>
                          <p>Max: {stats.solar.max}</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-gray-400 text-center">No data available</p>
                )}
              </div>

              {/* Power Generated */}
              <div className="bg-gray-900/50 rounded-lg p-3">
                <h3 className="text-sm sm:text-md font-semibold text-white mb-3 flex items-center gap-2">
                  <FaBolt className="text-purple-400" /> Power Generated
                </h3>
                {chartData.power.length > 0 ? (
                  <>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={chartData.power}
                          margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#374151"
                          />
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
                            labelStyle={{
                              fontWeight: "bold",
                              color: "#F3F4F6",
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="power"
                            stroke="#a855f7"
                            fill="#a855f7"
                            fillOpacity={0.2}
                            strokeWidth={2}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4">
                      <div className="w-full bg-gray-600 rounded-full h-3">
                        <div
                          className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
                          style={{
                            width: `${Math.min(
                              (parseFloat(stats.power.current) / 1000) * 100,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                      <p className="mt-2 text-sm text-white font-medium">
                        {stats.power.current} W
                      </p>
                      <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-gray-400">
                        <div>
                          <p>Avg: {stats.power.avg} W</p>
                        </div>
                        <div>
                          <p>Min: {stats.power.min} W</p>
                        </div>
                        <div>
                          <p>Max: {stats.power.max} W</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-gray-400 text-center">No data available</p>
                )}
              </div>
            </div>
          </div>

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

          {/* System Logs */}
          <div className="bg-[#1E2A47] border-2 border-[#2D3C60] rounded-sm p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
                <FaChartLine className="text-purple-400" /> System Logs
              </h2>
              <div className="flex space-x-3">
                <button
                  onClick={fetchIotData}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 flex items-center"
                >
                  <FaSyncAlt className="h-4 w-4 mr-2" />
                  Refresh
                </button>
                <button
                  onClick={() => setApiLogs([])}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 flex items-center"
                >
                  <FaTrash className="h-4 w-4 mr-2" />
                  Clear
                </button>
              </div>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4 h-80 overflow-y-auto font-mono text-sm">
              {apiLogs.length === 0 ? (
                <div className="text-gray-400 italic text-center py-10">
                  No logs available. System interactions will appear here.
                </div>
              ) : (
                apiLogs.map((log, index) => (
                  <div
                    key={index}
                    className={`mb-2 border-l-4 pl-3 py-1 rounded-r-lg ${
                      log.type === "error"
                        ? "border-red-500 bg-red-900/20 text-red-300"
                        : log.type === "success"
                        ? "border-green-500 bg-green-900/20 text-green-300"
                        : log.type === "warning"
                        ? "border-yellow-500 bg-yellow-900/20 text-yellow-300"
                        : "border-indigo-500 bg-indigo-900/20 text-gray-200"
                    }`}
                  >
                    <span className="text-gray-500">[{log.timestamp}]</span>{" "}
                    {log.message}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Raw Data Feed */}
          <div className="bg-[#1E2A47] border-2 border-[#2D3C60] rounded-sm p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <FaChartLine className="text-orange-400" /> Raw Data Feed
            </h2>
            <div className="bg-gray-900/50 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-gray-300 font-mono">
                {iotData
                  ? JSON.stringify(iotData, null, 2)
                  : "Waiting for data..."}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
