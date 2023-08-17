/** @format */

import React, { useEffect, useState } from "react";
import { BASE_URL, GET_PRODUCT_DETAILS } from "../../constants/Index";
import axios from "axios";
import "./products.css";
import Navbar from "../Common/Header/Navbar";
import Button from "../Buttons/Button";
import Footer from "../Common/Footer/Footer";
import { useNavigate } from "react-router-dom";


const ProductOverview = ({cartItems, incrementItemsInCart, decrementItemsInCart,quantity,addItemsToCart}) => {
  const proId = localStorage.getItem("productId");
  const productId = JSON.parse(proId);
  const [product, setProduct] = useState([]);
  const [productImage, setProductImage] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetch_productDetails = async () => {
      try {
        const response = await axios.get(`${GET_PRODUCT_DETAILS}/${productId}`);
        if (response.status === 200) {
          const productImageUrl = `${BASE_URL}${response.data.product_image}`;
          setProductImage(productImageUrl);
          setProduct(response.data.product);
        } else {
          console.log("Error: Unable to fetch product details");
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    fetch_productDetails();
  }, [productId]);
  const buttonSt = {
    color: "#ffffff",
    fontWeight: "bold",
    display: "block",
    marginBottom: "10px",
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "30px",
    backgroundColor: "#639e95",
    padding: "14px 28px",
    fontSize: "16px",
    cursor: "pointer",
    textAlign: "center",
  };
  const buttonStyle = {
    color: "#ffffff",
    fontWeight: "bold",
    display: "block",
    marginBottom: "10px",
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "30px",
    backgroundColor: "#0c8b7b",
    padding: "14px 28px",
    fontSize: "16px",
    cursor: "pointer",
    textAlign: "center",
  };
  const AddtoCartBtn =(itemQuantity,productId)=>{
    addItemsToCart(itemQuantity,productId)
  }
  const BuynowBtn = () =>{
     const userSession = localStorage.getItem("user");
     const user = JSON.parse(userSession);
     const isAuthenticated = user !== null;
     if(isAuthenticated){
        navigate("/buynow")
     }
     else{
      console.log("BuynowBtn");
      navigate("/login")

     }
  }
  return (
    <div>
      <Navbar cartItems={cartItems} />
      {product && (
        <>
          <div className="wrapper">
            <div className="col-1-2">
              <div className="product-wrap">
                <div className="product-shot">
                  <img src={productImage} alt="" className="image-image" />
                </div>
              </div>
            </div>
            <div className="col-1-2">
              <div className="product-info">
                <h2>{product.product_name}</h2>
                <h2>{product.product_price}</h2>
                <div className="desc">{product.product_description}</div>
                <ul className="sizing-list">
                  <li style={{ textDecoration: "None" }} className="size">
                    {product.product_size}
                  </li>
                </ul>
              </div>
            </div>
            <div className="buynow">
              <h2>{product.product_name}</h2>
              <h6>Quantity</h6>
              <span style={{ padding: "10px" }}>
                <i
                  className="uil uil-plus"
                  style={{ cursor: "pointer" }}
                  onClick={incrementItemsInCart}
                ></i>
                {quantity}
                <i
                  className="uil uil-minus"
                  style={{
                    marginLeft: "10px",
                    cursor: quantity === 1 ? "not-allowed" : "pointer",
                    opacity: quantity === 1 ? 0.5 : 1,
                  }}
                  onClick={quantity === 1 ? undefined : decrementItemsInCart}
                ></i>
              </span>
              <div>
                <button style={buttonStyle} onClick={BuynowBtn}>
                  Buy Now
                </button>
                <button onClick={() => AddtoCartBtn(quantity, product.id)} style={buttonSt}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default ProductOverview;
