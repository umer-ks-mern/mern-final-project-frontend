import React from 'react'
// import { useNavigate } from 'react-router-dom';


const UserItem = ({ User}) => {
    const { id, name, address, email, phone } = User;
    // const navigate = useNavigate();

    


    return (
        <tr className="table-primasry">
            <th>{id}</th>
            <th>{name}</th>
            <td>{address}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>
               
            </td>
        </tr>
    )
};
export default UserItem;