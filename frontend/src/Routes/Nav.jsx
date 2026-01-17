// Nav.jsx
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { Admin } from "../pages/Admin";
import { Categories } from "../pages/Categories";
import { MyOrders } from "../pages/MyOrders";
import { Contact } from "../pages/Contact";
function Nav() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/my-orders" element={<MyOrders />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/contact" element={<Contact/>} />
    </Routes>
  );
}

export default Nav;
