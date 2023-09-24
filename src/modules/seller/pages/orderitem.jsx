import React from 'react'
import { useNavigate } from 'react-router-dom';


const OrderItem = ({ Order}) => {
    const {  user_id, product,address,total } = Order;
    const navigate = useNavigate();

    


    return (
        <tr className="table-primasry">
            <th>{user_id}</th>
            <th>{product}</th>
            <td>{address}</td>
            <td>{total}</td>
            
            <td>
                <div className="d-flex gap-3">
                    <span type="button" className="badge bg-success" onClick={() => navigate(`/admin/update/${id}`)}>Edit</span>
                    
                    
                </div>
            </td>
        </tr>
    )
};
export default UserItem;