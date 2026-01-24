import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Admin from "../pages/Admin";
import ProductForm from "../otherComponent/ProductForm";

const AddProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAdd = async (data) => {
    try {
      setLoading(true);

      // 🔥 STEP 1: FormData create
      const formData = new FormData();

      // 🔥 STEP 2: RHF data → FormData
      Object.keys(data).forEach((key) => {
        if (key === "image") {
          formData.append("image", data.image[0]); // actual file
        } else {
          formData.append(key, data[key]);
        }
      });

      // 🔥 STEP 3: API call
      await axios.post(
        "https://dleapkart.onrender.com/api/product/createProduct",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };



    return (
        <Admin>
            <ProductForm
            defaultValues={product}

                onSubmit={handleAdd}
                loading={loading}
            />
        </Admin>
    );
};

export default AddProduct;
