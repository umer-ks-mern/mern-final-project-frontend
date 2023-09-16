import axios from 'axios';
import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
  const handleAuth = (action) => {
    if (action === "signin") {
      // Handle Signin Logic
      console.log("Signin clicked");
    } else if (action === "signup") {
      // Handle Signup Logic
      console.log("Signup clicked");
    } else if (action === "logout") {
      // Handle Logout Logic
      console.log("Logout clicked");
    }
  };

  const accessToken = localStorage.getItem("token") || '';

  return (
    <nav style={{ background: "#333", padding: "10px 20px", display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
      <Link to="/" style={{ fontWeight: "bold", color: "#fff", fontSize: "24px", textDecoration: "none" }}>
        Ecommerce Store
      </Link>
      <div style={{ display: 'flex', alignItems: "center" }}>
        <input
          style={{
            padding: "5px 10px",
            border: "none",
            borderRadius: "5px",
            marginRight: "10px",
          }}
          type="text"
          placeholder="Search"
        />
        <button
          style={{
            padding: "5px 10px",
            background: "lightblue",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            color: "#333",
          }}
        >
          Search
        </button>
        <div style={{ marginLeft: "10px" }}>
          {accessToken ? (
            <button
              style={{
                padding: "5px 10px",
                background: "#e74c3c",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                color: "#fff",
              }}
              onClick={() => handleAuth("logout")}
            >
              Logout
            </button>
          ) : (
            <>
              <button
                style={{
                  padding: "5px 10px",
                  background: "#3498db",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  color: "#fff",
                }}
                onClick={() => handleAuth("signin")}
              >
                Signin
              </button>
              <button
                style={{
                  marginLeft: "10px",
                  padding: "5px 10px",
                  background: "#2ecc71",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  color: "#fff",
                }}
                onClick={() => handleAuth("signup")}
              >
                Signup
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
