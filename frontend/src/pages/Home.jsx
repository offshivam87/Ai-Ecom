import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../cardComponent/ProductCard";
import Spinner from "../cardComponent/Spinner";
import { Link } from "react-router-dom";
import HomeBanner from "../otherComponent/HomeBanner";

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [Home, setHome] = useState([]);


  useEffect(() => {
    const fetchHomeProducts = async () => {
      try {
        setLoading(true);

        const [featuredRes, newArrivalRes,HomeRes] = await Promise.all([
          axios.get("http://localhost:3000/api/product/getAllProducts?category=Electronics&isFeatured=true"),
          axios.get("http://localhost:3000/api/product/getAllProducts?category=Fashion&isNewArrival=true"),
          axios.get("http://localhost:3000/api/product/getAllProducts?category=Home"),
        ]);

        setFeatured(featuredRes.data.products);
        setNewArrivals(newArrivalRes.data.products);
       
        setHome(HomeRes.data.products)
        
      } catch (error) {
        setError("Failed to load home products");
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeProducts();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <p className="text-center text-red-500 mt-20">
        {error}
      </p>
    );
  }


  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto">
      {/* Featured */}
      <HomeBanner/>
      <h2 className="text-4xl text-center font-bold  my-20">Featured Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featured.map((product) => (
          
            <ProductCard key={product._id} product={product} />
          
        ))}
      </div>

      {/* New Arrivals */}
      <h2 className="text-4xl text-center font-bold  my-20">New Arrivals</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {newArrivals.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Home */}


      <h2 className="text-4xl text-center font-bold  my-20">Home Supplies</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Home.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
