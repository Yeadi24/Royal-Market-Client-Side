import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import RootLayout from "../Layouts/RootLayout";
import AuthLayout from "../Layouts/AuthLayout";
import LogIn from "../Pages/Shared/LogIn";
import Register from "../Pages/Shared/Register";
import VendorLayout from "../Layouts/VendorLayout";
import AddProduct from "../Pages/Vendor/AddProduct";
import PrivateRoute from "./PrivateRoute";
import MyProducts from "../Pages/Vendor/MyProducts";
import UpdateProduct from "../Pages/Vendor/UpdateProduct";
import AddAdvertisement from "../Pages/Vendor/AddAdvertisement";
import MyAdvertisements from "../Pages/Vendor/MyAdvertisements";
import UpdateAd from "../Pages/Vendor/UpdateAd";
import AllUsers from "../Pages/Admin/AllUsers";
import Products from "../Pages/Admin/Products";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/",
        Component: AuthLayout,
        children: [
          {
            path: "login",
            Component: LogIn,
          },
          {
            path: "register",
            Component: Register,
          },
        ],
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <VendorLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "addProduct",
        element: (
          <PrivateRoute>
            <AddProduct></AddProduct>
          </PrivateRoute>
        ),
      },
      {
        path: "myProducts",
        element: (
          <PrivateRoute>
            <MyProducts></MyProducts>
          </PrivateRoute>
        ),
      },
      {
        path: "updateProduct/:id",
        element: (
          <PrivateRoute>
            <UpdateProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "addAdvertisement",
        element: (
          <PrivateRoute>
            <AddAdvertisement></AddAdvertisement>
          </PrivateRoute>
        ),
      },
      {
        path: "myAdvertisements",
        element: (
          <PrivateRoute>
            <MyAdvertisements></MyAdvertisements>
          </PrivateRoute>
        ),
      },
      {
        path: "updateAd/:id",
        element: (
          <PrivateRoute>
            <UpdateAd></UpdateAd>
          </PrivateRoute>
        ),
      },
      {
        path: "users",
        element: (
          <PrivateRoute>
            <AllUsers></AllUsers>
          </PrivateRoute>
        ),
      },
      {
        path: "products",
        element: (
          <PrivateRoute>
            <Products></Products>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
