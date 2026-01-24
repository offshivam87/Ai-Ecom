import { useState, useEffect, use } from "react";
import Admin from "../Admin";
import { motion } from "framer-motion";
import axios from "axios";

const stats = [
  { title: "Total Orders", key: "totalOrders" },
  { title: "Total Products", key: "totalProducts" },
  { title: "Pending Orders", key: "pendingOrders" },
];


const AdminDashboard = () => {
  const [Value, setValue] = useState(null);
  
  useEffect(() => {
    const fetchStats = async () => {
    const res = await axios.get(
      "http://localhost:3000/api/product/order-stats",
      { withCredentials: true }
    );
    console.log(res.data.stats);
    
    setValue(res.data.stats);
  };

  fetchStats();
    
   }, []);

  return (
    <Admin>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <motion.div
            key={stat.title}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-xl shadow p-5"
          >
            <p className="text-sm text-gray-500">{stat.title}</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-2">
              {Value ? Value[stat.key] : "—"}
            </h3>
          </motion.div>
        ))}
      </div>
    </Admin>
  );
};

export default AdminDashboard;
