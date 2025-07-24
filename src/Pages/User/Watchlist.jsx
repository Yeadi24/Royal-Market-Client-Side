import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "../../Contexts/AuthContext";

const Watchlist = () => {
  const user = use(AuthContext);
  const [watchlist, setWatchlist] = useState([]);
  const navigate = useNavigate();
  console.log(user.user.email);

  useEffect(() => {
    if (user?.user?.email) {
      axios
        .get(`http://localhost:3000/users/${user?.user?.email}`)
        .then((res) => {
          setWatchlist(res.data.watchlist || []);
        })
        .catch(() => toast.error("Failed to load watchlist"));
    }
  }, [user]);

  const handleRemove = (productId) => {
    Swal.fire({
      title: "Remove this item?",
      text: "This item will be removed from your watchlist.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.patch(
            `http://localhost:3000/users/${user?.user?.email}/removeWatchlist`,
            { productId }
          );

          setWatchlist((prev) => prev.filter((item) => item._id !== productId));
          toast.success("Removed from watchlist");
        } catch (err) {
          toast.error("Failed to remove item");
        }
      }
    });
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">📋 My Watchlist</h2>

      {watchlist.length === 0 ? (
        <div className="text-center text-gray-500">
          Your watchlist is empty.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Market</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {watchlist.map((item) => (
                <tr key={item._id} className="border-t hover:bg-gray-50">
                  <td className="py-2 px-4">{item.itemName}</td>
                  <td className="py-2 px-4">{item.marketName}</td>
                  <td className="py-2 px-4">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 text-center space-x-2">
                    <button
                      onClick={() => navigate("/allProducts")}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      ➕ Add More
                    </button>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      ❌ Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Watchlist;
