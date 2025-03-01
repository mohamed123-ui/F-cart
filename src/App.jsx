import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Mainlayout from "./Components/Mainlayout/Mainlayout";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register.jsX";
import Product from "./Pages/Product/Product.jsX";
import TokenContextProvider from "./Components/context/TokenContext";
import Cart from "./Pages/Cart/Cart.jsX";
import Categories from "./Pages/Categories/Categories.jsX";
import ProtecetedRouts from "./Components/ProtecetedRout/ProtecetedRout";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CartContextProvider from "./Components/context/CartContext";
import Login from "./Pages/Login/Login";
import { ToastContainer } from "react-toastify";
import Checkout from "./Pages/Checkout/Checkout";
import Allorder from "./Pages/Allorders/Allorder";
import WishlistContextProvider from "./Components/context/WishlistContext";
import Wishlist from "./Pages/Wishlist/Wishlist";
import Brands from "./Pages/Brands/Brands";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Mainlayout />,
      children: [
        {
          index: true,
          element: (
            <ProtecetedRouts>
              <Home />
            </ProtecetedRouts>
          ),
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "Register",
          element: <Register />,
        },

        {
          path: "Product",
          element: (
            <ProtecetedRouts>
              <Product />
            </ProtecetedRouts>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtecetedRouts>
              <Cart />
            </ProtecetedRouts>
          ),
        },
        {
          path: "Categories",
          element: (
            <ProtecetedRouts>
              <Categories />
            </ProtecetedRouts>
          ),
        },
        {
          path: "ProductDetails/:productId",
          element: (
            <ProtecetedRouts>
              <ProductDetails />
            </ProtecetedRouts>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtecetedRouts>
              <Checkout />
            </ProtecetedRouts>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtecetedRouts>
              <Allorder />
            </ProtecetedRouts>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtecetedRouts>
              <Wishlist />
            </ProtecetedRouts>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtecetedRouts>
              <Brands />
            </ProtecetedRouts>
          ),
        },
        {
          path: "forgotpassword",
          element: (
              <ForgotPassword />
          ),
        },
      ],
    },
  ]);
  return (
    <TokenContextProvider>
      <CartContextProvider>
      <WishlistContextProvider>
          <RouterProvider router={routes} />
        <ToastContainer />
      </WishlistContextProvider>

      </CartContextProvider>
     
    </TokenContextProvider>
  );
}
//moahmed11@gmail.com
//pas:mo12345678
