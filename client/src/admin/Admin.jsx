import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome, Admin!</h1>
        <p className="text-gray-600 mb-6">
          Manage your application seamlessly. Navigate to the dashboard or explore various management tools.
        </p>
        <div className="flex justify-center gap-4">
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => navigate("/admin/dashboard/users")}
          >
            Manage Users
          </Button>
          <Button
            className="bg-purple-500 hover:bg-purple-600 text-white"
            onClick={() => navigate("/admin/dashboard/service")}
          >
            Manage Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Admin;
