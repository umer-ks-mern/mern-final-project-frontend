import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../../Common/Navbar/Navbar';
import axios from 'axios';
import ProductCard from '../Components/ProductCard';




const CustomerIndex = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('q');
  const [data, setData] = useState([]);
  console.log(searchQuery)

  useEffect(() => {
    fetchData();
  }, [searchQuery]); // Re-fetch data when the searchQuery changes

  async function fetchData() {
    try {
      let endpoint = 'http://localhost:3300/products';
      if (searchQuery) {
        // If a search query is present, append it to the endpoint
        endpoint += `?q=${searchQuery}`;
      }
      const response = await axios.get(endpoint);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        {data.length === 0 ? (
          <p className="text-center text-gray-600">No products available.</p>
        ) : (
          <div className="flex flex-wrap -mx-2">
            {data.map((product, index) => (
              <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-2 mb-4">
                <ProductCard
                key={index}

                  id={product._id}
                  name={product.name}
                  category={product.category}
                  price={product.price}
                  quantity={product.quantity}
                  description={product.description}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CustomerIndex;
