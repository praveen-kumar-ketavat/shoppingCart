import { useContext } from "react";
import { GlobalContext } from "../Context";
import CartTile from "../Tiles/CartTile";
import "./cart.css";
import { useNavigate } from "react-router-dom";

function Cart() {
  let { cartItems } = useContext(GlobalContext);
  console.log(cartItems);
  let navigate = useNavigate();
  return (
    <div className="container">
      <h1 className="page-title">My Cart Page</h1>
      <div className="grid-layout">
        <div className="cart-items">
          {cartItems?.length ? (
            cartItems.map((singleCartItem) => (
              <CartTile singleCartItem={singleCartItem} />
            ))
          ) : (
            <h1 className="empty-cart-message">
              No items available in cart! Please add some items
            </h1>
          )}
        </div>
        <div className="order-summary">
          <h3 className="summary-title">Order Summary</h3>
          <ul className="summary-details">
            <p className="summary-total">
              Total{" "}
              <span>
                $
                {cartItems
                  .reduce((acc, curr) => acc + curr.totalPrice, 0)
                  .toFixed(2)}
              </span>
            </p>
          </ul>
          <div className="buttons">
            <button disabled={cartItems.length === 0} className="button">
              Checkout
            </button>
            <button onClick={() => navigate("/products")} className="button">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cart;
