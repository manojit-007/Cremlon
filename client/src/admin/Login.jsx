import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {  login } from "@/store/AuthSlice";
import { toast } from "sonner";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { isAdmin, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redirect if already logged in as admin
  useEffect(() => {
    if (isAdmin) {
      toast.success("Welcome Admin.");
      navigate("/admin/");
    }
  }, [isAdmin, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      await dispatch(login({ email, password })).unwrap();
      toast.success("Login successful.");
      setFormData({ email: "", password: "" });
      navigate("/admin/");
    } catch (err) {
      toast.error(err.message || "Failed to log in.");
    }
  };

  return (
    <section className="w-full flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Admin Login</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-full max-w-md p-8 border rounded-lg shadow-lg"
      >
        <div>
          <Label htmlFor="email" className="block mb-2">
            Email Address
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <Label htmlFor="password" className="block mb-2">
            Password
          </Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <Button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition-all"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
        <p className="text-center text-sm mt-4">
          Forgot Password?{" "}
          <Link
            to="/admin/forgetPassword"
            className="text-blue-500 font-bold hover:text-blue-600"
          >
            Click here
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
