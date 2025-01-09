import React from 'react'
import { useContext } from 'react'
import './cart.css'

export default function cart() {
  const {Cart_Items,Foodlist,removeFromcart,getTotalcartAmount} =useContext(Storecontext);  
  return (
    <div class="Cart">
      <div className="cart-item">
        <div className="cart-item-title">
          <p>Items</p>
          <p>Title</p>
          <p>price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>

        </div>
        <br/>
        <hr/>
        {Foodlist.map(( item,index)=>{
          if (Cart_Items[item_id]>0) {
            return(
              <div>`
              <div className='cart-item-title cart-items-item'>
                <img src='{item.image}' alt=""/>
                <p>{item.name}</p>
                <p>RS{item.price}</p>
                <p>{Cart_Items[item_id]}</p>
                <p>Rs{item.price*Cart_Items[item_id]}</p>
                <p  onClick={()=>removeFromcart(item_id)}className='cross'>x</p>
              </div>
              <hr/>
              </div>
            )
            
          }
        }
      )}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>

              <p>RS{getTotalcartAmount()}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <p>Delivery Fee</p>

              <p>RS{20}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <b>Total</b>
              <b>RS{getTotalcartAmount()+20}</b>
            </div>
            
          </div>
        </div>
        <button>Proceed To Checkout</button>
      </div> 
      <div>
        <div className="cart-promocode">
          <div>
            <p>If you have promocode, Enter here,</p>
            <div className="cart-promeocode-input">
              <input type='text' placeholder='promo_code'/>
              <button>Submit</button>

            </div>
          </div>
        </div>
      </div>

    </div>
  )
}


    

