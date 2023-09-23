import { useEffect,useState } from 'react';
import ProductItem from './productitem';
import axios from 'axios';

const ViewOrders=()=>{
   
const[orders,setOrders]=useState({
    user_id:"",
    products:"",
    address:"",
    total:""
})
    
useEffect(()=>{
  
axios.get("http:localhost:3300/products").then((res)=>setOrders(res.data)).catch((error) => {
    console.log('Error updating product:', error);
 })

},[])

    return (
        <div>
            <h1 className="my-5 text-center">Oders List</h1>

            {
                orders.length > 0 ? (
                    <div className="card bg-secondary p-3">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">User_id</th>
                                    <th scope="col">Products</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Total</th>
                                   
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.map(order => <OrderItem order={order} key={order.id} />)
                                }
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <h3 className="text-center">No Orders</h3>
                )
            }

        </div>
    )
};


export default ViewProduct;