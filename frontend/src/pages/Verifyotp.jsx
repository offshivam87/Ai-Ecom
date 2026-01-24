import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadUser } from "../redux/features/UserSlice";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("verifyEmail");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // 🔐 Redirect safety
  useEffect(() => {
    if (!localStorage.getItem("verifyEmail")) {
      navigate("/register");
    }
  }, []);


  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const res = await axios.post("https://dleapkart.onrender.com/api/auth/verify-otp", {
        email,
        otp: data.otp,
      }, { withCredentials: true });


      alert(res.data.message);
      localStorage.removeItem("verifyEmail");
      dispatch(loadUser(res.data.user));
      navigate("/");
    } catch (err) {
      return alert(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-600 to-purple-700 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Verify Your Email
        </h2>
        <p className="text-sm text-gray-500 text-center mt-2">
          Enter the 6-digit OTP sent to your email
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
          <input
            type="text"
            placeholder="Enter OTP"
            maxLength={6}
            className="w-full text-center tracking-widest text-xl border border-gray-300 rounded-lg py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            {...register("otp", {
              required: "OTP is required",
              pattern: {
                value: /^[0-9]{6}$/,
                message: "OTP must be 6 digits",
              },
            })}
            onInput={(e) =>
              (e.target.value = e.target.value.replace(/\D/g, ""))
            }
          />

          {errors.otp && (
            <p className="text-red-500 text-sm text-center">
              {errors.otp.message}
            </p>
          )}

          <motion.button
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </motion.button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-6">
          Didn’t receive OTP? Please check spam folder
        </p>
      </motion.div>
    </div>
  );
};

export default VerifyOtp;
