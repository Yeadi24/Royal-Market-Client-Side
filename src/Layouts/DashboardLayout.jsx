import { NavLink, Outlet } from "react-router";
import useGetRole from "../Hooks/useGetRole";
import { use } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { ToastContainer } from "react-toastify";

const DashboardLayout = () => {
  const user = use(AuthContext);
  const { role, loading, error } = useGetRole(user.user.email);
  document.title = "Dashboard";
  return (
    <div className="drawer lg:drawer-open min-h-screen">
      {/* Drawer Toggle for mobile */}
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col">
        {/* Top Navbar for mobile only */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 font-bold text-green-600 text-2xl flex-1 px-2">
            Dashboard
          </div>
        </div>

        {/* Page Content (always visible) */}
        <div className="p-4 w-full">
          <Outlet />
          <ToastContainer></ToastContainer>
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-3">
          <h1 className="text-3xl font-bold text-green-600 mb-4">Dashboard</h1>

          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-xl font-semibold bg-green-100 text-red-700 rounded"
                  : "text-xl font-semibold"
              }
            >
              Home
            </NavLink>
          </li>
          {!loading && role === "vendor" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/addProduct"
                  className={({ isActive }) =>
                    isActive
                      ? "text-xl font-semibold bg-green-100 text-red-700 rounded"
                      : "text-xl font-semibold"
                  }
                >
                  Add Product
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/myProducts"
                  className={({ isActive }) =>
                    isActive
                      ? "text-xl font-semibold bg-green-100 text-red-700 rounded"
                      : "text-xl font-semibold"
                  }
                >
                  My Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/addAdvertisement"
                  className={({ isActive }) =>
                    isActive
                      ? "text-xl font-semibold bg-green-100 text-red-700 rounded"
                      : "text-xl font-semibold"
                  }
                >
                  Add Advertisement
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/myAdvertisements"
                  className={({ isActive }) =>
                    isActive
                      ? "text-xl font-semibold bg-green-100 text-red-700 rounded"
                      : "text-xl font-semibold"
                  }
                >
                  My Advertisements
                </NavLink>
              </li>
            </>
          )}
          {role === "admin" && !loading && (
            <>
              <li>
                <NavLink
                  to="/dashboard/users"
                  className={({ isActive }) =>
                    isActive
                      ? "text-xl font-semibold bg-green-100 text-red-700 rounded"
                      : "text-xl font-semibold"
                  }
                >
                  All Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/products"
                  className={({ isActive }) =>
                    isActive
                      ? "text-xl font-semibold bg-green-100 text-red-700 rounded"
                      : "text-xl font-semibold"
                  }
                >
                  All Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/ads"
                  className={({ isActive }) =>
                    isActive
                      ? "text-xl font-semibold bg-green-100 text-red-700 rounded"
                      : "text-xl font-semibold"
                  }
                >
                  All Advertisements
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/orders"
                  className={({ isActive }) =>
                    isActive
                      ? "text-xl font-semibold bg-green-100 text-red-700 rounded"
                      : "text-xl font-semibold"
                  }
                >
                  All Orders
                </NavLink>
              </li>
            </>
          )}
          {!loading && role === "user" && (
            <li>
              <NavLink
                to="/dashboard/priceTrends"
                className={({ isActive }) =>
                  isActive
                    ? "text-xl font-semibold bg-green-100 text-red-700 rounded"
                    : "text-xl font-semibold"
                }
              >
                Price Trends
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
