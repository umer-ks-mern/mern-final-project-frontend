import CustomerIndex from "../modules/customer/pages/CustomerIndex";
import { sellerRoutes } from "../modules/seller/routes";

export const LayoutRouter = [
  { path: "layout-route", element: <h1>Layout</h1> },
  {path:"/", element:<CustomerIndex/>},

];
