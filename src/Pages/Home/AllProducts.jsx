import React, { use, useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Contexts/AuthContext";

const AllProducts = () => {
  document.title = "All Products";
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();
  const user = use(AuthContext);

  const fetchProducts = () => {
    const params = {};

    axios
      .get("http://localhost:3000/products", { params })
      .then((res) => {
        setProducts(res.data);
        setCurrentPage(1); // Reset to first page on fetch
      })
      .catch((err) => console.error("Error fetching products:", err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleViewDetails = (id) => {
    if (!user) return navigate("/login");
    navigate(`/details/${id}`);
  };

  // Filter by date range
  const filteredProducts = products.filter((product) => {
    if (!startDate || !endDate) return true;
    const productDate = new Date(product.date).toISOString().split("T")[0];
    return productDate >= startDate && productDate <= endDate;
  });

  // Sorting logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "asc") return a.pricePerUnit - b.pricePerUnit;
    if (sortOrder === "desc") return b.pricePerUnit - a.pricePerUnit;
    return 0;
  });

  // Pagination logic
  const itemsPerPage = 6;
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
        🛍️ All Products
      </h1>

      {/* Filter & Sort Controls */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
        {/* Date Range Picker */}
        <div className="flex items-center gap-2">
          <label className="text-green-700 font-medium">Start:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
          <label className="text-green-700 font-medium">End:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="text-right">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-green-700 text-green-700 rounded px-3 py-1"
          >
            <option value="">-- Sort by Price --</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
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
