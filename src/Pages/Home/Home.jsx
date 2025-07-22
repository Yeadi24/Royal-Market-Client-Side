import React from "react";
import Banner from "./Banner";
import Carousel from "./Carousel";
import { ToastContainer } from "react-toastify";
import ProductSection from "./ProductSection";

const Home = () => {
  document.title = "Home";
  return (
    <div className="text-5xl">
      <ToastContainer position="top-center" autoClose={3000} />
      <Banner></Banner>
      <Carousel></Carousel>
      <ProductSection></ProductSection>
    </div>
  );
};

export default Home;
