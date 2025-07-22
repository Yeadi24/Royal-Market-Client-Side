import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AuthContext } from "../../Contexts/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import Loading from "../Shared/Loading";

const MyProducts = () => {
  document.title = "My Products";

  const navigate = useNavigate();
  const user = use(AuthContext);
  const [products, setProducts] = useState([]);
  console.log(products);

  useEffect(() => {
    if (user?.user?.email) {
      axios
        .get(`http://localhost:3000/products?email=${user.user.email}`)
        .then((res) => setProducts(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/products/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setProducts(products.filter((product) => product._id !== id));
              Swal.fire("Deleted!", "Your book has been deleted.", "success");
            }
          });
      }
    });
  };

  return (
    <>
      {products.length === 0 ? (
        <p className="text-3xl text-red-700 font-bold text-center">
          No Product To Show
        </p>
      ) : (
        <div className="p-4 min-h-screen bg-green-50">
          <h2 className="text-3xl font-bold text-green-700 mb-4 text-center">
            My Products
          </h2>

          <div className="overflow-x-auto">
            <table className="table w-full bg-white shadow-md rounded-lg">
              <thead className="bg-green-100 text-green-800">
                <tr>
                  <th className="p-3">Item Name</th>
                  <th className="p-3">Price/Unit</th>
                  <th className="p-3">Market</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr
                      key={product._id}
                      className="text-green-900 hover:bg-green-50"
                    >
                      <td className="p-3">{product.itemName}</td>
                      <td className="p-3">{product.pricePerUnit}$</td>
                      <td className="p-3">{product.marketName}</td>
                      <td className="p-3">
                        {new Date(
                          product.createdAt || Date.now()
                        ).toLocaleDateString()}
                      </td>
                      <td className="p-3 capitalize">{product.status}</td>
                      <td className="p-3 flex gap-4 items-center">
                        <button
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() =>
                            navigate(`/dashboard/updateProduct/${product._id}`)
                          }
                        >
                          <FaEdit size={18} />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => {
                            handleDelete(product._id);
                          }}
                        >
                          <FaTrash size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center p-4 text-gray-500">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default MyProducts;
