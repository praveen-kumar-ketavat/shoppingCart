import { useContext } from "react";
import { GlobalContext } from "../Context";
import "./product.css";
import ProductTile from "../Tiles/ProductTile";
import { useNavigate } from "react-router-dom";

function Products() {
  let navigate = useNavigate();
  let { productsData, loading } = useContext(GlobalContext);
  //   console.log(productsData, loading);
  if (loading) {
    return <h1>loading data please wait..</h1>;
  }
  
  return (
    <div className="container">
      <div className="header">
        <h2>Shopping Products</h2>
        <button onClick={() => navigate("/cart")}>cart</button>
      </div>
      <div className="content">
        {productsData && productsData.length > 0 ? (
          productsData.map((singleProduct, index) => (
            <ProductTile singleProduct={singleProduct} index={index} />
          ))
        ) : (
          <h2>No Products Found</h2>
        )}
      </div>
    </div>
  );
}
export default Products;
