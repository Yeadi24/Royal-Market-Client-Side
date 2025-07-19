import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import RootLayout from "../Layouts/RootLayout";
import AuthLayout from "../Layouts/AuthLayout";
import LogIn from "../Pages/Shared/LogIn";
import Register from "../Pages/Shared/Register";
import UserLayout from "../Pages/User/UserLayout";
import VendorLayout from "../Layouts/VendorLayout";
import AdminLayout from "../Layouts/AdminLayout";
import AddProduct from "../Pages/Vendor/AddProduct";
import PrivateRoute from "./PrivateRoute";
import MyProducts from "../Pages/Vendor/MyProducts";
import UpdateProduct from "../Pages/Vendor/UpdateProduct";
import AddAdvertisement from "../Pages/Vendor/AddAdvertisement";
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
    path: "/userDashboard",
    Component: UserLayout,
    children: [
      {
        path: "addProduct",
        Component: AddProduct,
      },
    ],
  },
  {
    path: "/vendorDashboard",
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
    ],
  },
  {
    path: "/adminDashboard",
    Component: AdminLayout,
    children: [{}],
  },
]);
