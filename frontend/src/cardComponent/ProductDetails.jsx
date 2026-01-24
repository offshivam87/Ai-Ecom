import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/features/CartSlice";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();







  useEffect(() => {
    
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(
          `https://dleapkart.onrender.com/api/product/getAllProducts?_id=${id}`
        );


        setProduct(res.data.products?.[0]);
      } catch (err) {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
  const increaseQty = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const dispatch = useDispatch();
  

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
    }));

    toast.success("Item added to cart");



  }
  const handleBuy = () => {
    dispatch(addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
    }));
    navigate("/checkout");

    
  }

  // 🔄 Loading
  if (loading) {
    return (
      <div className="flex justify-center  items-center h-64">
        <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // ❌ Error
  if (error) {
    return (
      <p className="text-center text-red-500 mt-20">
        {error}
      </p>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl md:mt-10 mx-auto px-6 pt-24 pb-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* 🖼 Image */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-gray-100 rounded-xl p-6 flex justify-center"
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full max-h-[400px] object-contain"
          />
        </motion.div>

        {/* 📄 Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">
            {product.name}
          </h1>

          <p className="text-gray-600 mb-4">
            {product.description}
          </p>

          <p className="text-xl font-semibold text-green-400 mb-4">
            ₹ {product.price}
          </p>

          <p className="mb-2">
            <span className="font-medium">Category:</span>{" "}
            {product.category} 
          </p>

          <p className="mb-2">
            <span className="font-medium">Stock:</span>{" "}
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>
          <div className="flex items-center gap-4 mt-3 mb-6">
            <span className="font-medium text-gray-700">
              Quantity
            </span>

            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              {/* ➖ Minus */}
              <button
                onClick={decreaseQty}
                disabled={quantity === 1}
                className="px-4 py-2 text-lg font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                −
              </button>

              {/* 🔢 Number */}
              <span className="px-5 py-2 text-base font-medium">
                {quantity}
              </span>

              {/* ➕ Plus */}
              <button
                onClick={increaseQty}
                disabled={quantity === product.stock}
                className="px-4 py-2 text-lg font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>

            {/* Stock info */}
            <span className="text-sm text-gray-500">
              {product.stock} available
            </span>
          </div>



          {/* 🔘 Actions */}
          <div className="flex gap-4">
            <motion.button
              onClick={handleAddToCart}
              whileTap={{ scale: 0.95 }}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition"
            >
              Add to Cart
            </motion.button>

            <motion.button
            onClick={handleBuy}
              whileTap={{ scale: 0.95 }}
              className="border border-orange-600 text-orange-600 px-6 py-3 rounded-lg hover:bg-orange-50 transition"
            >
              Buy Now
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
