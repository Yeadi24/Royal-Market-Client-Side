import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AuthContext } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Shared/Loading";
import Swal from "sweetalert2";

const MyAdvertisements = () => {
  const navigate = useNavigate();
  const user = useContext(AuthContext);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.user?.email) {
      axios
        .get(`http://localhost:3000/ads?email=${user.user.email}`)
        .then((res) => {
          setAds(res.data);
          setLoading(false);
        })
        .catch((err) => {
          toast.error("Failed to fetch ads");
          setLoading(false);
        });
    }
  }, [user]);

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
        fetch(`http://localhost:3000/ads/${id}`, {
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
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="p-4 min-h-screen bg-green-50">
          <h2 className="text-3xl font-bold text-green-700 mb-4 text-center">
            My Advertisements
          </h2>

          <div className="overflow-x-auto">
            <table className="table w-full bg-white shadow-md rounded-lg">
              <thead className="bg-green-100 text-green-800">
                <tr>
                  <th className="p-3">Ad Title</th>
                  <th className="p-3">Short Description</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {ads.length > 0 ? (
                  ads.map((ad) => (
                    <tr
                      key={ad._id}
                      className="text-green-900 hover:bg-green-50"
                    >
                      <td className="p-3">{ad.adTitle}</td>
                      <td className="p-3">{ad.shortDescription}</td>
                      <td className="p-3 capitalize">{ad.status}</td>
                      <td className="p-3 flex gap-4 items-center">
                        <button
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() =>
                            navigate(`/vendorDashboard/updateAd/${ad._id}`)
                          }
                        >
                          <FaEdit size={18} />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleDelete(ad._id)}
                        >
                          <FaTrash size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center p-4 text-gray-500">
                      No advertisements found.
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

export default MyAdvertisements;
