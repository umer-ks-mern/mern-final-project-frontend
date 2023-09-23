import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthModal from '../../modules/customer/Components/AuthModal';
import Cookies from "js-cookie";
import Search from "./Search";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () => {
  const [authenticated, setAuthenticated] = useState(!!Cookies.get('token'))
  const navigate=useNavigate()
  let totalItemsInCart=0

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
   <div className="relative">
        {/* Shopping cart icon */}
        <ShoppingCartIcon
          color="success"
          className="text-white text-3xl cursor-pointer flex space-between"
        />

        {/* Cart counter */}
        {totalItemsInCart >= 0 && (
          <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">
            {totalItemsInCart}
          </div>
        )}
      </div>    <div className="flex items-center space-x-4">
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
