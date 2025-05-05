import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdEmail } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ message: "", type: "" });

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setAlert({ message: "Please fill in all fields", type: "error" });
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setAlert({ message: "Passwords do not match", type: "error" });
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmation: formData.confirmPassword,
      });

      setAlert({ message: "Registration successful!", type: "success" });
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setAlert({
        message: err.response?.data?.error || "Registration failed",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row text-white overflow-hidden">
      {/* Back Button */}
      <Link
        to="/"
        className="absolute left-4 top-4 md:top-4 z-50 text-white border border-white text-xl bg-gradient hover:scale-105 duration-500 font-semibold rounded-3xl px-4 py-1  bg-opacity-50 shadow-lg hover:bg-opacity-70 transition"
      >
        Back
      </Link>

      {/* Left Image Section */}
      <div className="w-full md:w-[60%] lg:w-[70%] xl:w-[75%] hidden md:block">
        <img
          src="LR-bg.svg"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Form Section */}
      <div className="flex flex-col items-center h-screen justify-center w-full max-w-md p-6 bg-[#0F172A] shadow-xl">
        <img src="Logo.svg" alt="Logo" className="w-64 mb-4 mt-9 md:mt-0" />

        <h1 className="font-bold text-3xl md:text-4xl text-yellow text-center mb-4">
          Register
        </h1>
        <p className="text-gray-300 max-w-xs mb-6 px-4 text-center">
          Start generating your thoughts with Solar Intelli Solutions.
        </p>

        <form className="w-full max-w-xs space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label
              className="block text-gray-300 text-sm font-semibold mb-1"
              htmlFor="name"
            >
              Name
            </label>
            <div className="flex items-center border border-gray-600 rounded-lg bg-gradient-to-t from-[#1C204B] to-[#10172D] py-2 px-3 shadow-md">
              <CgProfile className="text-yellow mr-2" />
              <input
                className="bg-transparent w-full text-white placeholder-gray-400 focus:outline-none"
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              className="block text-gray-300 text-sm font-semibold mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <div className="flex items-center border border-gray-600 rounded-lg bg-gradient-to-t from-[#1C204B] to-[#10172D] py-2 px-3 shadow-md">
              <MdEmail className="text-yellow mr-2" />
              <input
                className="bg-transparent w-full text-white placeholder-gray-400 focus:outline-none"
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              className="block text-gray-300 text-sm font-semibold mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <div className="flex items-center border border-gray-600 rounded-lg bg-gradient-to-t from-[#1C204B] to-[#10172D] py-2 px-3 shadow-md relative">
              <RiLock2Fill className="text-yellow mr-2" />
              <input
                className="bg-transparent w-full text-white placeholder-gray-400 focus:outline-none"
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <div
                className="absolute right-3 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              className="block text-gray-300 text-sm font-semibold mb-1"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="flex items-center border border-gray-600 rounded-lg bg-gradient-to-t from-[#1C204B] to-[#10172D] py-2 px-3 shadow-md relative">
              <RiLock2Fill className="text-yellow mr-2" />
              <input
                className="bg-transparent w-full text-white placeholder-gray-400 focus:outline-none"
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <div
                className="absolute right-3 text-gray-400 cursor-pointer"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </div>
            </div>
          </div>

          {/* Button and Alert */}
          <div className="flex flex-col justify-center items-center space-y-2">
            <button
              type="submit"
              className="w-full bg-yellow text-black cursor-pointer px-8 py-2 rounded-xl font-semibold text-lg hover:brightness-110 transition disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>

            {/* Inline Alert */}
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

          <p className="mt-3 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-yellow hover:brightness-110 transition-colors"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Register;
