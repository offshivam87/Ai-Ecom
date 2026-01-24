import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/features/CartSlice";
import CartItem from "./CartItem";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { use } from "react";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isverified, user } = useSelector((state) => state.user);

  const { items, totalPrice, totalQuantity } = useSelector(
    (state) => state.cart
  );

  const checkoutHandler = () => {
    if (!isverified) {
      alert("Please create an account to proceed to checkout");
      navigate("/register");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="max-w-4xl mx-auto pt-24 px-4 space-y-6">
      {items.length === 0 ? (
        <p className="text-center text-3xl font-medium text-gray-500">
          Your cart is empty
        </p>
      ) : (
        <>
          {/* 🧾 Cart Items */}
          <AnimatePresence>
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={(id) => dispatch(removeFromCart(id))}
              />
            ))}
          </AnimatePresence>

          {/* 📦 Cart Summary */}
          <div className="bg-white shadow-md rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Total Items</span>
              <span>{totalQuantity}</span>
            </div>

            <div className="flex justify-between font-semibold">
              <span>Total Price</span>
              <span>₹{totalPrice}</span>
            </div>

            <button
              onClick={checkoutHandler}
              className="w-full mt-4 bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
