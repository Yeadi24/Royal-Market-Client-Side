import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const words = [
  { text: "Local Market", color: "text-red-500" },
  { text: "Fresh Deals", color: "text-green-500" },
  { text: "Shop & Save", color: "text-blue-500" },
];

const ColorTypewriter = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000); // Change every 2 seconds
    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <span className={`${words[index].color} transition-all duration-500`}>
      {words[index].text}
    </span>
  );
};

const Banner = () => {
  return (
    <div className="mx-6 md:mx-10 lg:mx-20 mt-10 rounded-3xl p-10 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl md:text-3xl font-extrabold text-purple-700 mb-4">
              Welcome to{" "}
              <span className="text-indigo-600">
                <ColorTypewriter />
              </span>
            </h1>
            <p className="text-lg md:text-[18px] text-gray-700 mb-6 leading-relaxed">
              Discover fresh local products, unbeatable deals, and trusted
              sellers—all in one place. Support your community while enjoying
              convenient, affordable shopping every day. From farm-fresh produce
              to handmade goods, your local market is just a click away.
            </p>
            <button className="btn btn-secondary text-white px-6 py-2 rounded-full hover:bg-purple-600 transition duration-300">
              Explore
            </button>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center gap-4 flex-wrap">
            <motion.div
              animate={{ y: [0, 30, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="w-40 md:w-48 lg:w-56 rounded-xl shadow-lg overflow-hidden"
            >
              <img
                src="local2.jpg"
                alt="Book Image 1"
                className="w-full h-auto object-cover"
              />
            </motion.div>

            <motion.div
              className="w-40 md:w-48 lg:w-56 rounded-xl shadow-lg overflow-hidden"
              animate={{ y: [0, -30, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <img
                src="local1.jpg"
                alt="Book Image 2"
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
