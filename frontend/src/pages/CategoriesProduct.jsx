import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../cardComponent/ProductCard";
import Spinner from "../cardComponent/Spinner";
import { ArrowLeft } from "lucide-react";

const CategoryProducts = () => {
  const { category } = useParams();
  const navigate = useNavigate()

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // slug → backend category
  const formatCategory = (value) =>
    value.charAt(0).toUpperCase() + value.slice(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(
          `https://dleapkart.onrender.com/api/product/getAllProducts?category=${formatCategory(
            category
          )}`
        );

        setProducts(res.data.products);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) return <Spinner />;

  if (error)
    return (
      <p className="text-center text-red-500 mt-20">
        {error}
      </p>
    );

  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto">
      <div
      onClick={() => navigate(-1)}
      className="fixed top-25  right-6 z-50 flex items-center gap-2
                 bg-white border border-gray-200 rounded-full
                 px-3 py-2 shadow-md cursor-pointer
                 hover:bg-orange-50 transition"
    >
      <ArrowLeft className="text-orange-500" size={20} />
      <span className="hidden sm:block text-sm font-medium text-gray-700">
        Back
      </span>
    </div>
      <h2 className="text-3xl font-bold mb-8 capitalize">
        {category} Products
      </h2>

      {products.length === 0 ? (
        <p className="text-gray-500 text-center">
          No products found in this category
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
