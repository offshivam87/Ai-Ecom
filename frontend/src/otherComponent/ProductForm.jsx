import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

const ProductForm = ({ onSubmit, defaultValues = {
   ...product,
   image: undefined
 }, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit(
        onSubmit
      )}
      className="bg-white rounded-xl shadow p-6 space-y-5"
    >
      <h2 className="text-xl font-bold text-gray-800">
        Product Details
      </h2>

      {/* Name */}
      <div>
        <label className="text-sm font-medium">Product Name</label>
        <input
          {...register("name", { required: "Name is required" })}
          className="w-full border rounded-lg p-3 mt-1"
          placeholder="Samsung Galaxy S21"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="text-sm font-medium">Description</label>
        <textarea
          {...register("description", { required: true })}
          rows={3}
          className="w-full border rounded-lg p-3 mt-1 resize-none"
        />
      </div>

      {/* Price & Stock */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Price (₹)</label>
          <input
            type="number"
            {...register("price", { required: true, min: 1 })}
            className="w-full border rounded-lg p-3 mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Stock</label>
          <input
            type="number"
            {...register("stock", { required: true, min: 0 })}
            className="w-full border rounded-lg p-3 mt-1"
          />
        </div>
      </div>

      {/* Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Category</label>
          <select
            {...register("category", { required: true })}
            className="w-full border rounded-lg p-3 mt-1"
          >
            <option value="">Select</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home">Home</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Sub Category</label>
          <input
            {...register("subCategory")}
            className="w-full border rounded-lg p-3 mt-1"
            placeholder="Mobile"
          />
        </div>
      </div>

      {/* Brand */}
      <div>
        <label className="text-sm font-medium">Brand</label>
        <input
          {...register("brand")}
          className="w-full border rounded-lg p-3 mt-1"
          placeholder="Samsung"
        />
      </div>

      {/* Image */}
      <div>
        <label className="text-sm font-medium">Image </label>
        <input
          type="file"
          {...register("image")}
          className="w-full border rounded-lg p-3 mt-1"
        />
      </div>

      {/* Rating */}
      <div>
        <label className="text-sm font-medium">Rating</label>
        <input
          type="number"
          step="0.1"
          max="5"
          min="0"
          {...register("rating")}
          className="w-full border rounded-lg p-3 mt-1"
        />
      </div>

      {/* Flags */}
      <div className="flex gap-6">
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register("isFeatured")} />
          Featured
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" {...register("isNewArrival")} />
          New Arrival
        </label>
      </div>

      {/* Submit */}
      <button
        disabled={loading}
        type="submit"
        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
      >

        {loading ? "Saving..." : "Save Product"}
      </button>
    </motion.form>
  );
};

export default ProductForm;
