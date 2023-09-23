import React, { useEffect, useState } from "react";
import UserItem from "./userItem";
import axios from "axios";

const ViewUser=()=>{
   
const[users,setUsers]=useState({
    name:"",
    phone:"",
    email:"",
    address:""
})
    
useEffect(()=>{
  
axios.get("http:localhost:3300/users").then((res)=>setUsers(res.data)).catch((error) => {
    console.log('Error updating product:', error);
 })

},[])

return (
   
        <div>
            <h1 className="my-5 text-center">User List</h1>

            {
                users.length > 0 ? (
                    <div className="card bg-secondary p-3">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map(User => <UserItem User={User} key={User.id} />)
                                }
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <h3 className="text-center">No Users</h3>
                )
            }

        </div>
    )
};

export default ViewUser;