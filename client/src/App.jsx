import React, { useEffect, useState, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import confetti from "canvas-confetti";
import Navigation from "./Page/Navigation";
import Contact from "./Page/Contact";
import Home from "./Page/Home";
import Dashboard from "./admin/Dashboard";
import Login from "./admin/Login";
import ForgetPassword from "./admin/ForgetPassword";
import PasswordReset from "./admin/PasswordReset";
import NotFound from "./Page/NotFound";
import { getAdmin } from "./store/AuthSlice";
import { getAllServices } from "./store/ServiceSlice";
import { getAllPosts } from "./store/PostSlice";
import "./App.css";
import About from "./Page/About";
import Work from "./Page/Work";

function App() {
  const dispatch = useDispatch();
  const [popUp, setPopUp] = useState(true); // Popup state
  const { isAdmin, loading } = useSelector((state) => state.auth);

  // Close the popup
  const closePopup = () => {
    setPopUp(false);
  };

  // Trigger confetti effect
  const triggerConfetti = () => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1", "#000"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  // Handle scroll locking
  useEffect(() => {
    if (popUp) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    setTimeout(() => {
      triggerConfetti();
    }, 500);
    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, [popUp]);

  // Fetch data and admin status
  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        await dispatch(getAdmin()).unwrap();
      } catch (error) {
        console.error("Failed to fetch admin status:", error);
      }
    };

    dispatch(getAllServices());
    dispatch(getAllPosts());
    fetchAdminStatus();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center min-h-screen">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <Navigation />
      {popUp && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <p className="mb-4 text-center font-medium">
              Welcome to the Art With Cremlon website!
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={triggerConfetti}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
              >
                Celebrate
              </button>
              <button
                onClick={closePopup}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <Suspense
        fallback={
          <div className="w-full flex items-center justify-center min-h-screen">
            Loading...
          </div>
        }
      >
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <>
                <Home />
                <Contact />
              </>
            }
          />
          <Route
            path="/admin"
            element={
              isAdmin ? <Navigate to="/admin/dashboard" replace /> : <Login />
            }
          />
          <Route
            path="/about"
            element={
               <About />
            }
          />
          <Route
            path="/contact"
            element={
               <Contact />
            }
          />
          <Route
            path="/work"
            element={
               <Work />
            }
          />
          <Route
            path="/admin/forgetPassword"
            element={
              isAdmin ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <ForgetPassword />
              )
            }
          />
          <Route
            path="/admin/password/reset/:resetToken"
            element={<PasswordReset />}
          />
          {/* Protected Admin Routes */}
          <Route
            path="/admin/dashboard/*"
            element={isAdmin ? <Dashboard /> : <Navigate to="/admin" replace />}
          />
          {/* Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
