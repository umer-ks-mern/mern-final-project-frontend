import ImageUpload from "../modules/cart/pages/ImageUpload";
import CheckoutPage from "../modules/cart/pages/checkout";
import CartView from "../modules/cart/pages/view";
import CustomerIndex from "../modules/customer/pages/CustomerIndex";
import Product from "../modules/products/components/Product";
import { sellerRoutes } from "../modules/seller/routes";

export const LayoutRouter = [
  { path: "/", element: <CustomerIndex /> },
  { path: "/cart", element: <CartView /> },
  { path: "/checkout", element: <CheckoutPage /> },
  { path: "/product/:id", element: <Product /> },
  { path: "/upload", element: <ImageUpload /> },
  [...sellerRoutes],
];
