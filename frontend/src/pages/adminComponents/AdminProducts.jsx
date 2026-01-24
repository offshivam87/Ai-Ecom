import { motion } from "framer-motion";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Admin from "../Admin";
import { useEffect, useState } from "react";
import axios from "axios";



const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAllProducts = async () => {
      const AllProducts = await axios.get('https://dleapkart.onrender.com/api/product/getAllProducts',
        { withCredentials: true }
      )
      console.log(AllProducts);
      setProducts(AllProducts.data.products);
    }
    fetchAllProducts()
  }, []);
  
  const handleDelete = async (id) => {
    
    await axios.delete(
      `https://dleapkart.onrender.com/api/product/deleteProduct/${id}`,
      { withCredentials: true }
    );
    setProducts(products.filter(product => product._id !== id));
  };

  return (
    <Admin>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Products
        </h2>

        <button
          onClick={() => navigate("/admin/products/add")}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <motion.tr
                key={product._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-t"
              >
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <span className="font-medium">
                    {product.name}
                  </span>
                </td>

                <td className="p-3">{product.category}</td>
                <td className="p-3">₹{product.price}</td>
                <td className="p-3">{product.stock}</td>

                <td className="p-3 text-right">
                  <div className="inline-flex gap-2">
                    <button
                      onClick={() =>
                        navigate(`/admin/products/edit/${product._id}`)
                      }
                      className="p-2 rounded-lg hover:bg-indigo-50 text-indigo-600"
                    >
                      <Edit size={16} />
                    </button>

                    <button
                    onClick={() => handleDelete(product._id)}
                      className="p-2 rounded-lg hover:bg-red-50 text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {products.map((product) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow p-4"
          >
            <div className="flex gap-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h3 className="font-semibold">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {product.category}
                </p>
                <p className="font-medium mt-1">
                  ₹{product.price}
                </p>
                <p className="text-sm text-gray-500">
                  Stock: {product.stock}
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() =>
                  navigate(`/admin/products/edit/${product._id}`)
                }
                className="flex-1 border border-indigo-600 text-indigo-600 py-2 rounded-lg text-sm"
              >
                Edit
              </button>

              <button className="flex-1 border border-red-600 text-red-600 py-2 rounded-lg text-sm">
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </Admin>
  );
};

export default AdminProducts;
