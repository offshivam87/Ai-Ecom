import { motion } from "framer-motion";
import Sidebar from '../pages/adminComponents/Sidebar';
import Topbar from '../pages/adminComponents/Topbar';

const Admin = ({ children }) => {
  return (
    <div className="flex overflow-x-hidden overflow-y-hidden mx-1 h-[90vh] mt-17 bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <Topbar />

        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4 overflow-y-auto md:p-6"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
};

export default Admin;
