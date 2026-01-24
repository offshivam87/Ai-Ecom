import { NavLink } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingBag } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-16 md:w-64 bg-white shadow-md flex flex-col">
      <div className="h-16 flex items-center justify-center md:justify-start md:px-6 font-bold text-indigo-600">
        <span className="hidden md:block">Admin Panel</span>
        <span className="md:hidden">A</span>
      </div>

      <nav className="flex-1 px-2 space-y-2">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition
     ${isActive
              ? "bg-indigo-100 text-indigo-600"
              : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
            }`
          }
        >
          <LayoutDashboard size={20} />
          <span className="hidden md:block">Dashboard</span>
        </NavLink>


        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition
     ${isActive
              ? "bg-indigo-100 text-indigo-600"
              : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
            }`
          }
        >
          <Package size={20} />
          <span className="hidden md:block">Products</span>
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition
     ${isActive
              ? "bg-indigo-100 text-indigo-600"
              : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
            }`
          }
        >
          <ShoppingBag size={20} />
          <span className="hidden md:block">Orders</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
