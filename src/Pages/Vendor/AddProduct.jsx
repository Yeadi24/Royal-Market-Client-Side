import React, { use, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../Contexts/AuthContext";

const AddProduct = () => {
  const user = use(AuthContext);
  const [marketDate, setMarketDate] = useState(new Date());
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      ...formData,
      date: marketDate.toISOString().split("T")[0],
      priceHistory: [
        {
          date: marketDate.toISOString().split("T")[0],
          price: parseFloat(formData.pricePerUnit),
        },
      ],
    };
    console.log("Submitted Product:", newProduct);
    // TODO: send newProduct to your server or database
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-2xl mt-10 animate-fade-in">
      <h1 className="text-3xl font-bold text-center mb-6">Add New Product</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div>
          <label>Email (read-only)</label>
          <input
            type="text"
            value={formData.email}
            readOnly
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label>Vendor Name</label>
          <input
            type="text"
            value={formData.vendorName}
            readOnly
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label>Market Name</label>
          <input
            name="marketName"
            onChange={handleChange}
            value={formData.marketName}
            type="text"
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div className="flex justify-center items-center gap-3.5">
          <label>Date</label>
          <DatePicker
            selected={marketDate}
            onChange={(date) => setMarketDate(date)}
            className="w-full border rounded p-2"
            dateFormat="yyyy-MM-dd"
          />
        </div>

        <div className="md:col-span-2">
          <label>Market Description</label>
          <textarea
            name="description"
            onChange={handleChange}
            value={formData.description}
            className="w-full border rounded p-2"
            rows={3}
            required
          ></textarea>
        </div>

        <div>
          <label>Item Name</label>
          <input
            name="itemName"
            onChange={handleChange}
            value={formData.itemName}
            type="text"
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label>Status</label>
          <input
            value={formData.status}
            readOnly
            className="w-full border rounded p-2 bg-gray-100"
          />
        </div>

        <div>
          <label>Upload Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label>Or Image URL</label>
          <input
            name="imageUrl"
            onChange={handleChange}
            value={formData.imageUrl}
            type="text"
            placeholder="https://imageurl.com/pic.jpg"
            className="w-full border rounded p-2"
          />
        </div>

        {imagePreview || formData.imageUrl ? (
          <div className="md:col-span-2">
            <label className="block mb-1">Image Preview:</label>
            <img
              src={imagePreview || formData.imageUrl}
              alt="Preview"
              className="max-h-48 rounded"
            />
          </div>
        ) : null}

        <div>
          <label>Price per Unit (e.g., ৳30/kg)</label>
          <input
            name="pricePerUnit"
            onChange={handleChange}
            value={formData.pricePerUnit}
            type="number"
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label>Item Description (optional)</label>
          <textarea
            name="itemDescription"
            onChange={handleChange}
            value={formData.itemDescription}
            className="w-full border rounded p-2"
            rows={2}
          ></textarea>
        </div>

        <button
          type="submit"
          className="md:col-span-2 bg-green-600 text-white p-3 rounded hover:bg-green-700 transition duration-300"
        >
          Submit Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
