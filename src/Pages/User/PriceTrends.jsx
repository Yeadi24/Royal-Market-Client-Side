import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import axios from "axios";

const PriceTrends = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    axios
      .get("http://localhost:3000/products/approved")
      .then((res) => setProducts(res.data))
      .catch(() => console.error("Failed to load products"));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4 text-green-700">
          Tracked Products
        </h2>
        <ul className="space-y-2">
          {products.map((product) => (
            <li key={product._id}>
              <Link
                to={`/dashboard/priceTrends/${product._id}`}
                className={`block px-4 py-2 text-black rounded hover:bg-green-100 ${
                  location.pathname.includes(product._id) ? "bg-green-400" : ""
                }`}
              >
                <div className="flex justify-center items-center gap-10">
                  <img
                    src={product.imageUrl}
                    alt={product.itemName}
                    className="w-20 h-16 object-cover rounded mb-2"
                  />
                  <p className="font-bold">{product.itemName}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Outlet for selected product trend */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default PriceTrends;
