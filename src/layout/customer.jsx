import { Link, Outlet } from "react-router-dom";

const navBar = [
  
];

const Layout = () => {
  return (
    <>
      <div className="sidenav">
        {navBar.map((ele, index) => (
          <Link key={index} to={ele.path}>
            {ele.name}
          </Link>
        ))}
      </div>
      <div className="main">
        <Outlet />
      </div>
    </>
  );
};


export default Layout;