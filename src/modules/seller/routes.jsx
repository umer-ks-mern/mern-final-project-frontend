import UpdateProduct from "./pages/UpdateProduct";
import AddProduct from "./pages/addproduct";
import ViewOrders from "./pages/viewOrders.jsx";
import ViewProducts from "./pages/viewProducts";
import ViewUser from "./pages/viewUser";

export const sellerRoutes = [
  {
    path: "/addproduct",
    element: <AddProduct />,
  },
  {
    path: "/updateproduct",
    element: <UpdateProduct />,
  },
  {
    path:"/viewUsers",
    element:<ViewUser/>
  },
  {
    path:"/viewProducts",
    element:<ViewProducts/>
  },
  {
    path:"/viewOrders",
    element:<ViewOrders/>
  }
];
