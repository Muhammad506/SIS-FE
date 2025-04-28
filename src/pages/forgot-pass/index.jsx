import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ message: "", type: "" });

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/forgot-password`,
        { email }
      );
      setAlert({
        message: data.message || "Check your email!",
        type: "success",
      });
    } catch (error) {
      setAlert({
        message: error.response?.data?.error || "Something went wrong",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0F172A] text-white">
      <div className="max-w-md w-full p-6 bg-[#0F172A] border border-gray-700 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-yellow mb-6">
          Forgot Password
        </h2>

        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-300 font-semibold mb-1"
            >
              Enter your email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded-lg bg-gradient-to-t from-[#1C204B] to-[#10172D] border border-gray-600 text-white focus:outline-none placeholder-gray-400"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow cursor-pointer text-black font-bold py-2 rounded-lg hover:brightness-110 transition disabled:opacity-70"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          {/* Alert Message */}
          {alert.message && (
            <p
              className={`text-sm text-center mt-2 ${
                alert.type === "success" ? "text-green" : "text-red-400"
              }`}
            >
              {alert.message}
            </p>
          )}
        </form>

        <div className="text-center mt-4">
          <Link
            to="/login"
            className="text-sm text-yellow hover:underline hover:brightness-110"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
