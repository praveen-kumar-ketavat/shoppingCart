import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../Context";
import "./productItem.css";

function ProductItem() {
  let { id } = useParams();
  let { productDetails, setProductDetails, handleCart, cartItems } =
    useContext(GlobalContext);
    let navigate=useNavigate();
  const isInCart = cartItems.some((item) => item.id === productDetails?.id);
  useEffect(() => {
    fetchDetails();
  }, [id]);
  // console.log(added);
  async function fetchDetails() {
    let response = await fetch(`https://dummyjson.com/products/${id}`, {
      method: "GET",
    });
    let result = await response.json();
    if (result) {
      setProductDetails(result);
    }
  }
  if (!productDetails) return <div>No product found</div>;
  return (
    <>
    <div className="cart-button">
    <button onClick={() => navigate("/cart")}>cart</button>
    </div>
    <div className="productItem">
      <div className="images">
        <div className="main-image">
          {productDetails ? (
            <img src={productDetails.thumbnail} alt="product-image" />
          ) : null}
        </div>
        <div className="sub-images">
          {productDetails &&
            productDetails.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="images"
                className="mapped-images"
              />
            ))}
        </div>
      </div>
      <div className="details">
        <p id="name">{productDetails.title}</p>
        <p id="brand">{productDetails.brand}</p>
        <p id="rating">Rating : {productDetails.rating}</p>
        <p id="price">${productDetails.price}</p>

        <button
          onClick={() => handleCart(productDetails)}
          className="add-button-item"
          disabled={isInCart}
        >
          {isInCart ? "In Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
    </>
  );
}
export default ProductItem;
