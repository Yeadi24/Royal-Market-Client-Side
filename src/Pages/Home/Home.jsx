import React from "react";
import Banner from "./Banner";
import Carousel from "./Carousel";
import { ToastContainer } from "react-toastify";

const Home = () => {
  return (
    <div className="text-5xl">
      <ToastContainer position="top-center" autoClose={3000} />
      <Banner></Banner>
      <Carousel></Carousel>
    </div>
  );
};

export default Home;
