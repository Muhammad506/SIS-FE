import React, { useEffect, useState } from "react";
import ToggleSwitch from "../toggle-switch";
import { getLatestData, updateRelayFlag } from "../../../api/api.js";

const ActivePlates = () => {
  const [activeSolar, setActiveSolar] = useState(0);
  const [flag4, setFlag4] = useState("0");
  const [flag5, setFlag5] = useState("0");

  useEffect(() => {
    const fetchData = async () => {
      const latest = await getLatestData();
      if (latest) {
        setActiveSolar(latest.field1); // change `field1` to actual solar count field
        setFlag4(latest.field4);
        setFlag5(latest.field5);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const handleToggle = async (field, value) => {
    await updateRelayFlag(field, value);
    if (field === 4) {
      setFlag4(value.toString());
    } else if (field === 5) {
      setFlag5(value.toString());
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Solar Plates Status
          </h2>
          <div className="flex items-center">
            <span className="mr-2 text-sm font-medium text-gray-600 dark:text-gray-300">
              {activeSolar > 0 ? "ACTIVE" : "INACTIVE"}
            </span>
            <div
              className={`w-3 h-3 rounded-full ${
                activeSolar > 0 ? "bg-green-500 animate-pulse" : "bg-gray-400"
              }`}
            ></div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 dark:text-gray-300 font-medium">
              Active Plates
            </span>
            <span className="text-lg font-bold text-gray-800 dark:text-white">
              {activeSolar || "0"}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-yellow-400 h-2.5 rounded-full"
              style={{
                width: `${Math.min((activeSolar / 10) * 100, 100)}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span className="text-gray-700 dark:text-gray-200 font-medium">
              Plate Monitoring
            </span>
            <ToggleSwitch
              label="Solar Flag 1"
              field={4}
              value={flag4}
              onToggle={handleToggle}
              className="ml-2"
            />
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span className="text-gray-700 dark:text-gray-200 font-medium">
              Performance Boost
            </span>
            <ToggleSwitch
              label="Solar Flag 2"
              field={5}
              value={flag5}
              onToggle={handleToggle}
              className="ml-2"
            />
          </div>
        </div>

        {activeSolar > 0 && (
          <div className="mt-6 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800/50">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-yellow-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm text-yellow-600 dark:text-yellow-400">
                {activeSolar > 5
                  ? "High solar activity detected"
                  : "Normal operation"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivePlates;
