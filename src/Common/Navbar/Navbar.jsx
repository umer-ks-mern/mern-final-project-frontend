import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthModal from '../../modules/customer/Components/AuthModal';
import Cookies from "js-cookie";

const Navbar = () => {
  const [authenticated, setAuthenticated] = useState(!!Cookies.get('token'))
  const navigate=useNavigate()

  const handleAuth = (action) => {
    // if (action === "signin") {
    //   // Handle Signin Logic
    //   console.log("Signin clicked");
    // } else if (action === "signup") {
    //   // Handle Signup Logic
    //   console.log("Signup clicked")
    // } 
     if (action === "logout") {
      // Handle Logout Logic
      console.log("Logout clicked")
      Cookies.remove('token')
      setAuthenticated(false)
      navigate("/")
    }
  }

  return (
    <nav className="bg-gray-800 p-4 md:p-5 flex justify-between items-center">
    <Link to="/" className="text-white font-bold text-2xl">
      Ecommerce Store
    </Link>
    <div className="flex-grow flex items-center justify-center mx-2">
      <input
        className="p-2 border rounded-l-lg w-full max-w-md focus:outline-none"
        type="text"
        placeholder="Search products..."
      />
      <button
        className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-r-lg transition duration-300"
      >
        Search
      </button>
    </div>
    <div className="flex items-center space-x-4">
      {authenticated ? (
        <>
          <span className="text-white">Welcome, User!</span>
          <button
            className="p-2 text-gray-200 hover:text-white"
            onClick={() => handleAuth("logout")}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <AuthModal isSignin={false} onAuthentication={setAuthenticated} />
          <AuthModal isSignin={true} onAuthentication={setAuthenticated} />
        </>
      )}
    </div>
  </nav>
    );
}

export default Navbar;
