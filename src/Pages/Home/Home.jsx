import React from "react";
import Banner from "./Banner";
import Carousel from "./Carousel";
import { ToastContainer } from "react-toastify";
import ProductSection from "./ProductSection";
import Footer from "../Shared/Footer";
import AllAds from "./AllAds";
import Offer from "./Offer";
import Stats from "./Stats";

const Home = () => {
  document.title = "Home";
  return (
    <div className="text-5xl">
      <ToastContainer position="top-center" autoClose={3000} />
      <Banner></Banner>
      <Carousel></Carousel>
      <ProductSection></ProductSection>
      <AllAds></AllAds>
      <Offer></Offer>
      <Stats></Stats>
      <Footer></Footer>
    </div>
  );
};

export default Home;
