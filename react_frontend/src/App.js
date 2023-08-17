
import MainContent from "./components/MainContent/MainContent ";
import { Routes,Route } from "react-router-dom";
import ProductOverview from "./components/Products/ProductOverview";
import Cart from "./components/Common/Cart/Cart";
import Login from "./components/Pages/Login";
import { useState, useEffect } from "react";
import axios from "axios";
import ArProductReview from "./components/AR/ArProductReview";

function App() {
  
   const cart = [];
   const [cartItems, setCartItems] = useState(cart);
   const [quantity, setQuantity] = useState(1);
   const [userLocation, setUserLocation] = useState(null);
   const addItemsToCart = (itemQuantity, productId) => {
     setCartItems((prevItems) => [
       ...prevItems,
       {
         Qty: parseInt(itemQuantity, 10), 
         productId: productId,
       },
     ]);
   };
   useEffect(() => {
     if ("geolocation" in navigator) {
       navigator.geolocation.getCurrentPosition(
         (position) => {
           setUserLocation({
             latitude: position.coords.latitude,
             longitude: position.coords.longitude,
           });
         },
         (error) => {
           console.error(error.message);
         }
       );
     } else {
       console.error("Geolocation is not available in this browser.");
     }
   }, []); 

    useEffect(() => {
      if (userLocation) {
        const apiKey = "1e5f50e5a23742d2a668f29c1def6bff";
        axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${userLocation.latitude}+${userLocation.longitude}&key=${apiKey}`)
          .then((response) => {
            const result = response.data.results[0];
            const city = result.components.city || result.components.town || result.components.village ||"";
            const country = result.components.country || "";
            setUserLocation((prevLocation) => ({
              ...prevLocation,
              city,
              country,
            }));
            console.log(userLocation)
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }, [userLocation]);

   const IncrementItemInCart = () => {
     setQuantity((prevQuantity) => prevQuantity + 1);
   };

   const DecrementItemInCart = () => {
     setQuantity((prevQuantity) => prevQuantity - 1); 
   };
  return (
    <div className=".container-fluid">
      <Routes>
        {/* <Route path="/" element=<MainContent cartItems={cartItems} /> /> */}
        <Route path="/" element = <ArProductReview /> />
        <Route path="/login" element={<Login/>}/>
        <Route
          path="/cart"
          element={
            <Cart
              addItemsToCart={addItemsToCart}
              cartItems={cartItems}
              incrementItemsInCart={IncrementItemInCart}
              decrementItemsInCart={DecrementItemInCart}
            />
          }
        />
        <Route
          path="/product-overview"
          element=<ProductOverview
            addItemsToCart={addItemsToCart}
            incrementItemsInCart={IncrementItemInCart}
            decrementItemsInCart={DecrementItemInCart}
            quantity={quantity}
            cartItems={cartItems}
          />
        />
      </Routes>
    </div>
  );
}

export default App;
