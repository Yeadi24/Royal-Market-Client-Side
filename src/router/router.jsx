import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import RootLayout from "../Layouts/RootLayout";
import AuthLayout from "../Layouts/AuthLayout";
import LogIn from "../Pages/Shared/LogIn";
import Register from "../Pages/Shared/Register";
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
]);
