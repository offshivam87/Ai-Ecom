import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const statusColor = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-blue-100 text-blue-700",
  Shipped: "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "https://dleapkart.onrender.com/api/my-orders",
          { withCredentials: true }
        );
        console.log(res.data);
        
        setOrders(res.data.orders);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p className="text-center mt-24">Loading orders...</p>;
  }

  if (orders.length === 0) {
    return (
      <p className="text-center mt-24 text-gray-500">
        You have not placed any orders yet
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pt-24 px-4 space-y-6">
      <h2 className="text-3xl font-bold mb-6">My Orders</h2>

      {orders.map((order,ind) => (
        <motion.div
          key={ind}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-4 space-y-4"
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Order ID: {order._id}
            </p>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                statusColor[order.status]
              }`}
            >
              {order.status}
            </span>
          </div>

          {/* Items */}
          <div className="space-y-2">
            {order.items.map((item,ind) => (
              <div
                key={ind}
                className="flex justify-between text-sm"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex justify-between font-semibold border-t pt-3">
            <span>Total</span>
            <span>₹{order.totalAmount}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MyOrders;
