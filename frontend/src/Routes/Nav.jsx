// Nav.jsx
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import  Admin  from '../pages/Admin';

import  MyOrders  from "../pages/MyOrders";
import  Contact  from "../pages/Contact";
import VerifyOtp from "../pages/Verifyotp";
import ProductDetails from "../cardComponent/ProductDetails";
import Cart from "../pages/Cart";
import Categories from "../pages/Categories";
import CategoryProducts from "../pages/CategoriesProduct";
import Checkout from "../pages/Checkout";
import OrderSuccess from "../pages/OrderSuccess";
import AdminDashboard from "../pages/adminComponents/AdminDashboard";
import AdminOrders from "../pages/adminComponents/AdminOrders";
import AdminProducts from "../pages/adminComponents/AdminProducts";
import EditProduct from "../otherComponent/EditProduct";
import AddProduct from "../otherComponent/AddProduct";


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
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/product-details/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/categories/:category" element={<CategoryProducts />} />
      <Route path="/checkout" element={<Checkout/>} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/products" element={<AdminProducts />} />
      <Route path="/admin/orders" element={<AdminOrders />} />
      <Route path="/admin/products/edit/:id" element={<EditProduct />} />
      <Route path="/admin/products/add" element={< AddProduct/>} />
      

    </Routes>
  );
}

export default Nav;
