import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center mt-8">
      <div>
        <span className="loading loading-bars loading-xl"></span>
        <span className="loading loading-bars loading-xl"></span>
        <span className="loading loading-bars loading-xl"></span>
        <span className="loading loading-bars loading-xl"></span>
        <span className="loading loading-bars loading-xl"></span>
      </div>
    </div>
  );
};

export default Loading;
