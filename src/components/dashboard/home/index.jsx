/* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Home = () => {
//   const [iotData, setIotData] = useState(null);
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
//           timeout: 5000,
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
//           timeout: 5000,
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

//   // // Helper function to get status color
//   // const getStatusColor = (value) => {
//   //   return value ? "bg-green-500" : "bg-red-500";
//   // };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4 md:p-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <header className="mb-8 text-center">
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
//             🌱 Smart Solar Monitoring System
//           </h1>
//           <p className="text-gray-600">
//             Real-time monitoring and control of your solar power setup
//           </p>
//         </header>

//         {/* Status Cards */}
//         <section className="mb-8">
//           <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
//             <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
//             System Status
//           </h2>

//           {error && (
//             <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
//               <p className="font-bold">Error</p>
//               <p>{error}</p>
//               <button
//                 onClick={fetchIotData}
//                 className="mt-2 px-3 py-1 bg-red-500 text-white rounded text-sm"
//               >
//                 Retry
//               </button>
//             </div>
//           )}

//           {loading ? (
//             <div className="flex justify-center items-center h-40">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {/* Battery Card */}
//               <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 transition-all hover:shadow-lg">
//                 <div className="flex items-center mb-4">
//                   <div className="p-3 rounded-full bg-blue-100 text-blue-600">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
//                       />
//                     </svg>
//                   </div>
//                   <h3 className="ml-3 text-lg font-medium text-gray-900">
//                     Battery Percentage
//                   </h3>
//                 </div>
//                 <div className="flex items-end justify-between">
//                   <p className="text-3xl font-bold text-gray-800">
//                     {iotData?.field1 ?? "N/A"}%
//                   </p>
//                   <div className="w-full max-w-[120px] bg-gray-200 rounded-full h-2.5">
//                     <div
//                       className={`h-2.5 rounded-full ${
//                         iotData?.field1 > 70
//                           ? "bg-green-500"
//                           : iotData?.field1 > 30
//                           ? "bg-yellow-500"
//                           : "bg-red-500"
//                       }`}
//                       style={{ width: `${iotData?.field1 || 0}%` }}
//                     ></div>
//                   </div>
//                 </div>
//               </div>

//               {/* Solar Card */}
//               <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 transition-all hover:shadow-lg">
//                 <div className="flex items-center mb-4">
//                   <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
//                       />
//                     </svg>
//                   </div>
//                   <h3 className="ml-3 text-lg font-medium text-gray-900">
//                     Active Solar
//                   </h3>
//                 </div>
//                 <p className="text-3xl font-bold text-gray-800">
//                   {iotData?.field2 ?? "N/A"}
//                 </p>
//               </div>

//               {/* Power Generated Card */}
//               <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 transition-all hover:shadow-lg">
//                 <div className="flex items-center mb-4">
//                   <div className="p-3 rounded-full bg-purple-100 text-purple-600">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M13 10V3L4 14h7v7l9-11h-7z"
//                       />
//                     </svg>
//                   </div>
//                   <h3 className="ml-3 text-lg font-medium text-gray-900">
//                     Power Generated
//                   </h3>
//                 </div>
//                 <p className="text-3xl font-bold text-gray-800">
//                   {iotData?.field3 ?? "N/A"} W
//                 </p>
//               </div>
//             </div>
//           )}
//         </section>

