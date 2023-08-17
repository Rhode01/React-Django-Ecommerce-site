/** @format */

import React, { useEffect, useState } from "react";
import { GET_CATEGORIES_URL } from "../../constants/Index";
import axios from "axios";
const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const get_product_categories = async () => {
      try {
        const response = await axios.get(GET_CATEGORIES_URL);
        if (response.status === 200) {
          setCategories(response.data.category_name);
        } else {
          console.log("failed");
        }
      } catch (error) {
        console.log(error);
      }
    };
    get_product_categories();
  }, []);
  const getCategoryIcon = (categoryName) => {
    const iconMap = {
      Electronics: "uil uil-laptop",
      Clothing: "uil uil-tshirt",
      "Home & Kitchen": "uil uil-home-alt",
      "Beauty & Personal Care": "uil uil-heart",
      "Sports & Fitness": "uil uil-dumbbell",
      "Books & Literature": "uil uil-book-open",
      "Toys & Games": "uil uil-gamepad",
      "Health & Wellness": "uil uil-heartbeat",
      Automotive: "uil uil-car",
      "Pet Supplies": "uil uil-paw",
    };
    return iconMap[categoryName] || "uil uil-folder";
  };
  const styles = {
    categoriesList: {
      marginTop: "10px",
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "5px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      height: "70%",
    },
    categoriesheader: {
      fontWeight: "bold",
      marginBottom: "10px",
      fontSize: "20px",
    },
    categorytitle: {
      display: "block",
      marginBottom: "5px",
      cursor: "pointer",
      fontSize: "16px",
      color: "#333",
    },
    categoryicon: {
      marginRight: "10px",
    },
    datatitle: {
      color: "#333",
      fontSize: "18px",
    },
  };
  return (
    <div>
      <div className="left-categories">
        <div style={styles.categoriesList}>
          <div style={styles.categoriesheader}>
            <i className="uil uil-list-ul" />{" "}
            <span style={styles.datatitle}>Categories</span>
          </div>
          {categories.map((category) => (
            <span key={category} style={styles.categorytitle}>
              <i className={getCategoryIcon(category)} /> {category}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
