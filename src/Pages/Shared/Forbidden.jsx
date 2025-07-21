import React from "react";

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <img
        src="https://i.ibb.co/nhXmght/dave-lowe-4-Rgiv-BMvk-ME-unsplash.jpg"
        alt="403 Forbidden"
        className="max-w-sm w-full mb-6"
      />
      <h1 className="text-2xl text-red-600 font-semibold text-center">
        🚫 You have no permission to access this page.
      </h1>
    </div>
  );
};

export default Forbidden;
