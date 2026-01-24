import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { asyncLoginAction } from "../redux/actions/userAction.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  // useEffect(() => {
  //   console.log("Updated User Data:", userData);
  // }, [userData]);


  const onSubmit = async (data) => {
    try {
      
      
      await dispatch(asyncLoginAction(data));
      navigate("/");
    } catch (err) {
      alert(err.message); // "Please verify your email first"
      navigate("/verify-otp");
    }

  };

  return (
    <div className="min-h-screen overflow-y-hidden flex items-center justify-center bg-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
      >
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 mt-2">
          Login to your account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">

          {/* Username */}


          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
              })}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded-lg font-semibold hover:bg-orange-700 transition"
          >
            Login
          </motion.button>
        </form>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-orange-600 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
