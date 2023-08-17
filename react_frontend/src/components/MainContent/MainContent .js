import React, { useState } from "react";
import "./MainContent.css";
import Navbar from "../Common/Header/Navbar";
import ImageSlider from "../Image_Slider/ImageSlider";
import Categories from "../Categories/Categories";
import Products from "../Products/Products";
import Footer from "../Common/Footer/Footer";
const MainContent = ({ cartItems }) => {
  return (
    <>
      <Navbar cartItems={cartItems} />
      <div className="main-content">
        <Categories />
        <div className="center-content">
          <ImageSlider />
        </div>
      </div>
      <div className="products">
        <Products cartItems={cartItems} />
      </div>
      <Footer />
    </>
  );
};
export default MainContent;
