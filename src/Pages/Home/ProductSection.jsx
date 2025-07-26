// ProductSection.jsx
import React, { use, useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Contexts/AuthContext";

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const navigate = useNavigate();
  const user = use(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/products?status=approved&limit=100", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const today = new Date().toISOString().split("T")[0];
        const filtered = res.data.filter((p) => {
          const productDate = new Date(p.date).toISOString().split("T")[0];
          return productDate <= today;
        });
        setProducts(filtered);
      });
  }, []);

  const handleViewDetails = (id) => {
    if (!user) return navigate("/login");
    navigate(`/details/${id}`);
  };

  return (
    <section className="bg-gradient-to-r from-green-100 to-red-100 p-6 rounded-3xl">
      <h2 className="text-3xl font-bold text-center text-green-800 mb-6">
        Market Product Highlights
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.slice(0, visibleCount).map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onViewDetails={() => handleViewDetails(product._id)}
          />
        ))}
      </div>

      {visibleCount < products.length && (
        <div className="text-center mt-6">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium text-sm px-4 py-2 rounded-lg transition duration-200 shadow hover:shadow-lg"
          >
            See More
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductSection;
