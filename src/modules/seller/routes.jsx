import UpdateProduct from "./pages/UpdateProduct";
import AddProduct from "./pages/addproduct";

export const sellerRoutes = [
  {
    path: "/admin/addproduct",
    element: <AddProduct />,
  },
  {
    path: "/admin/updateproduct",
    element: <UpdateProduct />,
  },
];
