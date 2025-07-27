import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const Ads = () => {
  document.title = "All Ads";
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  document.title = "All Ads";
  // Fetch ads from backend
  const fetchAds = () => {
    setLoading(true);

    axios
      .get("https://local-market-server-eight.vercel.app/ads")
      .then((res) => {
        setAds(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to fetch advertisements");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAds();
  }, []);

  // Handle status change
  const handleStatusChange = (id, newStatus) => {
    axios
      .patch(`https://local-market-server-eight.vercel.app/ads/${id}`, {
        status: newStatus,
      })
      .then(() => {
        toast.success(`Advertisement ${newStatus}`);
        fetchAds();
      })
      .catch(() => toast.error("Failed to update status"));
  };

  // Handle delete with confirmation
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This advertisement will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://local-market-server-eight.vercel.app/ads/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setAds((prevAds) => prevAds.filter((ad) => ad._id !== id));
              Swal.fire(
                "Deleted!",
                "The advertisement has been removed.",
                "success"
              );
            } else {
              Swal.fire(
                "Error!",
                "Failed to delete the advertisement.",
                "error"
              );
            }
          })
          .catch(() => {
            Swal.fire("Error!", "Something went wrong. Try again.", "error");
          });
      }
    });
  };

  return (
    <div className="p-6 min-h-screen bg-green-50">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
        All Advertisements
      </h2>

      {loading ? (
        <p className="text-green-600 text-center font-semibold">
          Loading advertisements...
        </p>
      ) : ads.length === 0 ? (
        <p className="text-red-500 text-center font-semibold">
          No advertisements found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full bg-white shadow-lg rounded-lg">
            <thead className="bg-green-100 text-green-800">
              <tr>
                <th className="p-3 text-left">Vendor Name</th>
                <th className="p-3 text-left">Ad Title</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ads.map((ad) => (
                <tr key={ad._id} className="text-green-900 hover:bg-green-50">
                  <td className="p-3">{ad.vendorName || "N/A"}</td>
                  <td className="p-3">{ad.adTitle}</td>
                  <td
                    className="p-3 capitalize"
                    style={{
                      color:
                        ad.status === "approved"
                          ? "#16a34a" // green-600
                          : ad.status === "rejected"
                          ? "#dc2626" // red-600
                          : ad.status === "pending"
                          ? "#ca8a04" // amber-600
                          : "inherit",
                    }}
                  >
                    {ad.status}
                  </td>
                  <td className="p-3 flex justify-center gap-2">
                    {ad.status !== "approved" && ad.status !== "rejected" && (
                      <>
                        <button
                          onClick={() => handleStatusChange(ad._id, "approved")}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                          disabled={ad.status === "approved"}
                          title="Approve"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusChange(ad._id, "rejected")}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                          disabled={ad.status === "rejected"}
                          title="Reject"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDelete(ad._id)}
                      className="bg-gray-600 hover:bg-gray-800 text-white px-3 py-1 rounded"
                      title="Delete"
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
    </div>
  );
};

export default Ads;
