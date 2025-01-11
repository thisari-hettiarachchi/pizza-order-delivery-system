import React, { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import "./cart.css";

export default function Cart() {
  const { food_list, cartItems, removeFromCart, getTotalPrice,lastTotalprice } = useContext(StoreContext);

  return (
    <div className="Cart">
      <div className="cart-item">
        <div className="cart-item-title">
          <p>Image</p>
          <p>Title</p>
          <p>Size</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {Object.entries(cartItems).map(([compositeKey, quantity]) => {
          const [itemId, size] = compositeKey.split("|");
          const item = food_list.find((food) => food._id === itemId);

          if (item && quantity > 0) {
            const sizePrice = item.price[size] || 0; // Size-specific price
            return (
              <div key={compositeKey}>
                <div className="cart-item-title cart-items-item">
                  <img src={item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>{size}</p>
                  <p>RS {sizePrice}</p>
                  <p>{quantity}</p>
                  <p>RS {sizePrice * quantity}</p>
                  <p
                    onClick={() => removeFromCart(itemId, size)}
                    className="cross"
                  >
                    <button type="button" className="btn btn-outline-warning" >Remove</button>
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          return null; // Skip items with no quantity
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>RS {getTotalPrice()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>RS 200</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>RS {lastTotalprice() }</b>
            </div>
          </div>
        </div>
        <button className="proceed-btn">Proceed To Checkout</button>
      </div>
      <div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here:</p>
            <div className="cart-promeocode-input">
              <input type="text" placeholder="promo_code" />
              <button className="submit.btn">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
