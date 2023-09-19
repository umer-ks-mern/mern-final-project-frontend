import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthModal from './AuthModal';
import Cookies from "js-cookie";

const Navbar = () => {
  const [authenticated, setAuthenticated] = useState(!!Cookies.get('token'))

  const handleAuth = (action) => {
    if (action === "signin") {
      // Handle Signin Logic
      console.log("Signin clicked");
    } else if (action === "signup") {
      // Handle Signup Logic
      console.log("Signup clicked")
    } else if (action === "logout") {
      // Handle Logout Logic
      console.log("Logout clicked")
      Cookies.remove('token')
      setAuthenticated(false)
    }
  }

  return (
    <nav className="bg-gray-800 p-5 flex justify-between items-center">
      <Link to="/" className="text-white font-bold text-2xl">
        Ecommerce Store
      </Link>
      <div className="flex items-center">
        <div className="flex flex-col items-center mr-5">
          <input
            className="p-2 border rounded mb-2 w-full max-w-md"
            type="text"
            placeholder="Search"
          />
          <button
            className="p-2 bg-blue-300 rounded w-full max-w-md text-gray-800"
          >
            Search
          </button>
        </div>
        <div className="flex">
          {authenticated ? (
            <button
              className="p-2 rounded text-white bg-red-500"
              onClick={() => handleAuth("logout")}
            >
              Logout
            </button>
          ) : (
            <>
              <AuthModal isSignin={false} onAuthentication={setAuthenticated} />
              <AuthModal isSignin={true} onAuthentication={setAuthenticated} />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
