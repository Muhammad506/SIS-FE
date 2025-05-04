import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";

const VerifyCode = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code) {
      return toast.error("Verification code is required.");
    }

    setLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/email/verify-code`, {
        email,
        code,
      });

      localStorage.setItem("codeVerified", "true");

      toast.success("Code verified successfully!");
      setTimeout(() => navigate("/reset-password"), 1000);
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
      <div className="w-full max-w-xl bg-[#1E2A47] border-2 border-[#2D3C60] rounded-md shadow-md p-8 sm:p-10 relative">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-gray-300 cursor-pointer hover:text-white flex items-center gap-1 transition"
        >
          <IoIosArrowRoundBack className="w-7 h-auto" />
          Back
        </button>

        {/* Logo */}
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

        <h2 className="text-2xl sm:text-4xl font-semibold text-center text-gray-100 mb-6 sm:mb-10">
          Verify Your Code
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 font-medium text-gray-100">
              Verification Code
            </label>
            <input
              type="text"
              placeholder="Enter code"
              className="w-full p-3 bg-[#1E2A47] border border-gray-400 rounded-md  text-white focus:outline-none focus:border-2 focus:border-yellow-500"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 cursor-pointer rounded-md font-semibold text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green hover:brightness-110"
            }`}
          >
            {loading ? "Verifying..." : "Verify Code"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyCode;
