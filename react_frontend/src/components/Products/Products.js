import React, { useEffect, useState } from "react";
import { BASE_URL, GET_PRODUCTS_URL } from "../../constants/Index";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Products = ({ cartItems }) => {
  const [products, setProducts] = useState([]);
  const [productsImage, setProductsImage] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(GET_PRODUCTS_URL);
        if (response.status === 200) {
          const productImageUrls = response.data.product_image.map(
            (relativePath) => `${BASE_URL}${relativePath}`
          );
          setProductsImage(productImageUrls);
          setProducts(response.data.product);
        } else {
          console.log("Error: Unable to fetch products");
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    getProducts();
  }, []);

  const productOverview = (id) => {
    localStorage.setItem("productId", JSON.stringify(id));
    navigate("/product-overview");
  };

  return (
    <div>
      <div>
        {products.length > 0 && (
          <div className="products"
            style={{ marginTop: "50px", cursor: "pointer" }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => productOverview(product.id)}
              >
                <img
                  src={productsImage[product.id - 1]}
                  alt="Product"
                  className="product-image"
                />
                <span className="product-name">{product.product_name}</span>
                <span className="product-price">
                  Price: {product.product_price}
                </span>
                <div className="product-quantity">Qty: {product.quantity}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
