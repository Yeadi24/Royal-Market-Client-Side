import React from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const NotFound = () => {
  const navigate = useNavigate();
  document.title = "404 Not Found";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <motion.img
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        src="https://i.ibb.co/7x80M2Nw/228438-P28070-739.jpg"
        alt="404 Not Found"
        className="w-full max-w-[600px] sm:max-w-[700px] md:max-w-[800px] h-auto rounded-xl shadow-lg"
      />

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        onClick={() => navigate("/")}
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
      >
        Go To Home
      </motion.button>
    </div>
  );
};

export default NotFound;
