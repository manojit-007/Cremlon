import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { registerUser, resetSuccess } from "@/store/AuthSlice";
import { toast } from "sonner";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { loading, error, successMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    dispatch(registerUser(formData));
    setFormData({
      email: "",
      password: "",
    });
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(resetSuccess()); // Properly dispatch the resetSuccess action
    }
    if (error) {
      toast.error(error);
    }
  }, [successMessage, error, dispatch]);

  return (
    <section className="w-full flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Register</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-full max-w-md p-8 border-2 rounded-lg shadow-lg"
      >
        <div>
          <Label htmlFor="email" className="block mb-2">
            Enter Email
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md"
          />
        </div>
        <div>
          <Label htmlFor="password" className="block mb-2">
            Enter Password
          </Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md"
          />
        </div>
        <Button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition-all"
          disabled={loading}
        >
          {loading ? "Register ..." : "Register"}
        </Button>
      </form>
      {error && <p className="text-red-600 mt-4 font-medium">{error}</p>}
    </section>
  );
};

export default Register;
