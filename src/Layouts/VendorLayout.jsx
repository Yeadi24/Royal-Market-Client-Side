// src/pages/vendor/VendorLayout.jsx
import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";
import {
  Menu,
  PlusSquare,
  FileText,
  Megaphone,
  BarChart2,
  X,
} from "lucide-react";

const VendorLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileSidebar = () => setMobileOpen(!mobileOpen);

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-green-50 via-yellow-50 to-green-100">
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-green-600 text-white flex items-center justify-between px-4 py-3 shadow z-30">
        <div className="text-xl font-bold flex items-center gap-2">
          <Menu /> Vendor Panel
        </div>
        <button onClick={toggleMobileSidebar}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`w-64 bg-green-600 text-white p-5 flex-col gap-4 fixed h-full z-20 shadow-lg transform transition-transform duration-300 md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:flex top-0`}
      >
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
          <Menu /> Vendor Panel
        </h2>
        <nav className="flex flex-col space-y-2">
          <NavLink
            to="addProduct"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded hover:bg-green-700 transition ${
                isActive ? "bg-yellow-400 text-black font-semibold" : ""
              }`
            }
            onClick={() => setMobileOpen(false)}
          >
            <PlusSquare size={18} /> Add Product
          </NavLink>

          <NavLink
            to="my-products"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded hover:bg-green-700 transition ${
                isActive ? "bg-yellow-400 text-black font-semibold" : ""
              }`
            }
            onClick={() => setMobileOpen(false)}
          >
            <FileText size={18} /> My Products
          </NavLink>

          <NavLink
            to="add-advertisement"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded hover:bg-green-700 transition ${
                isActive ? "bg-yellow-400 text-black font-semibold" : ""
              }`
            }
            onClick={() => setMobileOpen(false)}
          >
            <Megaphone size={18} /> Add Advertisement
          </NavLink>

          <NavLink
            to="my-advertisements"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded hover:bg-green-700 transition ${
                isActive ? "bg-yellow-400 text-black font-semibold" : ""
              }`
            }
            onClick={() => setMobileOpen(false)}
          >
            <BarChart2 size={18} /> My Advertisements
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 md:ml-64 p-6 pt-16 md:pt-6 w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default VendorLayout;
