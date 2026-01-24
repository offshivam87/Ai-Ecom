import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/features/CartSlice";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    dispatch(clearCart());

    // confetti auto-stop (optional, feels cleaner)
    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    const redirectTimer = setTimeout(() => {
      navigate("/my-orders");
    }, 3000);

    return () => {
      clearTimeout(confettiTimer);
      clearTimeout(redirectTimer);
    };
  }, [dispatch, navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-white relative overflow-hidden">
      {showConfetti && (
        <Confetti
          numberOfPieces={500}
          gravity={0.35}
          recycle={false}
        />
      )}

      <motion.div
        initial={{ scale: 0.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="text-center z-10"
      >
        <CheckCircle size={80} className="text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800">
          Order Placed Successfully
        </h2>
        <p className="text-gray-500 mt-2">
          Confirmation email sent to you
        </p>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
