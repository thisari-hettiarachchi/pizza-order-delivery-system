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
      console.log("Fetching orders from:", `${url}/api/order/getall`);

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
  const updateOrderStatus = async (Id, newStatus) => {
    try {
      const response = await axios.put(`${url}/api/order/${Id}/status`, {
        status: newStatus
      });

      if (response.status === 200) {
        toast.success("Order status updated successfully!");
        fetchAllOrders(); // Refresh the order list
      } else {
        toast.error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Error updating order status");
    }
  };

  useEffect(()=>{
    fetchAllOrders();
  },[])

  const handleStatusChange = (index, newStatus) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = newStatus; // Update the status locally
    setOrders(updatedOrders);
  };


  return (
    <div className='order-add'>
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
                        return item.itemName + "*" +item.quantity
                      }
                      else{
                        return item.itemName + "*" +item.quantity + ", "
                      }
                    })
                    }
                </p>
                <p className="order-item-name">{order.userName}</p>
                <div className="order-item-address">
                  <p>{order.address.street+","}</p>
                  <p>{order.address.city+","+order.address.state+","+order.address.country+","+order.address.zipcode}</p>
                </div>
                <p className='order-item-phone'>{order.contactNumber}</p>
              </div>
              <p>Item : {order.items.length}</p>
              <p>Rs.{order.lastTotalPrice}</p>
              
              <select
                value={order.status} 
                onChange={(e) => handleStatusChange(index, e.target.value)}

              >
                <option value="FOOD_PROCESSING">Food Processing</option>
                <option value="DISPATCHED">Dispatched</option>
                <option value="DELIVERED">Delivered</option>
              </select>
              
              <button className='on-click'onClick={()=> updateOrderStatus(order.id,order.status)}>Verify</button> 
              
            </div>
          ))
        }
      </div>
      
    </div>
  )
}

export default Orders;
