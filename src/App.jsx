import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import NavBar from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/home";
import About from "./pages/about";
import Features from "./pages/features";
import Contact from "./pages/contact";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import ActivePlates from "./components/dashboard/active-plates";
import ForgotPassword from "./pages/forgot-pass";
import ResetPassword from "./pages/reset-pass";

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const hideNavAndFooterPaths = [
    "/login",
    "/register",
    "/forgot-password",
    "/dashboard",
    "/reset-password/",
  ];

  const shouldHide = hideNavAndFooterPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {!shouldHide && <NavBar />}
      <Routes>
        {/* Normal public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Dashboard with nested pages */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route
            index
            element={<div className="p-4">Welcome to Dashboard</div>}
          />
          <Route path="active-plates" element={<ActivePlates />} />
          {/* You can add more dashboard sub-pages here similarly */}
        </Route>
      </Routes>
      {!shouldHide && <Footer />}
    </>
  );
};

export default App;
