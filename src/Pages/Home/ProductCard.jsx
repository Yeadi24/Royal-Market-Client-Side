import React from "react";

const ProductCard = ({ product, onViewDetails }) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-green-300 hover:border-red-400 hover:scale-[1.02]">
      <img
        src={product.imageUrl}
        alt={product.marketName}
        className="w-full h-48 object-cover rounded-xl mb-4"
      />

      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-green-800">
          🛒 {product.marketName}
        </h3>
        <p className="text-xl text-black">
          📅 {new Date(product.date).toDateString()}
        </p>
        <p className="text-xl text-black">📅 Price: {product.pricePerUnit} $</p>
      </div>

      <div className="text-right">
        <button
          onClick={onViewDetails}
          className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium text-sm px-4 py-2 rounded-lg transition duration-200 shadow hover:shadow-lg"
        >
          🔍 View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
