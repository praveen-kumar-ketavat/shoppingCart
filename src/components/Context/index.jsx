import { createContext, useEffect, useState } from "react";

export let GlobalContext = createContext();

function GlobalState({ children }) {
  let [loading, setLoading] = useState(true);
  let [productsData, setProductsData] = useState(null);
  let [productDetails, setProductDetails] = useState(null);
  let [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    fetchData();
    setCartItems(JSON.parse(localStorage.getItem("cartItems") || []));
  }, []);

  async function fetchData() {
    let response = await fetch("https://dummyjson.com/products", {
      method: "GET",
    });
    let result = await response.json();
    if (result && result.products) {
      setProductsData(result.products);
      setLoading(false);
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalState;
