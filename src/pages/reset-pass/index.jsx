import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams(); // get token from URL
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ message: "", type: "" });

    if (password !== confirmPassword) {
      setAlert({ message: "Passwords do not match", type: "error" });
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/reset-password/${token}`,
        { password }
      );

      setAlert({
        message: data.message || "Password reset successfully!",
        type: "success",
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
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
          Reset Password
        </h2>

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-gray-300 font-semibold mb-1"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded-lg bg-gradient-to-t from-[#1C204B] to-[#10172D] border border-gray-600 text-white focus:outline-none placeholder-gray-400"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-gray-300 font-semibold mb-1"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-2 rounded-lg bg-gradient-to-t from-[#1C204B] to-[#10172D] border border-gray-600 text-white focus:outline-none placeholder-gray-400"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow cursor-pointer text-black font-bold py-2 rounded-lg hover:brightness-110 transition disabled:opacity-70"
          >
            {loading ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;
