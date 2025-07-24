// Details.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AuthContext } from "../../Contexts/AuthContext";
import { FaStar } from "react-icons/fa";
import Rating from "react-rating";
import useGetRole from "../../Hooks/useGetRole";

const Details = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const role = useGetRole(user.email);
  console.log(user);

  useEffect(() => {
    axios.get(`http://localhost:3000/products/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  const handleAddToWatchlist = async () => {
    try {
      await axios.patch(
        `http://localhost:3000/users/${user.email}/watchlist`,
        product
      );
      toast.success("Added to Watchlist");
    } catch (err) {
      toast.error("Failed to add to Watchlist");
    }
  };

  const handleReviewSubmit = async () => {
    const review = {
      user_email: user.email,
      user_name: user.displayName,
      review_text: reviewText,
      rating,
      created_at: new Date(),
    };

    try {
      await axios.patch(
        `http://localhost:3000/products/${id}/addReview`,
        review
      );
      toast.success("Review submitted");
      setProduct((prev) => ({ ...prev, reviews: [...prev.reviews, review] }));
      setReviewText("");
      setRating(0);
    } catch (err) {
      toast.error("Failed to submit review");
    }
  };

  if (!product) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="p-4 md:p-10 bg-green-50 min-h-screen text-green-800">
      <div className="bg-white rounded-xl shadow-md p-6 md:p-10 space-y-4 transition-all hover:shadow-xl duration-300">
        <h1 className="text-3xl font-bold text-center mb-6">
          {product.itemName}
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <img
              src={product.imageUrl}
              alt={product.itemName}
              className="rounded-xl w-full h-64 object-cover"
            />
          </div>
          <div className="space-y-2">
            <p>
              <strong>🏪 Market:</strong> {product.marketName}
            </p>
            <p>
              <strong>📅 Date:</strong>{" "}
              {new Date(product.date).toLocaleDateString()}
            </p>
            <p>
              <strong>👨‍🌾 Vendor:</strong> {product.vendorName} ({product.email})
            </p>
            <p>
              <strong>🥕 Prices:</strong>
            </p>
            <ul className="list-disc list-inside">
              {product.priceHistory.map((entry, index) => {
                const date = Object.keys(entry)[0];
                const price = entry[date];
                return (
                  <li key={index}>
                    {new Date(date).toLocaleDateString()} — $ {price}/kg
                  </li>
                );
              })}
            </ul>
            <div className="flex gap-4 mt-4">
              {user?.role !== "admin" &&
                user?.role !== "vendor" &&
                user?.email !== product.email && (
                  <button
                    onClick={handleAddToWatchlist}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                  >
                    ⭐ Add to Watchlist
                  </button>
                )}
              <button
                onClick={() => navigate("/buy-demo")}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                🛒 Buy Product
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">💬 User Reviews</h2>
          <div className="space-y-3">
            {product.reviews?.map((rev, idx) => (
              <div key={idx} className="bg-green-100 p-3 rounded">
                <p>
                  <strong>{rev.user_name}</strong> ({rev.user_email})
                </p>
                <p>
                  ⭐ {rev.rating} — {rev.review_text}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(rev.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          {user && (
            <div className="mt-6">
              <h3 className="font-bold mb-2">Leave a review:</h3>

              <textarea
                className="w-full p-2 border rounded"
                placeholder="Your comment..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />

              <div className="mt-2 flex items-center gap-2">
                <span className="font-medium">Your Rating:</span>
                <Rating
                  initialRating={rating}
                  onChange={(value) => setRating(value)}
                  emptySymbol={<FaStar className="text-gray-300 text-xl" />}
                  fullSymbol={<FaStar className="text-yellow-500 text-xl" />}
                  fractions={1}
                />
              </div>

              <button
                onClick={handleReviewSubmit}
                className="block mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Submit Review
              </button>
            </div>
          )}
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">
            📊 Comparison with Previous Data
          </h2>
          <input
            type="date"
            className="border p-2 rounded mb-4"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={product.priceHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(d) => new Date(d).toLocaleDateString()}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#16a34a"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Details;
