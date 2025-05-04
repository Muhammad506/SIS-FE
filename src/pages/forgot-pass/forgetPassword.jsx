import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendCode = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email address.");
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/email/send-code`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("resetEmail", email);
        toast.success(data.message);
        setTimeout(() => {
          window.location.href = "/verify-code";
        }, 1000);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Something went wrong: " + err.message);
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
              className="h-16 w-auto transition-transform  cursor-pointer"
            />
          </Link>
        </div>

        <hr className="my-5 sm:my-10 text-gray-600" />

        <h2 className="text-2xl sm:text-4xl font-semibold text-center text-gray-100 mb-6 sm:mb-10">
          Reset Your Password
        </h2>

        <form onSubmit={handleSendCode} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 font-medium text-gray-100"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 bg-[#1E2A47] border border-gray-400 rounded-md  text-white focus:outline-none focus:border-2 focus:border-yellow-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-gray-500 cursor-not-allowed" : "bg-green"
            } text-white py-3 rounded-md font-semibold cursor-pointer hover:brightness-110 transition duration-300`}
          >
            {loading ? "Sending..." : "Send Verification Code"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
