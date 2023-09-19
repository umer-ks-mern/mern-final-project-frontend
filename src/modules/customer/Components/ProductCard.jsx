import React from 'react';

const ProductCard = ({ id, name, category, price, quantity, description }) => {
  return (
    <div className="border rounded-lg shadow-md bg-white overflow-hidden">
      {/* Product Image Skeleton Loader */}
      {/* <div className="animate-pulse bg-gray-200 w-full h-40"></div> */}
      <img src='https://www.jerdoni.com/cdn/shop/products/Back_abe5095c-126c-42ff-8397-257dc9a2f790.jpg?v=1659701957'/>

      <div className="p-4">
        
        <h1 className="text-xl font-semibold mb-2">{name}</h1>

        
        <p className="text-gray-600 text-sm mb-2">{category}</p>

        
        <h2 className="text-lg font-bold mb-2">${price}</h2>

        
        <p className="text-gray-600 text-sm">Quantity: {quantity} in stock</p>

      
        <p className="text-gray-700 mt-2">{description}</p>
      </div>
    </div>
  );
};

export default ProductCard;
