import React, { use, useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Contexts/AuthContext";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState(""); // "asc" or "desc"
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();
  const user = use(AuthContext);
  const fetchProducts = () => {
    const params = {};
    if (sortOrder) params.sort = sortOrder;
    if (startDate) params.start = startDate;
    if (endDate) params.end = endDate;

    axios
      .get("http://localhost:3000/products", { params })
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  };

  useEffect(() => {
    fetchProducts();
  }, [sortOrder, startDate, endDate]);

  const handleViewDetails = (id) => {
    if (!user) return navigate("/login");
    navigate(`/details/${id}`);
  };
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
        🛍️ All Products
      </h1>

      {/* 🔽 Filter and Sort Controls */}
      <div className="flex flex-wrap items-center gap-4 mb-8 justify-center">
        <label className="flex flex-col text-sm">
          📅 Start Date
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </label>

        <label className="flex flex-col text-sm">
          📅 End Date
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </label>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border rounded px-3 py-1 text-sm"
        >
          <option value="">Sort by Price</option>
          <option value="asc">🔼 Price Low to High</option>
          <option value="desc">🔽 Price High to Low</option>
        </select>
      </div>

      {/* 🧺 Product Grid */}
      {products.length === 0 ? (
        <p className="text-center text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onViewDetails={() => handleViewDetails(product._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
