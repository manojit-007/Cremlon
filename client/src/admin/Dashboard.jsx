import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import Home from "@/Page/Home";
import Service from "./Service";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import AddService from "./AddService";
import EditService from "./EditService";

const Dashboard = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { isAdmin, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !isAdmin) {
      toast.error("Not authorized user.");
      navigate("/admin");
    }
  }, [isAdmin, loading, navigate]);

  if (loading) {
    return (
      <section className="w-full flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mb-8">Loading...</h1>
      </section>
    );
  }

  return (
    <section className="w-full flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-gray-100 shadow">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button onClick={() => setOpenMenu(true)}>
          <Menu className="w-6 h-6" />
        </Button>
      </header>

      {/* Side Menu Overlay */}
      {openMenu && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setOpenMenu(false)}
          ></div>

          {/* Menu */}
          <aside className="relative bg-gray-100 shadow-lg w-64 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Menu</h2>
              <Button variant="ghost" onClick={() => setOpenMenu(false)}>
                <X />
              </Button>
            </div>
            <nav>
              <ul className="space-y-4">
                <li>
                  <Button
                    className={`flex items-center p-3 w-full text-left rounded-lg transition-all ${
                      location.pathname === "/admin/dashboard/home"
                        ? "bg-gray-300 text-black hover:bg-gray-200"
                        : "bg-transparent text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => {
                      navigate("/admin/dashboard/home");
                      setOpenMenu(false);
                    }}
                  >
                    Home
                  </Button>
                </li>
                <li>
                  <Button
                    className={`flex items-center p-3 w-full text-left rounded-lg transition-all ${
                      location.pathname === "/admin/dashboard/service"
                        ? "bg-gray-300 text-black hover:bg-gray-200"
                        : "bg-transparent text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => {
                      navigate("/admin/dashboard/service");
                      setOpenMenu(false);
                    }}
                  >
                    Service
                  </Button>
                </li>
                <li>
                  <Button
                    className={`flex items-center p-3 w-full text-left rounded-lg transition-all ${
                      location.pathname === "/admin/dashboard/service/add"
                        ? "bg-gray-300 text-black hover:bg-gray-200"
                        : "bg-transparent text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => {
                      navigate("/admin/dashboard/service/add");
                      setOpenMenu(false);
                    }}
                  >
                    Add Service
                  </Button>
                </li>
              </ul>
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full p-4">
        <Routes>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="service" element={<Service />} />
          <Route path="service/add" element={<AddService />} />
          <Route path="service/edit/:id" element={<EditService />} />
          <Route path="*" element={<p>Dashboard page not found.</p>} />
        </Routes>
      </main>
    </section>
  );
};

export default Dashboard;
