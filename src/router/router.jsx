import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import RootLayout from "../Layouts/RootLayout";
import AuthLayout from "../Layouts/AuthLayout";
import LogIn from "../Pages/Shared/LogIn";
import Register from "../Pages/Shared/Register";
import AddProduct from "../Pages/Vendor/AddProduct";
import PrivateRoute from "./PrivateRoute";
import MyProducts from "../Pages/Vendor/MyProducts";
import UpdateProduct from "../Pages/Vendor/UpdateProduct";
import AddAdvertisement from "../Pages/Vendor/AddAdvertisement";
import MyAdvertisements from "../Pages/Vendor/MyAdvertisements";
import UpdateAd from "../Pages/Vendor/UpdateAd";
import AllUsers from "../Pages/Admin/AllUsers";
import Products from "../Pages/Admin/Products";
import Ads from "../Pages/Admin/Ads";
import Orders from "../Pages/Admin/Orders";
import PriceTrends from "../Pages/User/PriceTrends";
import TrendGraph from "../Pages/User/TrendGraph";
import Forbidden from "../Pages/Shared/Forbidden";
import AdminRoute from "./AdminRoute";
import VendorRoute from "./VendorRoute";
import DashboardLayout from "../Layouts/DashboardLayout";
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
      {
        path: "forbidden",
        Component: Forbidden,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "addProduct",
        element: (
          <VendorRoute>
            <AddProduct></AddProduct>
          </VendorRoute>
        ),
      },
      {
        path: "myProducts",
        element: (
          <VendorRoute>
            <MyProducts></MyProducts>
          </VendorRoute>
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
          <VendorRoute>
            <AddAdvertisement></AddAdvertisement>
          </VendorRoute>
        ),
      },
      {
        path: "myAdvertisements",
        element: (
          <VendorRoute>
            <MyAdvertisements></MyAdvertisements>
          </VendorRoute>
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
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "products",
        element: (
          <AdminRoute>
            <Products></Products>
          </AdminRoute>
        ),
      },
      {
        path: "ads",
        element: (
          <AdminRoute>
            <Ads></Ads>
          </AdminRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <AdminRoute>
            <Orders></Orders>
          </AdminRoute>
        ),
      },
      {
        path: "priceTrends",
        element: (
          <PrivateRoute>
            <PriceTrends></PriceTrends>
          </PrivateRoute>
        ),
        children: [
          {
            path: ":productId",
            element: (
              <PrivateRoute>
                <TrendGraph></TrendGraph>
              </PrivateRoute>
            ),
          },
        ],
      },
    ],
  },
]);
