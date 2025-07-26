import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Contexts/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddAdvertisement = () => {
  const user = useContext(AuthContext);
  document.title = "Add Ads";

  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    vendorName: "",
    adTitle: "",
    shortDescription: "",
    imageUrl: "",
    status: "pending",
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
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    const formDataImg = new FormData();
    formDataImg.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=2e79cf578ef259716600ff8aa838ef9a`,
        {
          method: "POST",
          body: formDataImg,
        }
      );

      const data = await res.json();

      if (data.success) {
        setFormData((prev) => {
          const updated = { ...prev, imageUrl: data.data.url };
          console.log("✅ Updated form data with image URL: ", updated);
          return updated;
        });
      } else {
        toast.error("Image upload failed");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Image upload error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Prevent submit if image is not uploaded
    if (!formData.imageUrl) {
      toast.error("Please upload an image before submitting");
      return;
    }

    try {
      await axios.post(
        "https://local-market-server-eight.vercel.app/ads",
        formData
      );
      toast.success("Advertisement Added");

      // Reset form after short delay
      setTimeout(() => {
        setFormData({
          email: user?.user?.email || "",
          vendorName: user?.user?.displayName || "",
          adTitle: "",
          shortDescription: "",
          imageUrl: "",
          status: "pending",
        });
        setImagePreview(null);
      }, 100);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add advertisement");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow-2xl animate-fade-in">
      <h1 className="text-4xl text-green-600 font-extrabold text-center mb-6">
        Add Advertisement
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-green-700 font-semibold mb-1">
            Vendor Name
          </label>
          <input
            type="text"
            value={formData.vendorName}
            readOnly
            className="w-full p-3 border rounded focus:outline-green-500 bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-green-700 font-semibold mb-1">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            readOnly
            className="w-full p-3 border rounded focus:outline-green-500 bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-green-700 font-semibold mb-1">
            Ad Title
          </label>
          <input
            type="text"
            name="adTitle"
            value={formData.adTitle}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:outline-green-500"
            required
          />
        </div>

        <div>
          <label className="block text-green-700 font-semibold mb-1">
            Short Description
          </label>
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 border rounded focus:outline-green-500"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-green-700 font-semibold mb-1">
            Upload Ad Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-3 border rounded focus:outline-green-500"
          />
        </div>

        {imagePreview && (
          <div>
            <label className="block text-green-700 font-semibold mb-1">
              Image Preview
            </label>
            <img
              src={imagePreview}
              alt="Ad Preview"
              className="rounded-lg border max-h-48 shadow-md"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={!formData.imageUrl}
          className={`w-full font-bold p-3 rounded shadow-lg transition-transform ${
            formData.imageUrl
              ? "bg-gradient-to-r from-green-500 to-green-700 text-white hover:scale-105"
              : "bg-gray-400 text-gray-100 cursor-not-allowed"
          }`}
        >
          Submit Advertisement
        </button>
      </form>
    </div>
  );
};

export default AddAdvertisement;
