import React from 'react'
import './Order.css'
import { toast } from "react-toastify"
import  axios  from 'axios'
import {assets} from  "../../assets/assets"
import { useEffect,useState } from "react"

const Orders = ({url}) => {

  const [orders,setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/getall`);
      if (response.status === 200) {
        setOrders(response.data);
        console.log(response.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(()=>{
    fetchAllOrders();
  },[])


  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className='order-list'>
        {
          orders.map((order,index)=>(
            <div key={index} className='order-item'>
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className='order-item-food'>
                    {order.items.map((item,index)=>{
                      if (index===order.items.length-1) {
                        return item.name + "*" +item.quantity
                      }
                      else{
                        return item.name + "*" +item.quantity + ","
                      }
                    })
                    }
                </p>
                <p className="order-item-name">{order.firstName+""+order.lastName}</p>
                <div className="order-item-address">
                  <p>{order.address.street+","}</p>
                  <p>{order.address.city+","+order.address.state+","+order.address.country+","+order.address.zipcode}</p>
                </div>
                <p className='order-item-phone'>{order.contactNumber}</p>
              </div>
              <p>Item : {order.items.length}</p>
              <p>Rs.{order.amount}</p>
              <select>
                <option value="Food Processing">Food Processing</option>
                <option value="Dispatched">Dispatched</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        }
      </div>
      
    </div>
  )
}

export default Orders;
