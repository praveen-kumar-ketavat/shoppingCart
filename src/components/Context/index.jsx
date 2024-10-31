import { createContext, useEffect, useState } from "react";

export let GlobalContext = createContext();

function GlobalState({ children }) {
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(null);
  let [productsData, setProductsData] = useState(null);
  let [productDetails, setProductDetails] = useState(null);
  let [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    fetchData();
    setCartItems(JSON.parse(localStorage.getItem("cartItems") || []));
  }, []);

  // async function fetchData() {
  //   let response = await fetch("https://dummyjson.com/products", {
  //     method: "GET",
  //   });
  //   let result = await response.json();
  //   if (result && result.products) {
  //     setProductsData(result.products);
  //     setLoading(false);
  //   }
  // }

  async function fetchData() {
    try {
      const response = await fetch("https://dummyjson.com/products", {
        method: "GET",
      });
  
      // Check if the response is ok (status in the range 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Log the raw response for debugging
      const textResponse = await response.text();
      console.log(textResponse); // Log the raw response to see if it is valid JSON
  
      const result = JSON.parse(textResponse); // You can directly use .json() if you know the response is valid JSON.
  
      if (result && result.products) {
        setProductsData(result.products);
        setLoading(false);
      } else {
        console.error("No products found in the response.");
      }
    } 
    catch (error) {
      console.error("Fetch error: ", error);
      setError("Failed to fetch products. Please try again later."); // Set error message
    }
    
  }
  

  function handleCart(cartProduct) {
    console.log(cartProduct);
    // setCartItems((prevCartItems) => [...prevCartItems, cartProduct]);

    let existingCart = [...cartItems];
    const findIndex = existingCart.findIndex(
      (cartItem) => cartItem.id === cartProduct.id
    );

    if (findIndex === -1) {
      existingCart.push({
        ...cartProduct,
        quantity: 1,
        totalPrice: cartProduct?.price,
      });
    } else {
      console.log("its coming here");
      existingCart[findIndex] = {
        ...existingCart[findIndex],
        quantity: existingCart[findIndex].quantity + 1,
        totalPrice:
          (existingCart[findIndex].quantity + 1) *
          existingCart[findIndex].price,
      };
    }

    console.log(existingCart, "existingCart");
    setCartItems(existingCart);
    localStorage.setItem("cartItems", JSON.stringify(existingCart));
  }

  function handleRemove(getProductDetails, isFullyRemoveFromCart) {
    let existingCart = [...cartItems];
    const findIndex = existingCart.findIndex(
      (item) => item.id === getProductDetails.id
    );

    if (isFullyRemoveFromCart) {
      existingCart.splice(findIndex, 1);
    } else {
      existingCart[findIndex] = {
        ...existingCart[findIndex],
        quantity: existingCart[findIndex].quantity - 1,
        totalPrice:
          (existingCart[findIndex].quantity - 1) *
          existingCart[findIndex].price,
      };
    }

    localStorage.setItem("cartItems", JSON.stringify(existingCart));
    setCartItems(existingCart);
  }

  return (
    <GlobalContext.Provider
      value={{
        loading,
        productsData,
        productDetails,
        setProductDetails,
        handleCart,
        cartItems,
        handleRemove,
        error,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalState;
