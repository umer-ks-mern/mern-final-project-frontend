import React from 'react'

const ProductCard = ({id,name,category,price,quantity,description}) => {
  return (
    <div
    style={{
      border: "1px solid #ccc",
      margin: "1rem",
      padding: "1rem",
      borderRadius: "0.25rem",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#fff",
    }}
  >
    <div style={{ fontSize: "1rem" }}>
      <h1>{name}</h1>
      <h1>{category}</h1>
      <h2>${price}</h2>
      <p>Quantity: {quantity} in stock</p>
      <p>{description}</p>
    </div>
  </div>
  )
}

export default ProductCard