import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewOrders=()=>{

const [orders,setOrders]=useState();
useEffect(()=>{
axios.get("http://localhost:3300/bills").then((res)=>{
    setOrders(res.data)
}).catch((err)=>{
    toast.error("Request Failed!")
})
},[]);

    return(
        <div>
      <h1>Admin Order List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Products</th>
            <th>Address</th>
            <th>Total</th>
           
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.products}</td>
              <td>{order.address}</td>
              <td>{order.total}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
};

export default ViewOrders;