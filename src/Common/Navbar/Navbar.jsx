import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthModal from '../../modules/customer/Components/AuthModal';
import Cookies from "js-cookie";
import Search from "./Search";

const Navbar = () => {
  const [authenticated, setAuthenticated] = useState(!!Cookies.get('token'))
  const navigate=useNavigate()

  const handleAuth = (action) => {
  
     if (action === "logout") {
     
      console.log("Logout clicked")
      navigate("/")
      Cookies.remove('token')
      setAuthenticated(false)
      
    }
  }

  return (
    <nav className="bg-gray-800 p-4 md:p-5 flex justify-between items-center">
    <Link to="/" className="text-white font-bold text-2xl">
      Ecommerce Store
    </Link>
   <Search/>
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
