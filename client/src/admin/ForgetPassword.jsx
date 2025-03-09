import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { forgotPassword, resetError, resetSuccess } from "@/store/AuthSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { loading, error, successMessage } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    try {
      await dispatch(forgotPassword(email)).unwrap();
      toast.success("Reset link sent to your email.");
    } catch (error) {
      toast.error(error || "Something went wrong. Please try again.");
    } finally {
      setEmail("");
      dispatch(resetError())
      dispatch(resetSuccess())
    }
  };

  return (
    <section className="w-full h-screen bg-gray-100 flex items-center justify-center relative">
      {/* Loading State */}
      {loading && (
        <div className="absolute top-10 text-blue-600 font-medium">
          Loading...
        </div>
      )}
      {/* Success Message */}
      {successMessage && (
        <div className="absolute top-10 text-green-600 font-medium">
          {successMessage}
        </div>
      )}
      {/* Error Message */}
      {error && (
        <div className="absolute top-10 text-red-600 font-medium">
          {error}
        </div>
      )}

      <div className="w-full max-w-sm bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-semibold text-gray-700 text-center mb-6">
          Forgot Password
        </h1>
        {/* Form to enter email */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ForgetPassword;
