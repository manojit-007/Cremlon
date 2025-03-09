import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Eye, EyeClosed } from "lucide-react";
import { resetPassword } from "@/store/AuthSlice";

const PasswordReset = () => {
  const { resetToken } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [passwordStatus, setPasswordStatus] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { loading, error, successMessage } = useSelector((state) => state.auth);

  useEffect(() => {
    document.title = "SmartBuy - Reset Password";
    if (successMessage) {
      toast.success("Password reset successfully. You can now log in.");
      navigate("/admin");
    }
  }, [successMessage, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!password.trim() || !confirmPassword.trim()) {
      toast.error("Both password fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    dispatch(resetPassword({ resetToken, password }));
    setPassword("");
    setConfirmPassword("");
    navigate("/admin");
  };

  return (
    <section className="w-full h-screen bg-gray-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col max-w-lg w-full bg-white border border-gray-300 items-center p-6 m-2 rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Reset Password
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Enter and confirm your new password below.
        </p>
        
        <div className="w-full mb-4">
          <input
            type={passwordStatus ? "text" : "password"}
            className="form-control w-full bg-gray-100 p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="New Password"
            aria-label="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <input
            type={passwordStatus ? "text" : "password"}
            className="form-control w-full bg-gray-100 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm New Password"
            aria-label="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
          />
        </div>
        
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        
        <div className="flex w-full justify-between items-center">
          {/* Toggle Password Visibility */}
          <Button
            onClick={() => setPasswordStatus(!passwordStatus)}
            type="button"
            className="bg-gray-100 border text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200"
          >
            {passwordStatus ? <Eye className="h-5 w-5" /> : <EyeClosed className="h-5 w-5" />}
          </Button>
          
          {/* Submit Button */}
          <Button
            type="submit"
            className={`bg-blue-500 text-white py-2 px-4 rounded-md ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default PasswordReset;
