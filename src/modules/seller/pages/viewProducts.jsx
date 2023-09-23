// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import { decodeToken } from "react-jwt";
// import DynamicTable from "../../../layout/Table.layout";


// const columns = [
//   { id: "name", label: "Product Name", minWidth: 170 },
//   { id: "price", label: "Price", minWidth: 90 },
//   { id: "actions", label: "Actions", minWidth: 160 },
// ];

// export default function ViewProducts() {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);
//   const [products, setProducts] = useState([]);
//   const [isDeleted,setIsDeleted]=useState(false)
//   const navigation=useNavigate()

//   const token = Cookies.get("token");
//   const { role } = decodeToken(token);
//   const headers = {
//     Authorization: `Bearer ${token}`,
//     "user-role": role,
//   };

//   useEffect(()=>{
//     axios.get("http://localhost:3300/products").then((res)=>{
//         setProducts(res.data)
//     }).catch((err)=>{
//         toast.error("Request Failed!")
//     })
//     },[])
  

//   useEffect(() => {
//     if (isDeleted) {
//       // Fetch the updated product list after deletion
//       axios
//         .get("http://localhost:3300/products")
//         .then((res) => {
//           setProducts(res?.data);
//         })
//         .catch((err) => {
//           toast.error("Error fetching products");
//         });
  
//       // Reset the isDeleted state
//       setIsDeleted(false);
//     }
//   }, [isDeleted]);
  

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const handleAction=async (action,product_id)=>{
//     if(action==='edit'){
//       

     
      
//       toast.info("Edit action clicked",product_id)
//     }

//     if (action === 'delete') {
//       await axios.delete(`http://localhost:3300/product/${product_id}`, { headers })
//         .then(() => {
//           setIsDeleted(true);
//           toast.success("Product deleted successfully!");
//         })
//         .catch(e => {
//           toast.error(e);
//         });
//     }

//     if( action ==='create'){
//       navigation("/admin/addproduct")
//       navigation("admin/viewProducts")
//     }
    


//   }
  

//   return (
//     <DynamicTable/>
//      );
// }




import React, { useEffect, useState } from "react";
import DynamicTable from "../../../layout/Table.layout";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";
import axios from "axios";
import { toast } from "react-toastify";

const ViewProducts = () => {
  // Sample data and columns


  const columns = [
    
    { id: "name", label: "Product Name" },
    { id: "price", label: "Price" },
  ];


     const [products, setProducts] = useState([]);
    const [isDeleted,setIsDeleted]=useState(false)
    const navigation=useNavigate()
  
    const token = Cookies.get("token");
    const { role } = decodeToken(token);
    const headers = {
      Authorization: `Bearer ${token}`,
      "user-role": role,
    };
  
    useEffect(()=>{
      axios.get("http://localhost:3300/products").then((res)=>{
          setProducts(res.data)
      }).catch((err)=>{
          toast.error("Request Failed!")
      })
      },[])



        useEffect(() => {
    if (isDeleted) {
      // Fetch the updated product list after deletion
      axios
        .get("http://localhost:3300/products")
        .then((res) => {
          setProducts(res?.data);
        })
        .catch((err) => {
          toast.error("Error fetching products");
        });
  
      // Reset the isDeleted state
      setIsDeleted(false);
    }
  }, [isDeleted]);
  
  const handleEdit = async () => {
    // Handle edit action here
    
    products.map(product=>{
    navigation(`/admin/updateproduct/${product._id}`)
    })
  };

  const handleDelete = async () => {
     products.map(product=>{ 
       axios.delete(`http://localhost:3300/product/${product._id}`, { headers })
     .then(() => {
       setIsDeleted(true);
       toast.success("Product deleted successfully!");
     })
     .catch(e => {
       toast.error(e);
     });})
   
  };

  const actions = [
    { label: "Edit", handler: handleEdit, color: "blue" },
    { label: "Delete", handler: handleDelete, color: "red" },
  ];

  return (
    <DynamicTable
      data={products}
      columns={columns}
      rowsPerPageOptions={[5, 10, 25]}
      defaultRowsPerPage={5}
      onAction={actions}
    />
  );
};

export default ViewProducts;
