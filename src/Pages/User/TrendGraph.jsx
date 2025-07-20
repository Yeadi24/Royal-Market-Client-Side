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

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${productId}/price-history`)
      .then((res) => setHistory(res.data))
      .catch(() => console.error("Failed to fetch price history"));
  }, [productId]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-green-700">Price Trend</h2>
      {history.length === 0 ? (
        <p>No price history found.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={history}>
            <XAxis dataKey="date" />
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
