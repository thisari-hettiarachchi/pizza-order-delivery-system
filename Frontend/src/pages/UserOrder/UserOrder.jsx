import React, { useContext, useEffect, useState } from 'react'
import {StoreContext} from '../../Context/StoreContext'
import './UserOrder.css'

const UserOrder = () => {

  const {url,token} = useContext(StoreContext);
  const[data,setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(url+"/api/orders/userorders", {}, {headers: {token}});
    setData(response.data.data);
    
  }

  useEffect(()=>{
    if(token){
      fetchOrders();
    }
  },[token])

  return (
    <div className="user-order">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((UserOrder,index)=>{
          return(
            <div key={index} className="user-order-order">
              <img src={AuthenticatorAssertionResponse.parcel_icon} alt=""/>
              <p>{UserOrder.items.map((item,index)=>{
                if(index=== UserOrder.items.length-1){
                  return item.name+" x "+item.quantity
                }
                else{
                  return item.name+" x "+item.quantity+", "
                }
              })}</p>
              <p>Rs.{order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p><span>&#x25cf;</span><b>{order.status}</b></p>
              <button>Track Order</button>

            </div>
          )
        })}
       
      </div>
      
    </div>

   
  )
}

export default UserOrder