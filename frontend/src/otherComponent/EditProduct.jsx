import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Admin from "../pages/Admin";
import ProductForm from "../otherComponent/ProductForm";
import {toast} from "react-toastify"

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(
        `https://dleapkart.onrender.com/api/product/getAllProducts?_id=${id}`,
        { withCredentials: true }
      );
      setProduct(res.data.products[0]);
    };

    fetchProduct();
  }, [id]);

  const handleUpdate = async (data) => {
   
      setLoading(true);
      console.log(data);
      

      
      const formData = new FormData();

      
      Object.keys(data).forEach((key) => {
        if (key === "image") {
          formData.append("image", data.image[0]); 
        } else {
          formData.append(key, data[key]);
        }
      });

      await axios.put(
        `https://dleapkart.onrender.com/api/product/updateProduct/${id}`,
        formData,
        { withCredentials: true }
      );
      setLoading(false);
      toast.success("product updated")
      navigate("/admin/products");
    };

    if (!product) return <p>Loading...</p>;

    return (
      <Admin>
        <ProductForm
          defaultValues={product}
          onSubmit={handleUpdate}
          loading={loading}
        />
      </Admin>
    );
  };

  export default EditProduct;
