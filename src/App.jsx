import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import Products from "./components/Products/Products";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Cart from "./components/Cart/Cart";
import Categories from "./components/Categories/Categories";
import NotFound from "./components/NotFound/NotFound";
import ContextProvider from "./Context/cartContext.jsx";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import SingleProduct from "./components/SingleProduct/SingleProduct.jsx";
import SingleCategories from "./components/SingleCategories/SingleCategories.jsx";
import CheckOut from "./components/CheckOut/CheckOut.jsx";
import AllOrders from "./components/AllOrders/AllOrders.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword.jsx";
import ResetCode from "./components/ResetCode/ResetCode.jsx";
import ResetPassword from "./components/ResetPassword/ResetPassword.jsx";
import Wishlist from "./components/Wishlist/Wishlist.jsx";
const App = () => {
  const queryclient = new QueryClient();
  const [userData, setUserData] = useState(null);
  const saveUserData = () => {
    const token = localStorage.getItem("userToken");
    const decoded = jwtDecode(token);
    setUserData(decoded);
  };
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveUserData();
    }
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout userData={userData} />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "/products/:productId",
          element: (
            <ProtectedRoute>
              <SingleProduct />
            </ProtectedRoute>
          ),
        },
        {
          path: "/login",
          element: <Login saveUserData={saveUserData} />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/forgetpassword",
          element: <ForgetPassword />,
        },
        {
          path: "/resetcode",
          element: <ResetCode />,
        },
        {
          path: "/resetpassword",
          element: <ResetPassword />,
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "/categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "/categories/:categoryId",
          element: (
            <ProtectedRoute>
              <SingleCategories />
            </ProtectedRoute>
          ),
        },
        {
          path: "*",
          element: <NotFound />,
        },
        {
          path: "/checkout",
          element: <CheckOut />,
        },
        {
          path: "/allorders",
          element: <AllOrders />,
        },
        {
          path: "/wishlist",
          element: <Wishlist />,
        },
      ],
    },
  ]);
  return (
    <QueryClientProvider client={queryclient}>
      <ContextProvider>
        <RouterProvider router={router}></RouterProvider>
      </ContextProvider>
    </QueryClientProvider>
  );
};

export default App;
