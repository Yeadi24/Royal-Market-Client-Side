import React, { use, useContext } from "react";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Contexts/AuthContext";
import Logo from "./Logo";

const Navbar = () => {
  const { user, signOutUser } = use(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        Swal.fire({
          title: "Successfully Logged Out!!!",
          icon: "success",
          draggable: true,
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  const linkStyle =
    "text-lg font-semibold px-4 py-2 rounded-md hover:bg-pink-200 transition duration-300 ease-in-out";

  const links = (
    <>
      <li>
        <NavLink to="/" className={linkStyle + " text-purple-700"}>
          Home
        </NavLink>
      </li>

      <li>
        <NavLink to="/bookshelf" className={linkStyle + " text-red-700"}>
          All
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink to="/myBooks" className={linkStyle + " text-indigo-700"}>
              My Books
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard" className={linkStyle + " text-red-700"}>
              Dashboard
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="bg-gradient-to-r from-cyan-100 via-purple-100 to-pink-100 text-black shadow-md sticky top-0 z-50">
      <div className="navbar px-4 py-2">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white mt-3 p-2 shadow rounded-box w-52 z-[1]"
            >
              {links}
            </ul>
          </div>
          <div className="flex items-center gap-2">
            <Link to={"/"}>
              <Logo></Logo>
            </Link>
          </div>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end gap-3">
          {user ? (
            <>
              {/* Only show on medium+ screens */}
              <div className="hidden md:flex items-center gap-2">
                <div
                  className="avatar tooltip tooltip-bottom"
                  data-tip={user.displayName || "No Name"}
                >
                  <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={
                        user.photoURL ||
                        "https://i.ibb.co.com/W4sVBFSb/download-5.jpg"
                      }
                      alt="profile"
                    />
                  </div>
                </div>
                <span className="text-blue-600 font-bold">
                  {user.displayName}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="btn btn-error text-white"
              >
                LogOut
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="btn btn-primary text-white">
                Register
              </Link>
              <Link to="/login" className="btn btn-success text-white">
                LogIn
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
