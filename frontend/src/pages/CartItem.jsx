import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const CartItem = ({ item, onRemove }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="relative flex flex-col sm:flex-row gap-4 bg-white rounded-xl shadow-md p-4"
    >
      {/* ❌ Remove Icon */}
      <button
        onClick={() => onRemove(item.id)}
        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
      >
        <X size={18} />
      </button>
      

      {/* 🖼 Image */}
      <Link className="flex flex-col sm:flex-row gap-4 flex-1" to={`/product-details/${item.id}`}>
      <div className="w-full sm:w-28 h-28 bg-white rounded-lg flex items-center justify-center overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* 📄 Details */}
      <div className="flex-1 space-y-1">
        <h3 className="font-semibold text-gray-800 line-clamp-1">
          {item.name}
        </h3>

        <p className="text-sm text-gray-500">
          Price: ₹{item.price}
        </p>

        <p className="text-sm text-gray-500">
          Quantity: {item.quantity}
        </p>

        <p className="font-medium text-green-400">
          Total: ₹{item.price * item.quantity}
        </p>

      </div>
      </Link>
    </motion.div>
  );
};

export default CartItem;
