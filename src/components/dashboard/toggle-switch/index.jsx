import React, { useState, useRef, useEffect } from "react";

const ToggleSwitch = ({ label, field, value, onToggle, disabled = false }) => {
  const [isOn, setIsOn] = useState(value === "1");
  const [ripple, setRipple] = useState(false);
  const switchRef = useRef(null);

  useEffect(() => {
    setIsOn(value === "1");
  }, [value]);

  const handleToggle = () => {
    if (disabled) return;

    // Trigger ripple effect
    setRipple(true);
    setTimeout(() => setRipple(false), 600);

    const newValue = !isOn;
    setIsOn(newValue);
    onToggle(field, newValue ? 1 : 0);
  };

  const handleKeyDown = (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div
      className={`flex items-center justify-between py-3 px-1 ${
        disabled ? "opacity-60" : ""
      }`}
      ref={switchRef}
    >
      <span className="text-gray-700 dark:text-gray-300 font-medium text-sm md:text-base">
        {label}
      </span>

      <label
        className={`relative inline-flex items-center cursor-pointer ${
          disabled ? "cursor-not-allowed" : ""
        }`}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
      >
        <input
          type="checkbox"
          className="sr-only"
          checked={isOn}
          onChange={handleToggle}
          disabled={disabled}
          aria-label={label}
        />

        {/* Ripple effect container */}
        {ripple && (
          <span className="absolute -inset-2 bg-blue-100 dark:bg-blue-900 rounded-full opacity-0 animate-ripple"></span>
        )}

        {/* Track */}
        <div
          className={`
          w-12 h-6 rounded-full shadow-inner transition-colors duration-300
          ${
            isOn
              ? "bg-blue-500 dark:bg-blue-600"
              : "bg-gray-300 dark:bg-gray-600"
          }
          ${disabled ? "opacity-70" : ""}
        `}
        >
          {/* Thumb */}
          <div
            className={`
            absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md
            transform transition-transform duration-300
            ${isOn ? "translate-x-6" : ""}
          `}
          >
            {/* Inner icon (optional) */}
            {isOn ? (
              <svg
                className="w-3 h-3 text-blue-500 absolute top-1 left-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="w-3 h-3 text-gray-400 absolute top-1 left-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        </div>
      </label>
    </div>
  );
};

export default ToggleSwitch;
