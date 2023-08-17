/** @format */

import React, { useEffect, useState } from "react";
import { GET_IMAGE_SLIDERS_URL } from "../../constants/Index";
import axios from "axios";

const ImageSlider = () => {
  const [sliderImages, setSliderImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const getImageSliders = async () => {
      try {
        const response = await axios.get(GET_IMAGE_SLIDERS_URL);
        if (response.status === 200) {
          const baseImageUrl = "http://localhost:8000";
          const imageUrls = response.data.image.map(
            (relativePath) => `${baseImageUrl}${relativePath}`
          );
          setSliderImages(imageUrls);
        } else {
          console.log("Failed to fetch slider images");
        }
      } catch (error) {
        console.error("Error while fetching slider images", error);
      }
    };
    getImageSliders();
  }, []);

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
  };

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sliderImages.length - 1 : prevIndex - 1
    );
  };

  const styles = {
    imageSlider: {
      position: "relative",
      left: "70px",
      width: "100%",
      height:"78%"
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    sliderArrow: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      backgroundColor: "#000",
      color: "#fff",
      fontSize: "24px",
      padding: "8px",
      borderRadius: "50%",
      cursor: "pointer",
    },
    prevArrow: {
      left: "10px",
    },
    nextArrow: {
      right: "10px",
    },
  };

  return (
    <div>
      <div style={styles.imageSlider}>
        {sliderImages.length > 0 && (
          <img
            src={sliderImages[currentIndex]}
            alt="Slider Image"
            style={styles.image}
          />
        )}
        <div
          className="slider-arrow prev"
          style={{ ...styles.sliderArrow, ...styles.prevArrow }}
          onClick={handlePrevSlide}
        >
          <i className="uil uil-angle-left" />
        </div>
        <div
          className="slider-arrow next"
          style={{ ...styles.sliderArrow, ...styles.nextArrow }}
          onClick={handleNextSlide}
        >
          <i className="uil uil-angle-right" />
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
