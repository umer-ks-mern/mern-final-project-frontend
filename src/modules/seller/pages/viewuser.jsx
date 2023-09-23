import React, { useState } from 'react';
import { useEffect,usestate } from 'react';
import axios from 'axios';
import DynamicTable from '../../../layout/Table.layout';

const ViewUser=()=>{

    const [users,setUsers]=useState([]);
 useEffect(()=>{
    axios.get("http://localhost:3300/users").then((res)=>{
        setUsers(res?.data)
    }).catch((err)=>{
        console.log(err)
    })
 },[])

 const columns=[
  { id: "name", label: "User Name" },
  { id: "email", label: "Email" },
  {id:'phone',label:'Phone'}
 ]

    return (
        <>
      <DynamicTable data={users} columns={columns} rowsPerPageOptions={[5,10,15]} defaultRowsPerPage={5}/>
        </>
    )
};

export default ViewUser;