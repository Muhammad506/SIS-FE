// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import { Link, useNavigate } from "react-router-dom";
// import { IoIosArrowRoundBack } from "react-icons/io";

// const ResetPassword = () => {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const email = localStorage.getItem("resetEmail");

//   useEffect(() => {
//     if (!localStorage.getItem("codeVerified")) {
//       toast.error("Please verify the code first.");
//       navigate("/verify-code");
//     }
//   }, [navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!password || !confirmPassword) {
//       return toast.error("All fields are required.");
//     }

//     if (password !== confirmPassword) {
//       return toast.error("Passwords do not match.");
//     }

//     const passwordRegex =
//       /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;
//     if (!passwordRegex.test(password)) {
//       return toast.error(
//         "Password must be at least 6 characters with 1 uppercase, 1 number, and 1 special character."
//       );
//     }

//     setLoading(true);
//     try {
//       await axios.post(`${import.meta.env.VITE_API_URL}/email/reset-password`, {
//         email,
//         password,
//       });

//       toast.success("Password reset successfully!");
//       localStorage.removeItem("resetEmail");
//       localStorage.removeItem("codeVerified");
//       setTimeout(() => navigate("/login"), 1500);
//     } catch (err) {
//       const msg = err.response?.data?.message || "Something went wrong";
//       toast.error(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient px-4 py-8">
//       <Toaster position="top-right" />
//       <div className="w-full relative max-w-xl bg-[#1E2A47] border-2 border-[#2D3C60] rounded-md shadow-md p-8 sm:p-10">
//         {/* Back Button */}
//         <button
//           onClick={() => navigate(-1)}
//           className="absolute top-4 left-4 text-gray-300 cursor-pointer hover:text-white flex items-center gap-1 transition"
//         >
//           <IoIosArrowRoundBack className="w-7 h-auto" />
//           Back
//         </button>

//         <div className="flex justify-center mt-4">
//           <Link to="/" className="block">
//             <img
//               src="/Logo.svg"
//               alt="Logo"
//               className="h-16 w-auto transition-transform  cursor-pointer"
//             />
//           </Link>
//         </div>
//         <hr className="my-5 sm:my-10 text-gray-600" />

//         <h2 className="text-2xl sm:text-4xl font-semibold text-center text-gray-100 mb-8 sm:mb-10">
//           Create New Password
//         </h2>

//         <form className="space-y-6" onSubmit={handleSubmit}>
//           <div>
//             <label className="block mb-2 text-gray-100 font-medium">
//               New Password
//             </label>
//             <input
//               type="password"
//               placeholder="Enter new password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 bg-[#1E2A47] border border-gray-400 rounded-md  text-white focus:outline-none focus:border-2 focus:border-yellow-500"
//             />
//           </div>

//           <div>
//             <label className="block mb-2 text-gray-100 font-medium">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               placeholder="Confirm new password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="w-full p-3 bg-[#1E2A47] border border-gray-400 rounded-md  text-white focus:outline-none focus:border-2 focus:border-yellow-500"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full bg-green cursor-pointer text-white py-3 rounded-md font-semibold transition duration-300 ${
//               loading ? "opacity-70 cursor-not-allowed" : "hover:brightness-110"
//             }`}
//           >
//             {loading ? "Processing..." : "Reset Password"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;

import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FiEye, FiEyeOff } from "react-icons/fi"; // 👈 Import icons

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 for new password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // 👈 for confirm password
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail");

  useEffect(() => {
    if (!localStorage.getItem("codeVerified")) {
      toast.error("Please verify the code first.");
      navigate("/verify-code");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      return toast.error("All fields are required.");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;
    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password must be at least 6 characters with 1 uppercase, 1 number, and 1 special character."
      );
    }

    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/email/reset-password`, {
        email,
        password,
      });

      toast.success("Password reset successfully!");
      localStorage.removeItem("resetEmail");
      localStorage.removeItem("codeVerified");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient px-4 py-8">
      <Toaster position="top-right" />
      <div className="w-full relative max-w-xl bg-[#1E2A47] border-2 border-[#2D3C60] rounded-md shadow-md p-8 sm:p-10">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-gray-300 cursor-pointer hover:text-white flex items-center gap-1 transition"
        >
          <IoIosArrowRoundBack className="w-7 h-auto" />
          Back
        </button>

        <div className="flex justify-center mt-4">
          <Link to="/" className="block">
            <img
              src="/Logo.svg"
              alt="Logo"
              className="h-16 w-auto transition-transform cursor-pointer"
            />
          </Link>
        </div>
        <hr className="my-5 sm:my-10 text-gray-600" />

        <h2 className="text-2xl sm:text-4xl font-semibold text-center text-gray-100 mb-8 sm:mb-10">
          Create New Password
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* New Password Field */}
          <div>
            <label className="block mb-2 text-gray-100 font-medium">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-[#1E2A47] border border-gray-400 rounded-md text-white focus:outline-none focus:border-2 focus:border-yellow-500 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block mb-2 text-gray-100 font-medium">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 bg-[#1E2A47] border border-gray-400 rounded-md text-white focus:outline-none focus:border-2 focus:border-yellow-500 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-green cursor-pointer text-white py-3 rounded-md font-semibold transition duration-300 ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:brightness-110"
            }`}
          >
            {loading ? "Processing..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
