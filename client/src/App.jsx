import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./admin/Login";
import Register from "./admin/Register";
import Dashboard from "./admin/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import ForgetPassword from "./admin/ForgetPassword";
import Home from "./Page/Home";
import PasswordReset from "./admin/PasswordReset";
import NotFound from "./Page/NotFound";
import { useEffect } from "react";
import { getAdmin } from "./store/AuthSlice";

function App() {
  const dispatch = useDispatch();
  const { isAdmin, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        await dispatch(getAdmin()).unwrap();
      } catch (error) {
        console.error("Failed to fetch admin status:", error);
      }
    };
    fetchAdminStatus();
  }, [dispatch]);

  if (loading) {
    // Show a loading screen until the admin status is fetched
    return (
      <div className="w-full flex items-center justify-center min-h-screen">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route
          path="/admin"
          element={isAdmin ? <Navigate to="/admin/dashboard" replace /> : <Login />}
        />
        <Route
          path="/admin/register"
          element={isAdmin ? <Navigate to="/admin/dashboard" replace /> : <Register />}
        />
        <Route
          path="/admin/forgetPassword"
          element={isAdmin ? <Navigate to="/admin/dashboard" replace /> : <ForgetPassword />}
        />
        <Route path="/admin/password/reset/:resetToken" element={<PasswordReset />} />

        {/* Protected Admin Routes */}
        {isAdmin && <Route path="/admin/dashboard/*" element={<Dashboard />} />}

        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
