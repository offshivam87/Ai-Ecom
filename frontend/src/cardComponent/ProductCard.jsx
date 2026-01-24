import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/features/CartSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


const ProductCard = ({ product }) => {
  const dispatch = useDispatch();


  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    }));

    toast.success("Item added to cart");



  }

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="bg-white rounded-xl shadow-md h-full overflow-hidden hover:shadow-xl transition"
    >
      {/* Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Category */}
        <span className="text-xs text-gray-500 uppercase tracking-wide">
          {product.category}
        </span>

        {/* Name */}
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {product.name}
        </h3>

        {/* Price */}
        <p className="text-green-400 font-bold text-lg">
          ₹{product.price}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 text-sm text-yellow-500">
          ⭐ {product.rating || 4.0}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-3">
          <Link className="flex-1 text-center  bg-orange-400 text-white py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition" key={product._id} to={`/product-details/${product._id}`}>
            <button


             
            >
              View
            </button></Link>

          <button onClick={handleAddToCart}

            className="flex-1 border border-orange-400 text-orange-400 py-2 rounded-lg text-sm font-medium hover:bg-orange-50 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
