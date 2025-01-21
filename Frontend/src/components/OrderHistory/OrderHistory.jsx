import React from 'react'
import "./OrderHistory.css";

const OrderHistory = () => {
    
  return (
    <div className="OrderHistory-Container">
        <p className="OrderHistory-title">Previous Orders</p>
        <table className="OrderHistory-Table">
            <thead>
                <tr>
                    <th>Order</th>
                    <th>Address</th>
                    <th>Ordered On</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {OrderHistory.length === 0 ? (
                    <tr>
                        <td colSpan="4" className="empty-state">
                            No orders found
                        </td>
                    </tr>
                ) : (
                    OrderHistory.map((order, index) => (
                        <tr key={index}>
                            <td>{order.id}</td>
                            <td>{order.address}</td>
                            <td>{order.date}</td>
                            <td className="remove-cell">
                                <button className="remove-button" onClick = {() => console.log(`Remove order ${order.id}`)}>
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    </div>
  )
}

export default OrderHistory