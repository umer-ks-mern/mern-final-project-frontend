import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DynamicTable from "../../../layout/Table.layout";

const ViewOrders=()=>{

const [orders,setOrders]=useState([]);
useEffect(()=>{
axios.get("http://localhost:3300/bills").then((res)=>{
    setOrders(res.data)
}).catch((err)=>{
    toast.error("Request Failed!")
})
},[]);

const columns = [
    
  { id: "id", label: "id" },
  { id: "Products", label: "Products" },
  { id: "Address", label: "Address" },
  { id: "Total", label: "Total"}
  
];

    return(
      <DynamicTable data={orders} columns={columns} rowsPerPageOptions={[5, 10, 25]} defaultRowsPerPage={5}/>
      )
};

export default ViewOrders;