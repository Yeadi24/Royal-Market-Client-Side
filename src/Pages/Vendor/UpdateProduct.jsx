import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../Contexts/AuthContext";

const UpdateProduct = () => {
  const { id } = useParams();
  const user = useContext(AuthContext);
  const navigate = useNavigate();
  const [marketDate, setMarketDate] = useState(new Date());
  const [imagePreview, setImagePreview] = useState(null);
  const [existingPriceHistory, setExistingPriceHistory] = useState([]);

  const [formData, setFormData] = useState({
    email: user?.user?.email || "",
    vendorName: user?.user?.displayName || "",
    marketName: "",
    description: "",
    itemName: "",
    itemDescription: "",
    status: "pending",
    imageUrl: "",
    pricePerUnit: "",
    priceHistory: [],
  });

  // Fetch the product data on mount
  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((res) => {
        const data = res.data;
        setFormData({
          ...data,
          email: data.email || user?.user?.email,
          vendorName: data.vendorName || user?.user?.displayName,
        });
        setMarketDate(new Date(data.date));
        setImagePreview(data.imageUrl);
        setExistingPriceHistory(data.priceHistory || []);
      })
      .catch((error) => {
        console.error("Error loading product:", error);
        toast.error("Failed to load product data");
      });
  }, [id, user]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    const imageData = new FormData();
    imageData.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=2e79cf578ef259716600ff8aa838ef9a`,
        {
          method: "POST",
          body: imageData,
        }
      );
      const data = await res.json();
      if (data.success) {
        setFormData((prev) => ({
          ...prev,
          imageUrl: data.data.url,
        }));
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Image upload failed");
    }
  };

  // Submit updated data
  const handleUpdate = async (e) => {
    e.preventDefault();
    const currentDate = marketDate.toISOString().split("T")[0];

    // Append new price to existing price history
    const updatedPriceHistory = [
      ...existingPriceHistory,
      { [currentDate]: parseFloat(formData.pricePerUnit) },
    ];

    const updatedProduct = {
      ...formData,
      date: currentDate,
      priceHistory: updatedPriceHistory,
    };

    try {
      await axios.put(`http://localhost:3000/products/${id}`, updatedProduct);

      // Clear form
      setFormData({
        email: user?.user?.email || "",
        vendorName: user?.user?.displayName || "",
        marketName: "",
        description: "",
        itemName: "",
        itemDescription: "",
        status: "pending",
        imageUrl: "",
        pricePerUnit: "",
        priceHistory: [],
      });
      setImagePreview(null);
      setMarketDate(new Date());
      setExistingPriceHistory([]);

      toast.success("Product updated successfully!");
      setTimeout(() => {
        navigate("/dashboard/myProducts");
      }, 3000);
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update product");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-2xl">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-center text-green-600 mb-8">
        Update Product
      </h2>

      <form
        onSubmit={handleUpdate}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label className="block font-semibold mb-1 text-green-700">
            Vendor Name
          </label>
          <input
            name="vendorName"
            value={formData.vendorName}
            onChange={handleChange}
            type="text"
            className="w-full p-3 border rounded"
            required
            readOnly
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 text-green-700">
            Email
          </label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            className="w-full p-3 border rounded"
            required
            readOnly
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 text-green-700">
            Market Name
          </label>
          <input
            name="marketName"
            value={formData.marketName}
            onChange={handleChange}
            type="text"
            className="w-full p-3 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 text-green-700">
            Item Name
          </label>
          <input
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            type="text"
            className="w-full p-3 border rounded"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold mb-1 text-green-700">
            Item Description
          </label>
          <textarea
            name="itemDescription"
            value={formData.itemDescription}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 text-green-700">
            Price Per Unit (৳)
          </label>
          <input
            name="pricePerUnit"
            value={formData.pricePerUnit}
            onChange={handleChange}
            type="number"
            step="0.01"
            className="w-full p-3 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 text-green-700">
            Market Date
          </label>
          <DatePicker
            selected={marketDate}
            onChange={(date) => setMarketDate(date)}
            dateFormat="yyyy-MM-dd"
            className="w-full p-3 border rounded"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold mb-1 text-green-700">
            Upload Image
          </label>
          <input
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
            className="w-full"
          />
        </div>

        {imagePreview && (
          <div className="md:col-span-2">
            <img
              src={imagePreview}
              alt="Product"
              className="h-48 rounded shadow"
            />
          </div>
        )}

        <button
          type="submit"
          className="md:col-span-2 bg-green-600 text-white p-3 rounded font-bold hover:bg-green-700 transition"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
