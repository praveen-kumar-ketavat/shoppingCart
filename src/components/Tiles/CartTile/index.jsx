
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../Context";
import "./CartTile.css";
import { useContext } from "react";

function CartTile({ singleCartItem }) {
  const { handleRemove, handleCart } = useContext(GlobalContext);
  let navigate=useNavigate();

  return (
    <>
      <div className="cart-item-container">
        <div className="cart-item-info">
          <div className="thumbnail-container">
            <img
              src={singleCartItem?.thumbnail}
              className="thumbnail"
              onClick={() => navigate(`/product-details/${singleCartItem.id}`)}
            />
          </div>
          <div>
            <h3 className="item-title">{singleCartItem?.title}</h3>
            <button
              onClick={() => handleRemove(singleCartItem, true)}
              className="remove-button"
            >
              REMOVE
            </button>
          </div>
        </div>
        <div className="price-container">
          <h3 className="item-price">
            ${singleCartItem?.totalPrice.toFixed(2)}
          </h3>
          <p className="quantity-info">
            Quantity: {singleCartItem?.quantity}
          </p>
          <div className="quantity-buttons">
            <button
              onClick={() => handleRemove(singleCartItem, false)}
              className="decrement-button"
              disabled={singleCartItem?.quantity === 1}
            >
              -
            </button>
            <button
              onClick={() => handleCart(singleCartItem)}
              className="increment-button"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <hr className="separator" />
    </>
  );
}

export default CartTile;

