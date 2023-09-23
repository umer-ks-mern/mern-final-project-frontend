import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const ProductItem = ({ product}) => {
    const { id, name, price, category, description } = product;
    const navigate = useNavigate();
 const onDel=({id})=>{
    axios.delete(`http:localhost:3300/product/${id}`).then((res)=>toast.success("Product Deleted")).cath((err)=> toast.error(error));
 }
    


    return (
        <tr className="table-primasry">
            <th>{id}</th>
            <th>{name}</th>
            <td>{price}</td>
            <td>{category}</td>
            <td>{description}</td>
            <td>
                <div className="d-flex gap-3">
                    <span type="button" className="badge bg-success" onClick={() => navigate(`/admin/update/${id}`)}>Edit</span>
                    <span type="button" className="badge bg-success" onClick={() => onDel({id})}>Delete</span>
                    <span type="button" className="badge bg-success" onClick={() => navigate(`/view-User/${id}`)}>View</span>
                </div>
            </td>
        </tr>
    )
};
export default ProductItem;