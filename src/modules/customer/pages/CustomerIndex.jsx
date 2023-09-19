import {React,useState,useEffect} from 'react'
import Navbar from '../Components/Navbar';
import axios from 'axios';
import ProductCard from '../Components/ProductCard';


const CustomerIndex = () => {
  const [data,setData]=useState([])

  useEffect(() => {
    fetchData()
  }, []);
  
  async function fetchData(){
    const res=await axios.get("http://localhost:3300/products")
    .then((res) => {
      setData(res.data);
    })
    .catch((error) => console.table(error.message));
    return res
  }

 

  return (
    <>
    <Navbar/>
    {data.map((product,index) => (

      <ProductCard  key={index}  name={product.name} category={product.category} price={product.price} quantity={product.quantity}  description={product.description}/>
      
  
))}

  </>
  
  )
}

export default CustomerIndex