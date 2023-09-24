import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthModal from "../../modules/customer/Components/AuthModal";
import Cookies from "js-cookie";
import Search from "./Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = () => {
  const [authenticated, setAuthenticated] = useState(!!Cookies.get("token"));
  const navigate = useNavigate();

  const handleAuth = (action) => {
    if (action === "logout") {
      console.log("Logout clicked");
      navigate("/");
      Cookies.remove("token");
      setAuthenticated(false);
    }
  };

  return (
    <nav className="bg-gray-800 p-4 md:p-5 flex justify-between items-center">
      <Link to="/" className="text-white font-bold text-2xl">
        Ecommerce Store
      </Link>
      <Search />
      <div className="flex items-center space-x-4">
        {authenticated ? (
          <>
            <ShoppingCartIcon
              className="mx-4 text-gray-200 hover:text-white cursor-pointer"
              onClick={() => navigate("/cart")}
            />
            <LogoutIcon
              className="mx-4 text-gray-200 hover:text-white cursor-pointer"
              onClick={() => handleAuth("logout")}
            />
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
};

export default Navbar;
