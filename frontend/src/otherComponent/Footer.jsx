import { motion } from "framer-motion";
import { Truck } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Footer = () => {
    const naviagte = useNavigate()
  return (
    <footer className="bg-white border-t border-orange-200 mt-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 py-12"
      >
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div>
            <h2 className="text-2xl flex gap-2 items-center pt-0.5 font-bold text-orange-600">
              DLeap Kart
               <Truck size={25} className="text-orange-500 pt-" />
            </h2>
            <p className="text-gray-600 mt-3 text-sm leading-relaxed">
              Your one-stop destination for quality products at the best prices.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><Link to="/"  className="hover:text-orange-500 cursor-pointer">Home</Link></li>
              <li><Link to="/"  className="hover:text-orange-500 cursor-pointer">My Orders</Link></li>
              <li><Link to="/"  className="hover:text-orange-500 cursor-pointer">Categories</Link></li>
              <li><Link to="/"  className="hover:text-orange-500 cursor-pointer">Cart</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">
              Customer Support
            </h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="hover:text-orange-500 cursor-pointer">FAQs</li>
              <li className="hover:text-orange-500 cursor-pointer">Shipping</li>
              <li className="hover:text-orange-500 cursor-pointer">Returns</li>
              <li className="hover:text-orange-500 cursor-pointer">Privacy Policy</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">
              Newsletter
            </h3>
            <p className="text-gray-600 text-sm mb-3">
              Subscribe for offers & updates
            </p>
             <p className="text-gray-600 text-sm mb-3">
             Follow me on LinkedIn
            </p>
            
            {/* s */}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} DLeap Kart. All rights reserved.</p>
          <div className="flex gap-4 mt-3 md:mt-0">
            <span className="hover:text-orange-500 cursor-pointer">Instagram</span>
            <span className="hover:text-orange-500 cursor-pointer">Twitter</span>
            <span className="hover:text-orange-500 cursor-pointer">Facebook</span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
