import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, Navigate, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Home, Server, Plus, LogOut, Menu, Image } from "lucide-react";
import Service from "./Service";
import AddService from "./AddService";
import EditService from "./EditService";
import { logout } from "@/store/AuthSlice";
import { Button } from "@/components/ui/button";
import Admin from "./Admin";
import AddPost from "./AddPost";
import AllPosts from "./AllPosts";
import EditPost from "./EditPost";

const Dashboard = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { isAdmin, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !isAdmin) {
      toast.error("You are not authorized.");
      navigate("/admin");
    }
  }, [isAdmin, loading, navigate]);

  if (loading) {
    return (
      <section className="w-full flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold">Loading...</h1>
      </section>
    );
  }

  const menuItems = [
    { label: "Home", path: "/admin/dashboard/home", icon: <Home className="w-5 h-5 mr-2" /> },
    { label: "Services", path: "/admin/dashboard/service", icon: <Server className="w-5 h-5 mr-2" /> },
    { label: "Service", path: "/admin/dashboard/service/add", icon: <Plus className="w-5 h-5 mr-2" /> },
    { label: "All Post", path: "/admin/dashboard/posts", icon: <Image className="w-5 h-5 mr-2" /> },
    { label: "New Post", path: "/admin/dashboard/post/add", icon: <Plus className="w-5 h-5 mr-2" /> },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setOpenMenu(false);
  };

  return (
    <section className="w-full flex flex-col min-h-screen pt-12">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-gray-100 shadow-md">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button
          className="lg:hidden"
          onClick={() => setOpenMenu((prev) => !prev)}
          aria-label="Toggle Menu"
        >
          <Menu className="w-6 h-6" />
        </Button>
      </header>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white shadow-lg z-50 transform ${
          openMenu ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:w-64 transition-transform duration-300`}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Menu</h2>
          <nav>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Button
                    variant="ghost"
                    className={`w-full flex items-center p-3 rounded-lg text-left ${
                      location.pathname === item.path
                        ? "bg-gray-700 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                    onClick={() => handleNavigation(item.path)}
                  >
                    {item.icon}
                    {item.label}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <Button
          className="absolute bottom-4 left-6 right-6 bg-red-500 text-white hover:bg-red-600"
          onClick={() => {
            dispatch(logout());
            toast.success("Logged out successfully.");
            navigate("/admin");
            setOpenMenu(false);
          }}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:ml-64">
        <Routes>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Admin />} />
          <Route path="service" element={<Service />} />
          <Route path="service/add" element={<AddService />} />
          <Route path="posts" element={<AllPosts />} />
          <Route path="post/add" element={<AddPost />} />
          <Route path="service/edit/:id" element={<EditService />} />
          <Route path="post/edit/:id" element={<EditPost />} />
          <Route path="*" element={<p>Dashboard page not found.</p>} />
        </Routes>
      </main>
    </section>
  );
};

export default Dashboard;
