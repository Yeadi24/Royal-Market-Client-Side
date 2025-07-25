// AdCard.jsx
import React from "react";

const AdCard = ({ ad }) => {
  const { adTitle, shortDescription, imageUrl, vendorName, status } = ad;

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 border border-gray-200">
      <div className="h-40 w-full overflow-hidden rounded-xl mb-3 bg-gray-100 flex items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={adTitle}
            className="object-cover h-full w-full"
          />
        ) : (
          <div className="text-gray-400">No Image Available</div>
        )}
      </div>
      <h2 className="text-lg font-semibold text-gray-800">{adTitle}</h2>
      <p className="text-sm text-gray-600 mb-2">{shortDescription}</p>
      <div className="text-xs text-gray-500">Vendor: {vendorName}</div>
      <div
        className={`text-xs font-medium mt-1 ${
          status === "approved" ? "text-green-600" : "text-red-500"
        }`}
      >
        Status: {status}
      </div>
    </div>
  );
};

export default AdCard;
