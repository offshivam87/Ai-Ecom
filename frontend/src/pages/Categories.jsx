import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Electronics",
    slug: "electronics",
    color: "from-indigo-500 to-indigo-700",
    src: "https://images.pexels.com/photos/12743408/pexels-photo-12743408.jpeg"
  },
  {
    name: "Fashion",
    slug: "fashion",
    color: "from-pink-500 to-pink-700",
    src: "https://images.pexels.com/photos/3775379/pexels-photo-3775379.jpeg"
  },
  {
    name: "Home",
    slug: "home",
    color: "from-emerald-500 to-emerald-700",
    src: "https://images.pexels.com/photos/19238352/pexels-photo-19238352.jpeg"
  },
  {
    name: "Coming Soon",
    slug: "coming-soon",
    color: "from-gray-400 to-gray-600",
    src:"https://images.pexels.com/photos/4439444/pexels-photo-4439444.jpeg"
  },
];

const Categories = () => {
  const navigate = useNavigate();


  return (
    <div className="pt-24 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Browse Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <motion.div
            key={cat.slug}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() =>
              cat.slug !== "coming-soon" &&
              navigate(`/categories/${cat.slug}`)
            }
            className="relative cursor-pointer h-40 rounded-xl overflow-hidden shadow-lg"
          >
            {/* Background Image */}
            <img
              src={cat.src}
              alt={cat.name}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Orange Overlay */}
            <div className="absolute inset-0 bg-orange-400/60"></div>

            {/* Text */}
            <div className="relative z-10 flex items-center justify-center h-full">
              <h2 className="text-white text-2xl font-semibold">
                {cat.name}
              </h2>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
