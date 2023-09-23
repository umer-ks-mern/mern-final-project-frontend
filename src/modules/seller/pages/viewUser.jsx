import React from 'react';
import { useEffect,usestate } from 'react';
import axios from 'axios';

const ViewUser=()=>{

    const [users,setUsers]=usestate('');
 useEffect(()=>{
    axios.get("https://localhost:3300/users").then((res)=>{
        setUsers(res.data)
    }).catch((err)=>{
        {<h5>Error found</h5>}
    })
 },[])

    return (
        <>
        <div className="bg-gray-100 p-4">
      <h1 className="text-2xl font-semibold mb-4">User List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white p-4 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">{user.phone}</p>
            {/* Add more user information here */}
          </div>
        ))}
      </div>
    </div>
        
        </>
    )
};

export default ViewUser;