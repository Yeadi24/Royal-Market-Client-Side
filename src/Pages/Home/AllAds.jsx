// AllAds.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import AdCard from "./AdCard";

const AllAds = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/ads") // adjust if your backend URL is different
      .then((res) => {
        const slicedAds = res.data.slice(0, 6);
        setAds(slicedAds);
      })
      .catch((err) => {
        console.error("Failed to fetch ads:", err);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {ads.map((ad, index) => (
        <AdCard key={index} ad={ad} />
      ))}
    </div>
  );
};

export default AllAds;
