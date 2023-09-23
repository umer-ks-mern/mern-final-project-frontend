import Upload from "./pages/Upload";
import AddProduct from "./pages/addproduct";
import UpdateProduct from "./pages/updateProduct";
import ViewProduct from "./pages/viewproduct";
import ViewUser from "./pages/viewuser";

export const sellerRoutes = [
  {
    path: "/admin/addproduct",
    element: <AddProduct />,
  },
  {
    path: "/admin/updateproduct",
    element: <UpdateProduct />,
  },
  {
    path: "/admin/viewUser",
    element: <ViewUser />,
  },
  {
    path: "/admin/viewProduct",
    element: <ViewProduct/>,
  },
  {
    path:"/admin/upload",
    element:<Upload/>
  }
];
