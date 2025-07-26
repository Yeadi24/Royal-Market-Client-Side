import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const Products = () => {
  document.title = "All Products";
  const [products, setProducts] = useState([]);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setProducts(res.data))
      .catch(() => toast.error("Failed to fetch products"));
  };

  const handleStatusChange = (id, newStatus) => {
    axios
      .patch(`http://localhost:3000/products/${id}`, { status: newStatus })
      .then(() => {
        toast.success(`Product ${newStatus}`);
        fetchProducts();
      })
      .catch(() => toast.error("Status update failed"));
  };

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
    <div className="p-6 bg-green-50 min-h-screen">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
        All Products
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-red-600 font-medium">
          No products found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white shadow rounded-lg">
            <thead className="bg-green-100 text-green-800">
              <tr>
                <th className="p-3 text-left">Item</th>
                <th className="p-3 text-left">Vendor</th>
                <th className="p-3 text-left">Price Per Unit</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border-t hover:bg-green-50 text-green-900"
                >
                  <td className="p-3">{product.itemName}</td>
                  <td className="p-3">{product.vendorName}</td>
                  <td className="p-3">${product.pricePerUnit}</td>
                  <td className="p-3 capitalize">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        product.status === "pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : product.status === "approved"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="p-3 space-x-2">
                    {product.status === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            handleStatusChange(product._id, "approved")
                          }
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(product._id, "rejected")
                          }
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button
                      onClick={() =>
                        navigate(`/dashboard/updateProduct/${product._id}`)
                      }
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteProductId !== null}
        onRequestClose={() => setDeleteProductId(null)}
        ariaHideApp={false}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-40"
        overlayClassName="bg-transparent"
      >
        <h3 className="text-xl font-semibold text-green-800 mb-4">
          Confirm Deletion
        </h3>
        <p className="mb-6 text-gray-700">
          Are you sure you want to delete this product? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setDeleteProductId(null)}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Products;
