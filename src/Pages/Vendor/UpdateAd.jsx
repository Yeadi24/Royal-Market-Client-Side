import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateAd = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    adTitle: "",
    shortDescription: "",
    imageUrl: "",
    status: "pending",
    email: "",
    vendorName: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  // Fetch the ad data
  useEffect(() => {
    axios
      .get(`http://localhost:3000/ads/${id}`)
      .then((res) => {
        setFormData(res.data);
        setImagePreview(res.data.imageUrl);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load ad data");
      });
  }, [id]);
  console.log(formData);

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

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=2e79cf578ef259716600ff8aa838ef9a`,
      {
        method: "POST",
        body: formDataImg,
      }
    );
    const data = await res.json();
    if (data.success) {
      setFormData((prev) => ({ ...prev, imageUrl: data.data.url }));
      toast.success("Image uploaded successfully");
    } else {
      toast.error("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.adTitle ||
      !formData.shortDescription ||
      !formData.imageUrl ||
      !formData.vendorName ||
      !formData.email
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      await axios.put(`http://localhost:3000/ads/${id}`, formData);
      toast.success("Advertisement updated successfully");
      navigate("/vendorDashboard/myAdvertisements");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update advertisement");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow-2xl animate-fade-in">
      <h1 className="text-4xl text-green-600 font-extrabold text-center mb-6">
        Update Advertisement
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div>
          <label className="block text-green-700 font-semibold mb-1">
            Vendor Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:outline-green-500"
            required
            disabled
          />
        </div>

        {/* Vendor Name */}
        <div>
          <label className="block text-green-700 font-semibold mb-1">
            Vendor Name
          </label>
          <input
            type="text"
            name="vendorName"
            value={formData.vendorName}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:outline-green-500"
            required
          />
        </div>

        {/* Ad Title */}
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

        {/* Description */}
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

        {/* Image Upload */}
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

        {/* Image Preview */}
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

        {/* Status */}
        <div>
          <label className="block text-green-700 font-semibold mb-1">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:outline-green-500"
          >
            <option value="pending">Pending</option>
            {/* <option value="approved">Approved</option>
            <option value="rejected">Rejected</option> */}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white font-bold p-3 rounded shadow-lg hover:scale-105 transition-transform"
        >
          Update Advertisement
        </button>
      </form>
    </div>
  );
};

export default UpdateAd;
