import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import { removeFromCart } from "../redux/features/CartSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRemove = (id) => {
    dispatch(removeFromCart(id));
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (cart.items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    navigate("/order-success");

    await axios.post("https://dleapkart.onrender.com/api/createOrder", {
      userId: user._id,
      items: cart.items,
      totalAmount: cart.totalPrice,
      totalQuantity: cart.totalQuantity,
      name: data.name,
      phone: data.phone,
      address: data.address,
      city: data.city,
      pincode: data.pincode
    })
      .then((response) => {
        console.log("Order created successfully:", response.data);
        toast.success("Order placed successfully!");
        // next step: dispatch(clearCart()) + navigate("/my-orders")
      })
  }


  return (

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-24 px-4 max-w-6xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-8 text-center">
        Checkout
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 🏠 Address Form */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-md space-y-4"
        >
          <h3 className="text-xl font-semibold mb-2">
            Delivery Address
          </h3>

          <input
            placeholder="Full Name"
            {...register("name", { required: true })}
            className="w-full border p-3 rounded-lg"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">
              Name is required
            </p>
          )}

          <input
            placeholder="Phone Number"
            {...register("phone", { required: true })}
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            placeholder="Full Address"
            {...register("address", { required: true })}
            className="w-full border p-3 rounded-lg resize-none"
            rows="3"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="City"
              {...register("city", { required: true })}
              className="border p-3 rounded-lg"
            />
            <input
              placeholder="Pincode"
              {...register("pincode", { required: true })}
              className="border p-3 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition"
          >
            Place Order
          </button>
        </motion.form>

        {/* 🧾 Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h3 className="text-xl font-semibold mb-4">
            Order Summary
          </h3>

          <div className="space-y-3 max-h-64 overflow-auto">
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-sm"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>
                  ₹{item.price * item.quantity}
                </span>

              </div>
            ))}
          </div>

          <div className="border-t mt-4 pt-4 space-y-2">
            <div className="flex justify-between font-medium">
              <span>Total Items</span>
              <span>{cart.totalQuantity}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total Price</span>
              <span>₹{cart.totalPrice}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Checkout;