//         {/* Control Panel */}
//         <section className="mb-8">
//           <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
//             <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
//             Device Control Panel
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             {["field4", "field5", "field6", "field7"].map((fieldKey) => (
//               <div
//                 key={fieldKey}
//                 className={`bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg border-l-4 ${
//                   flags[fieldKey] ? "border-green-500" : "border-gray-300"
//                 }`}
//               >
//                 <div className="p-5">
//                   <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
//                     {getFlagLabel(fieldKey).split(" ")[0]} {/* Icon */}
//                     <span className="ml-2">
//                       {getFlagLabel(fieldKey).split(" ").slice(1).join(" ")}
//                     </span>
//                   </h3>
//                   <div className="flex items-center justify-between">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs font-medium ${
//                         flags[fieldKey]
//                           ? "bg-green-100 text-green-800"
//                           : "bg-gray-100 text-gray-800"
//                       }`}
//                     >
//                       {flags[fieldKey] ? "ACTIVE" : "INACTIVE"}
//                     </span>
//                     <button
//                       onClick={() => toggleFlag(fieldKey)}
//                       className={`px-4 py-2 rounded-lg font-semibold text-white transition-colors ${
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
//         <section className="mb-8">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold text-gray-700 flex items-center">
//               <span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>
//               API Debug Console
//             </h2>
//             <div className="flex space-x-2">
//               <button
//                 onClick={fetchIotData}
//                 className="px-3 py-1 bg-blue-500 text-white rounded text-sm flex items-center"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-4 w-4 mr-1"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
//                   />
//                 </svg>
//                 Refresh
//               </button>
//               <button
//                 onClick={() => setApiLogs([])}
//                 className="px-3 py-1 bg-gray-500 text-white rounded text-sm flex items-center"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-4 w-4 mr-1"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                   />
//                 </svg>
//                 Clear
//               </button>
//             </div>
//           </div>
//           <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm h-64 overflow-y-auto">
//             {apiLogs.length === 0 ? (
//               <div className="text-gray-400 italic">
//                 No logs yet. API interactions will appear here.
//               </div>
//             ) : (
//               apiLogs.map((log, index) => (
//                 <div
//                   key={index}
//                   className={`mb-2 border-l-4 pl-2 ${
//                     log.type === "error"
//                       ? "border-red-500 text-red-400"
//                       : log.type === "success"
//                       ? "border-green-500 text-green-400"
//                       : log.type === "warning"
//                       ? "border-yellow-500 text-yellow-400"
//                       : "border-blue-500 text-gray-300"
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
//           <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
//             <span className="w-3 h-3 rounded-full bg-orange-500 mr-2"></span>
//             Raw Data
//           </h2>
//           <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
//             <pre className="text-sm text-gray-800">
//               {loading ? "Loading..." : JSON.stringify(iotData, null, 2)}
//             </pre>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Home;

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

// const Home = () => {
//   const [iotData, setIotData] = useState(null);
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
//           timeout: 5000,
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
//           timeout: 5000,
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

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8 font-sans">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <header className="mb-10 text-center">
//           <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">
//               Smart Solar
//             </span>{" "}
//             Monitoring
//           </h1>
//           <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
//             Real-time insights and control for your solar energy system
//           </p>
//         </header>

//         {/* Status Cards */}
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
//             {/* Battery Card */}
//             <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
//               <div className="flex items-center mb-4">
//                 <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
//                   <FaBatteryThreeQuarters className="h-6 w-6" />
//                 </div>
//                 <h3 className="ml-3 text-lg font-semibold text-gray-900">
//                   Battery Level
//                 </h3>
//               </div>
//               <div className="flex items-end justify-between">
//                 <p className="text-4xl font-bold text-gray-900">
//                   {iotData?.field1 ?? "N/A"}%
//                 </p>
//                 <div className="w-full max-w-[140px] bg-gray-200 rounded-full h-3">
//                   <div
//                     className={`h-3 rounded-full transition-all duration-500 ${
//                       iotData?.field1 > 70
//                         ? "bg-green-500"
//                         : iotData?.field1 > 30
//                         ? "bg-yellow-500"
//                         : "bg-red-500"
//                     }`}
//                     style={{ width: `${iotData?.field1 || 0}%` }}
//                   ></div>
//                 </div>
//               </div>
//             </div>

//             {/* Solar Card */}
//             <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
//               <div className="flex items-center mb-4">
//                 <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
//                   <FaSolarPanel className="h-6 w-6" />
//                 </div>
//                 <h3 className="ml-3 text-lg font-semibold text-gray-900">
//                   Solar Output
//                 </h3>
//               </div>
//               <p className="text-4xl font-bold text-gray-900">
//                 {iotData?.field2 ?? "N/A"}
//               </p>
//             </div>

//             {/* Power Generated Card */}
//             <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
//               <div className="flex items-center mb-4">
//                 <div className="p-3 rounded-full bg-purple-100 text-purple-600">
//                   <FaBolt className="h-6 w-6" />
//                 </div>
//                 <h3 className="ml-3 text-lg font-semibold text-gray-900">
//                   Power Generated
//                 </h3>
//               </div>
//               <p className="text-4xl font-bold text-gray-900">
//                 {iotData?.field3 ?? "N/A"} W
//               </p>
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
//                 className={`bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-l-4 ${
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

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBatteryThreeQuarters,
  FaSolarPanel,
  FaBolt,
  FaSyncAlt,
  FaTrash,
  FaExclamationCircle,
} from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Home = () => {
  const [iotData, setIotData] = useState(null);
  const [chartData, setChartData] = useState({
    battery: { labels: [], datasets: [] },
    solar: { labels: [], datasets: [] },
    power: { labels: [], datasets: [] },
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
      const labels = feeds.map((feed, index) =>
        feed.created_at
          ? new Date(feed.created_at).toLocaleTimeString()
          : `T${index + 1}`
      );
      const batteryData = feeds.map((feed) => Number(feed.field1) || 0);
      const solarData = feeds.map((feed) => Number(feed.field2) || 0);
      const powerData = feeds.map((feed) => Number(feed.field3) || 0);

      // Calculate statistics
      const calcStats = (data) => {
        if (!data || data.length === 0) {
          return { avg: "0.00", min: "0.00", max: "0.00", current: "0.00" };
        }
        return {
          avg: (data.reduce((sum, val) => sum + val, 0) / data.length).toFixed(
            2
          ),
          min: Math.min(...data).toFixed(2),
          max: Math.max(...data).toFixed(2),
          current: data[data.length - 1].toFixed(2),
        };
      };

      setChartData({
        battery: {
          labels,
          datasets: [
            {
              label: "Battery Level (%)",
              data: batteryData,
              borderColor: "rgb(59, 130, 246)",
              backgroundColor: "rgba(59, 130, 246, 0.5)",
              tension: 0.4,
            },
          ],
        },
        solar: {
          labels,
          datasets: [
            {
              label: "Solar Output",
              data: solarData,
              borderColor: "rgb(234, 179, 8)",
              backgroundColor: "rgba(234, 179, 8, 0.5)",
              tension: 0.4,
            },
          ],
        },
        power: {
          labels,
          datasets: [
            {
              label: "Power Generated (W)",
              data: powerData,
              borderColor: "rgb(168, 85, 247)",
              backgroundColor: "rgba(168, 85, 247, 0.5)",
              tension: 0.4,
            },
          ],
        },
      });

      setStats({
        battery: calcStats(batteryData),
        solar: calcStats(solarData),
        power: calcStats(powerData),
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
      field4: "🌞 Solar Flag 1",
      field5: "🔆 Solar Flag 2",
      field6: "🔌 Inverter Flag",
      field7: "💡 Load Flag",
    };
    return labels[fieldKey] || fieldKey;
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className=" py-8 px-4 sm:px-6 lg:px-8 font-sans  bg-gradient-to-r from-[ #021430] via-[#0f1c47] to-[ #021430] ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-20 text-center px-4">
          <p className="px-6 py-2 bg-transparent text-white mx-auto w-fit rounded-full font-semibold shadow-md border border-white/20 backdrop-blur-sm">
            Dashboard
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white drop-shadow-xl leading-tight">
            Smart Solar Monitoring
          </h1>
        </header>

        {/* System Overview - Charts and Stats */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <span className="w-4 h-4 rounded-full bg-indigo-500 mr-3"></span>
            System Overview
          </h2>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-5 mb-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <FaExclamationCircle className="h-6 w-6 text-red-500 mr-3" />
                <div>
                  <p className="font-semibold text-red-800">Error</p>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
              <button
                onClick={fetchIotData}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                Retry Connection
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Battery Chart and Dashboard Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                  <FaBatteryThreeQuarters className="h-6 w-6" />
                </div>
                <h3 className="ml-3 text-lg font-semibold text-gray-900">
                  Battery Level
                </h3>
              </div>
              {chartData.battery.labels.length > 0 ? (
                <>
                  <Line
                    data={chartData.battery}
                    options={{
                      ...chartOptions,
                      plugins: {
                        ...chartOptions.plugins,
                        title: {
                          display: true,
                          text: "Battery Level Over Time",
                        },
                      },
                    }}
                  />
                  <div className="mt-4">
                    <div className="flex justify-center">
                      <div className="w-32 h-32">
                        <CircularProgressbar
                          value={parseFloat(stats.battery.current)}
                          text={`${stats.battery.current}%`}
                          styles={buildStyles({
                            textColor: "#1f2937",
                            pathColor:
                              parseFloat(stats.battery.current) > 70
                                ? "#10b981"
                                : parseFloat(stats.battery.current) > 30
                                ? "#f59e0b"
                                : "#ef4444",
                            trailColor: "#e5e7eb",
                          })}
                        />
                      </div>
                    </div>
                    <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        Historical Statistics
                      </h4>
                      <div className="grid grid-cols-3 gap-2 text-sm text-gray-600">
                        <div>
                          <p className="font-medium">Avg</p>
                          <p>{stats.battery.avg}%</p>
                        </div>
                        <div>
                          <p className="font-medium">Min</p>
                          <p>{stats.battery.min}%</p>
                        </div>
                        <div>
                          <p className="font-medium">Max</p>
                          <p>{stats.battery.max}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-gray-600 text-center">No data available</p>
              )}
            </div>

            {/* Solar Chart and Table Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                  <FaSolarPanel className="h-6 w-6" />
                </div>
                <h3 className="ml-3 text-lg font-semibold text-gray-900">
                  Solar Output
                </h3>
              </div>
              {chartData.solar.labels.length > 0 ? (
                <>
                  <Line
                    data={chartData.solar}
                    options={{
                      ...chartOptions,
                      plugins: {
                        ...chartOptions.plugins,
                        title: {
                          display: true,
                          text: "Solar Output Over Time",
                        },
                      },
                    }}
                  />
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                      Historical Statistics
                    </h4>
                    <table className="w-full text-sm text-gray-600">
                      <tbody>
                        <tr>
                          <td className="py-1 font-medium">Average</td>
                          <td className="py-1 text-right">{stats.solar.avg}</td>
                        </tr>
                        <tr>
                          <td className="py-1 font-medium">Minimum</td>
                          <td className="py-1 text-right">{stats.solar.min}</td>
                        </tr>
                        <tr>
                          <td className="py-1 font-medium">Maximum</td>
                          <td className="py-1 text-right">{stats.solar.max}</td>
                        </tr>
                        <tr>
                          <td className="py-1 font-medium">Current</td>
                          <td className="py-1 text-right">
                            {stats.solar.current}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <p className="text-gray-600 text-center">No data available</p>
              )}
            </div>

            {/* Power Chart and Dashboard Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <FaBolt className="h-6 w-6" />
                </div>
                <h3 className="ml-3 text-lg font-semibold text-gray-900">
                  Power Generated
                </h3>
              </div>
              {chartData.power.labels.length > 0 ? (
                <>
                  <Line
                    data={chartData.power}
                    options={{
                      ...chartOptions,
                      plugins: {
                        ...chartOptions.plugins,
                        title: {
                          display: true,
                          text: "Power Generated Over Time",
                        },
                      },
                    }}
                  />
                  <div className="mt-4">
                    <div className="flex justify-center">
                      <div className="w-32 h-32">
                        <CircularProgressbar
                          value={parseFloat(stats.power.current)}
                          maxValue={1000} // Adjust based on your max power expectation
                          text={`${stats.power.current}W`}
                          styles={buildStyles({
                            textColor: "#1f2937",
                            pathColor: "#8b5cf6",
                            trailColor: "#e5e7eb",
                          })}
                        />
                      </div>
                    </div>
                    <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        Historical Statistics
                      </h4>
                      <div className="grid grid-cols-3 gap-2 text-sm text-gray-600">
                        <div>
                          <p className="font-medium">Avg</p>
                          <p>{stats.power.avg} W</p>
                        </div>
                        <div>
                          <p className="font-medium">Min</p>
                          <p>{stats.power.min} W</p>
                        </div>
                        <div>
                          <p className="font-medium">Max</p>
                          <p>{stats.power.max} W</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-gray-600 text-center">No data available</p>
              )}
            </div>
          </div>
        </section>

        {/* Control Panel */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <span className="w-4 h-4 rounded-full bg-green-500 mr-3"></span>
            Control Center
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {["field4", "field5", "field6", "field7"].map((fieldKey) => (
              <div
                key={fieldKey}
                className={`bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl border-l-4 ${
                  flags[fieldKey] ? "border-green-500" : "border-gray-200"
                }`}
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    {getFlagLabel(fieldKey).split(" ")[0]}
                    <span className="ml-2">
                      {getFlagLabel(fieldKey).split(" ").slice(1).join(" ")}
                    </span>
                  </h3>
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                        flags[fieldKey]
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {flags[fieldKey] ? "ACTIVE" : "INACTIVE"}
                    </span>
                    <button
                      onClick={() => toggleFlag(fieldKey)}
                      className={`px-4 py-2 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-105 ${
                        flags[fieldKey]
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-gray-600 hover:bg-gray-700"
                      }`}
                    >
                      {flags[fieldKey] ? "Turn OFF" : "Turn ON"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* API Debug Console */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
              <span className="w-4 h-4 rounded-full bg-purple-500 mr-3"></span>
              System Logs
            </h2>
            <div className="flex space-x-3">
              <button
                onClick={fetchIotData}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 flex items-center"
              >
                <FaSyncAlt className="h-5 w-5 mr-2" />
                Refresh
              </button>
              <button
                onClick={() => setApiLogs([])}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 flex items-center"
              >
                <FaTrash className="h-5 w-5 mr-2" />
                Clear
              </button>
            </div>
          </div>
          <div className="bg-gray-900 rounded-2xl p-6 font-mono text-sm h-80 overflow-y-auto shadow-inner">
            {apiLogs.length === 0 ? (
              <div className="text-gray-400 italic text-center py-10">
                No logs available. System interactions will appear here.
              </div>
            ) : (
              apiLogs.map((log, index) => (
                <div
                  key={index}
                  className={`mb-3 border-l-4 pl-3 py-2 rounded-r-lg transition-colors duration-200 ${
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
        </section>

        {/* Raw Data */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <span className="w-4 h-4 rounded-full bg-orange-500 mr-3"></span>
            Raw Data Feed
          </h2>
          <div className="bg-white rounded-2xl shadow-lg p-6 overflow-x-auto">
            <pre className="text-sm text-gray-800 font-mono bg-gray-50 p-4 rounded-lg">
              {iotData
                ? JSON.stringify(iotData, null, 2)
                : "Waiting for data..."}
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
