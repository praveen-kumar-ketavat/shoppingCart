import { Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import ProductItem from "./components/ProductItem";
import Cart from "./components/Cart";

function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Products />} />
        <Route path="/shoppingCart" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product-details/:id" element={<ProductItem />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/*" element={<Products />} />
      </Routes>
    </>
  );
}

export default App;
