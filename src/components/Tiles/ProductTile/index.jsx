import { useNavigate } from "react-router-dom";
import "./productTile.css";
import { useContext } from "react";
import { GlobalContext } from "../../Context";
function ProductTile({ singleProduct, index }) {
  let { handleCart, cartItems } = useContext(GlobalContext);
  // console.log(singleProduct,index)
  let navigate = useNavigate();
  const isInCart = cartItems.some((item) => item.id === singleProduct.id);
  return (
    <div className="product" key={index}>
      <img
        className="image"
        src={singleProduct.thumbnail}
        alt="product-image"
      />
      <div className="name_price">
        <p className="name">{singleProduct.title}</p>
        <p className="price">${singleProduct.price}</p>
      </div>
      <button
        className="view-button"
        onClick={() => navigate(`/product-details/${singleProduct.id}`)}
      >
        view details
      </button>
      <button
        className="add-button"
        onClick={() => handleCart(singleProduct)}
        disabled={isInCart}
      >
        {isInCart ? "In Cart" : "Add to Cart"}
      </button>
    </div>
  );
}
export default ProductTile;
