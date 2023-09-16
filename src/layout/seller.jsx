import { Link, Outlet } from "react-router-dom";

const navBar = [
  
];

const Layout = () => {
  return (
    <>
      <body>
        <div className="sidenav">
          {navBar.map((ele) => (
            <Link to={ele.path}>{ele.name}</Link>
          ))}
        </div>
        <div className="main">
          <Outlet />
        </div>
      </body>
    </>
  );
};


export default Layout;