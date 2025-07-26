import React, { use, useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../Contexts/AuthContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const AddProduct = () => {
  document.title = "Add Product";
  const user = use(AuthContext);
  const [marketDate, setMarketDate] = useState(new Date());
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    vendorName: "",
    marketName: "",
    description: "",
    itemName: "",
    status: "pending",
    imageUrl: "",
    pricePerUnit: "",
    priceHistory: [],
    itemDescription: "",
    reviews: [],
  });
  // ✅ Set user email and name after AuthContext loads
  useEffect(() => {
    if (user?.user) {
      setFormData((prev) => ({
        ...prev,
        email: user.user.email || "",
        vendorName: user.user.displayName || "",
      }));
    }
  }, [user]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));

      const formDataImage = new FormData();
      formDataImage.append("image", file);

      try {
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=2e79cf578ef259716600ff8aa838ef9a`,
          {
            method: "POST",
            body: formDataImage,
          }
        );
        const data = await res.json();
        if (data.success) {
          setFormData((prev) => ({ ...prev, imageUrl: data.data.url }));
        }
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentDate = marketDate.toISOString().split("T")[0];

    const newProduct = {
      ...formData,
      date: currentDate,
      priceHistory: [
        {
          [currentDate]: parseFloat(formData.pricePerUnit),
        },
      ],
    };

    try {
      if (!formData.imageUrl) {
        toast.error("Please upload an image before submitting");
        return;
      }
      axios.post("http://localhost:3000/products", newProduct);
      toast.success("Product Added");
      // Swal.fire({
      //   position: "top-end",
      //   icon: "success",
      //   title: "Your Product Has been Saved",
      //   showConfirmButton: false,
      //   timer: 1500,
      // });
      // setFormData({
      //   email: user.user.email,
      //   vendorName: user.user.displayName,
      //   marketName: "",
      //   description: "",
      //   itemName: "",
      //   status: "pending",
      //   image: null,
      //   imageUrl: "",
      //   pricePerUnit: "",
      //   priceHistory: [],
      //   itemDescription: "",
      //   reviews: [],
      // });
      // setMarketDate(new Date());
      // setImagePreview(null);
      // Reset form after short delay
      setTimeout(() => {
        setFormData({
          email: user.user.email,
          vendorName: user.user.displayName,
          marketName: "",
          description: "",
          itemName: "",
          status: "pending",
          image: null,
          imageUrl: "",
          pricePerUnit: "",
          priceHistory: [],
          itemDescription: "",
          reviews: [],
        });
        setImagePreview(null);
      }, 100);
    } catch (error) {
      console.error("Error submitting product:", error);
      toast.error("Error submitting product");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-2xl mt-10 animate-fade-in">
      <h1 className="text-4xl font-extrabold text-center mb-6 text-green-600">
        Add New Product
      </h1>
      <button onClick={() => toast.success("Button clicked")}>click</button>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label className="text-green-700 font-semibold mb-1 block">
            Email (read-only)
          </label>
          <input
            type="text"
            value={formData.email}
            readOnly
            className="w-full border rounded p-3 hover:border-green-400 focus:outline-green-500 transition"
          />
        </div>

        <div>
          <label className="text-green-700 font-semibold mb-1 block">
            Vendor Name
          </label>
          <input
            type="text"
            value={formData.vendorName}
            readOnly
            className="w-full border rounded p-3 hover:border-green-400 focus:outline-green-500 transition"
          />
        </div>

        <div>
          <label className="text-green-700 font-semibold mb-1 block">
            Market Name
          </label>
          <input
            name="marketName"
            onChange={handleChange}
            value={formData.marketName}
            type="text"
            className="w-full border rounded p-3 hover:border-green-400 focus:outline-green-500 transition"
            required
          />
        </div>

        <div>
          <label className="text-green-700 font-semibold mb-1 block">
            Date
          </label>
          <DatePicker
            selected={marketDate}
            onChange={(date) => setMarketDate(date)}
            className="w-full border rounded p-3 hover:border-green-400 focus:outline-green-500 transition"
            dateFormat="yyyy-MM-dd"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-green-700 font-semibold mb-1 block">
            Market Description
          </label>
          <textarea
            name="description"
            onChange={handleChange}
            value={formData.description}
            className="w-full border rounded p-3 hover:border-green-400 focus:outline-green-500 transition"
            rows={3}
            required
          ></textarea>
        </div>

        <div>
          <label className="text-green-700 font-semibold mb-1 block">
            Item Name
          </label>
          <input
            name="itemName"
            onChange={handleChange}
            value={formData.itemName}
            type="text"
            className="w-full border rounded p-3 hover:border-green-400 focus:outline-green-500 transition"
            required
          />
        </div>

        <div>
          <label className="text-green-700 font-semibold mb-1 block">
            Status
          </label>
          <input
            value={formData.status}
            readOnly
            className="w-full border rounded p-3 bg-gray-100"
          />
        </div>

        <div>
          <label className="text-green-700 font-semibold mb-1 block">
            Upload Product Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border rounded p-3 hover:border-green-400 focus:outline-green-500 transition"
          />
        </div>

        {imagePreview || formData.imageUrl ? (
          <div className="md:col-span-2">
            <label className="block mb-1 text-green-700 font-semibold">
              Image Preview:
            </label>
            <img
              src={imagePreview || formData.imageUrl}
              alt="Preview"
              className="max-h-48 rounded shadow-md border border-green-300"
            />
          </div>
        ) : null}

        <div>
          <label className="text-green-700 font-semibold mb-1 block">
            Price per Unit (e.g., $10/kg)
          </label>
          <input
            name="pricePerUnit"
            onChange={handleChange}
            value={formData.pricePerUnit}
            type="number"
            className="w-full border rounded p-3 hover:border-green-400 focus:outline-green-500 transition"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-green-700 font-semibold mb-1 block">
            Item Description (optional)
          </label>
          <textarea
            name="itemDescription"
            onChange={handleChange}
            value={formData.itemDescription}
            className="w-full border rounded p-3 hover:border-green-400 focus:outline-green-500 transition"
            rows={2}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={!formData.imageUrl}
          className={`w-full font-bold p-3 rounded shadow-lg transition-transform ${
            formData.imageUrl
              ? "bg-gradient-to-r from-green-500 to-green-700 text-white hover:scale-105"
              : "bg-gray-400 text-gray-100 cursor-not-allowed"
          }`}
        >
          Submit Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
