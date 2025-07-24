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
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const user = use(AuthContext);

  const fetchProducts = () => {
    const params = {};
    if (sortOrder) params.sort = sortOrder;
    if (startDate) params.start = startDate;
    if (endDate) params.end = endDate;

    axios
      .get("http://localhost:3000/products", { params })
      .then((res) => {
        setProducts(res.data);
        setCurrentPage(1); // Reset to first page on filter/sort
      })
      .catch((err) => console.error("Error fetching products:", err));
  };

  useEffect(() => {
    fetchProducts();
  }, [sortOrder, startDate, endDate]);

  const handleViewDetails = (id) => {
    if (!user) return navigate("/login");
    navigate(`/details/${id}`);
  };

  // Pagination logic
  const itemsPerPage = 6;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
      {paginatedProducts.length === 0 ? (
        <p className="text-center text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onViewDetails={() => handleViewDetails(product._id)}
            />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 flex-wrap gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded border ${
                currentPage === page
                  ? "bg-green-700 text-white"
                  : "bg-white text-green-700 border-green-700"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
