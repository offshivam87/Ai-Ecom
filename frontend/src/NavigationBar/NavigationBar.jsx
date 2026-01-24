import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { Truck } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isverified, user } = useSelector((state) => state.user);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "My Orders", path: "/my-orders" },
    { name: "Categories", path: "/categories" },
    { name: "Contact", path: "/contact" },
    { name: "Cart", path: "/cart" },
  ];

  return (
    <nav className="fixed z-[9999]  top-0 left-0 w-full  bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl  flex gap-2 pt-0.5 items-center font-bold text-orange-600">
          DLeap Kart
          
          <Truck size={25} className="text-orange-500 pt-" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-orange-600 font-semibold"
                  : "text-gray-600"
              }
              key={link.name}
              to={link.path}

            >
              {link.name}
            </NavLink>
          ))}

          {/* Login Button */}
          {!isverified && (
            <Link
              to="/login"
              className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              Login
            </Link>)}

          {/* LOGGED IN + ADMIN */}
          {isverified && user?.role === "admin" && (
            <Link
              to="/admin"
              className="bg-orange-400 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Admin pannel
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    isActive ? "text-orange-600 font-semibold" : "text-gray-600"
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              {!isverified && (

              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="bg-orange-600 text-white text-center py-2 rounded-lg hover:bg-orange-700 transition"
              >
                Login
              </Link>)}
              {isverified && user?.role === "admin" && (
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="bg-orange-500 text-white text-center px-5 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Admin Pannel
            </Link>
          )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
