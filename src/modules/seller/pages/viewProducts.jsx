import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewProducts=()=>{
const navigate=useNavigate();
const [products,setProducts]=useState();
useEffect(()=>{
axios.get("http://localhost:3300/products").then((res)=>{
    setProducts(res.data)
}).catch((err)=>{
    toast.error("Request Failed!")
})
},[]);

const editProduct = (productId) => {
   axios.put(`http://localhost:3300/product/${productId}`).then((res)=>{
   setProducts(res.data); 
   toast.success("ProductUpdated!");
   }).catch((err)=>{
    toast.error("Request Failed!")
})
  }

  // Function to simulate deleting a product
  const deleteProduct = (productId) => {
    axios.delete(`http://localhost:3300/product/${productId}`).then((res)=>{
        setProducts(res.data); 
        toast.success("Product Deleted!");
        }).catch((err)=>{
         toast.error("Request Failed!")
     })
}



    return(
        <div>
      <h1>Admin Product List</h1>
      <button onClick={()=>navigate("/admin/addproduct")}>Add New Product</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <button className="edit-button" onClick={() => editProduct(product.id)}>Edit</button>
                <button className="delete-button" onClick={() => deleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
};

export default ViewProducts;