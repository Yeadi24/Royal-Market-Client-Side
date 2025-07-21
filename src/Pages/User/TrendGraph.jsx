import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const TrendGraph = () => {
  const { productId } = useParams();
  const [history, setHistory] = useState([]);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${productId}`)
      .then((res) => {
        const d = res.data;
        setProduct(d);
        const raw = res.data.priceHistory || [];

        const transformed = raw.map((entry) => {
          const date = Object.keys(entry)[0];
          const price = entry[date];
          return { date, price };
        });

        setHistory(transformed);
      })
      .catch(() => console.error("Failed to fetch price history"));
  }, [productId]);
  console.log(history);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-green-700">Price Trend</h2>

      {/* Product Details Section */}
      <div className="bg-white rounded shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          {/* Image and Name */}
          <div className="flex items-center space-x-4">
            <img
              src={product.imageUrl}
              alt={product.itemName}
              className="w-20 h-20 object-cover rounded"
            />
            <h3 className="text-xl md:text-2xl font-semibold text-black">
              {product.itemName}
            </h3>
          </div>

          {/* Market and Vendor */}
          <div className="space-y-1 md:text-right text-black">
            <p className="text-lg md:text-2xl">
              <span className="font-semibold">Market:</span>{" "}
              {product.marketName}
            </p>
            <p className="text-lg md:text-2xl">
              <span className="font-semibold">Vendor:</span>{" "}
              {product.vendorName}
            </p>
          </div>
        </div>
      </div>

      {/* Price Trend Chart */}
      {history.length === 0 ? (
        <p>No price history found.</p>
      ) : (
        <ResponsiveContainer width="100%" height={500}>
          <LineChart data={history}>
            <XAxis dataKey="date" className="font-bold" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#10B981"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default TrendGraph;
