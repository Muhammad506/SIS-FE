import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ message: "", type: "" });

    if (!email || !password) {
      setAlert({
        message: "Please fill in all fields",
        type: "error",
      });
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        // "http://localhost:5000/api/auth/login",
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email, password }
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data.user.name,
          email: data.user.email,
        })
      );

      setAlert({
        message: "Login successful!",
        type: "success",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      setAlert({
        message: error.response?.data?.error || "Invalid credentials",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row text-white bg-[#0F172A]">
      {/* Back button */}
      <Link
        to="/"
        className="absolute left-4 top-10 md:top-4 z-50 text-white border border-white text-xl bg-gradient hover:scale-105 duration-500 font-semibold rounded-3xl px-4 py-1  bg-opacity-50 shadow-lg hover:bg-opacity-70 transition"
      >
        Back
      </Link>

      {/* Left image */}
      <div className="hidden md:block w-full md:w-[60%] lg:w-[70%] xl:w-[75%]">
        <img
          src="LR-bg.svg"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right form */}
      <div className="flex flex-col items-center h-screen justify-center w-full max-w-md p-6 bg-[#0F172A] shadow-xl">
        <img src="Logo.svg" alt="Logo" className="w-64 mb-4 mt-9 md:mt-0" />
        <h1 className="font-bold text-3xl md:text-4xl xl:text-5xl text-yellow mb-4 text-center">
          Login
        </h1>
        <p className="text-gray-300 max-w-xs mb-6 text-center px-4">
          Start generating your thoughts with Solar Intelli Solutions.
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-300 font-semibold mb-1"
            >
              Email
            </label>
            <div className="flex items-center border border-gray-600 rounded-lg bg-gradient-to-t from-[#1C204B] to-[#10172D] py-2 px-3 shadow-md">
              <MdEmail className="text-yellow mr-2" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none bg-transparent w-full text-white py-1 px-2 placeholder-gray-400 focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-300 font-semibold mb-1"
            >
              Password
            </label>
            <div className="flex items-center border border-gray-600 rounded-lg bg-gradient-to-t from-[#1C204B] to-[#10172D] py-2 px-3 shadow-md relative">
              <RiLock2Fill className="text-yellow mr-2" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none bg-transparent w-full text-white py-1 px-2 placeholder-gray-400 focus:outline-none"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3  text-gray-400  cursor-pointer focus:outline-none"
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>
            </div>
          </div>
          <div className="text-right mt-2">
            <Link
              to="/forgot-password"
              className="text-sm text-yellow hover:underline hover:brightness-110"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="flex flex-col justify-center items-center pt-2 px-2 space-y-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow text-black cursor-pointer px-8 py-2 rounded-xl font-bold text-lg hover:brightness-110 transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Alert Message */}
            {alert.message && (
              <p
                className={`text-sm text-center ${
                  alert.type === "success" ? "text-green" : "text-red-400"
                }`}
              >
                {alert.message}
              </p>
            )}
          </div>

          <p className="mt-4 text-center">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-yellow hover:brightness-110 transition-colors"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
