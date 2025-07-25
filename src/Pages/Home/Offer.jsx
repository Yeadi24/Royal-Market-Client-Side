import React from "react";
import { Roll } from "react-awesome-reveal";
import { motion } from "framer-motion"; // fixed incorrect import from 'motion/react'

const Offer = () => {
  return (
    <Roll direction="right" cascade>
      <div className="m-4 md:m-10">
        <div className="hero bg-gradient-to-br from-purple-200 via-pink-100 to-blue-100 min-h-screen rounded-3xl p-5 md:p-10 shadow-xl">
          <div className="hero-content flex-col-reverse lg:flex-row justify-between items-center gap-8 w-full">
            {/* Left Text Section */}
            <div className="text-center lg:text-left max-w-lg">
              <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4">
                App Launch Offer 🎉
              </h1>
              <p className="py-4 text-lg md:text-xl text-gray-700">
                Kickstart your shopping journey with 25% off your first order —
                exclusively on our new app! Shop fresh fruits, vegetables, and
                daily essentials straight from trusted local markets, delivered
                to your doorstep.
              </p>
              <button className="btn btn-primary btn-wide mt-2">
                Claim Offer Now
              </button>
            </div>

            {/* Right Animated Phones */}
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full lg:w-auto">
              <motion.div
                className="mockup-phone border-primary w-[220px] sm:w-[250px] md:w-[300px] md:h-[700px]  lg:w-[400px] lg:h-[800px] max-w-full"
                animate={{ y: [20, 0, 20] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <div className="mockup-phone-camera"></div>
                <div className="mockup-phone-display">
                  <img
                    alt="wallpaper"
                    src="https://i.ibb.co/jkZK5M5q/swello-r-O96-C7-XYYN0-unsplash.jpg"
                    className="h-full w-full object-cover"
                  />
                </div>
              </motion.div>
              <motion.div
                className="mockup-phone border-secondary w-[220px] sm:w-[250px] md:w-[300px] md:h-[700px] lg:w-[400px] lg:h-[800px] max-w-full"
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <div className="mockup-phone-camera"></div>
                <div className="mockup-phone-display">
                  <img
                    alt="wallpaper"
                    src="https://i.ibb.co/671NSwqF/afshin-t2y-9i-Mwt-Lr1-Wv-I-unsplash.jpg"
                    className="h-full w-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Roll>
  );
};

export default Offer;
