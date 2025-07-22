import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "react-modal";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root");

const AllUsers = () => {
  document.title = "All Users";
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch(() => {
        toast.error("Failed to fetch users");
      });
  }, []);

  const openRoleModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleRoleUpdate = (newRole) => {
    if (!selectedUser) return;

    axios
      .patch(`http://localhost:3000/users/${selectedUser._id}`, {
        role: newRole,
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          setUsers((prev) =>
            prev.map((u) =>
              u._id === selectedUser._id ? { ...u, role: newRole } : u
            )
          );
          toast.success("User role updated successfully");
        } else {
          toast.error("Failed to update role");
        }
      })
      .catch(() => toast.error("Server error"))
      .finally(() => {
        setIsModalOpen(false);
        setSelectedUser(null);
      });
  };

  const roleColor = (role) => {
    if (role === "admin") return "text-red-600 font-semibold";
    if (role === "vendor") return "text-purple-600 font-semibold";
    return "text-blue-600 font-semibold";
  };

  return (
    <div className="p-6 bg-green-50 min-h-screen">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
        All Registered Users
      </h2>

      {users.length === 0 ? (
        <p className="text-red-500 text-center font-semibold">
          No users found on this website.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full bg-white shadow-lg rounded-lg">
            <thead className="bg-green-100 text-green-800">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="text-green-900 hover:bg-green-50">
                  <td className="p-3">{user.name || "N/A"}</td>
                  <td className="p-3">{user.email}</td>
                  <td className={`p-3 capitalize ${roleColor(user.role)}`}>
                    {user.role || "user"}
                  </td>
                  <td className="p-3">
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      onClick={() => openRoleModal(user)}
                    >
                      Change Role
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Role Change */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="bg-white p-6 max-w-md mx-auto mt-32 rounded shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h3 className="text-xl font-semibold mb-4 text-center text-green-700">
          Change Role for {selectedUser?.name || selectedUser?.email}
        </h3>

        <div className="flex flex-col gap-3">
          {["user", "vendor", "admin"]
            .filter((role) => role !== selectedUser?.role)
            .map((role) => (
              <button
                key={role}
                onClick={() => handleRoleUpdate(role)}
                className={`w-full py-2 rounded text-white ${
                  role === "admin"
                    ? "bg-orange-600 hover:bg-orange-700"
                    : role === "vendor"
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                Set as {role}
              </button>
            ))}
        </div>
        <button
          onClick={() => setIsModalOpen(false)}
          className="mt-5 w-full text-center text-sm text-gray-500 hover:text-red-600"
        >
          Cancel
        </button>
      </Modal>
    </div>
  );
};

export default AllUsers;
