import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Contexts/AuthContext";

const MyOrders = () => {
  document.title = "My Orders";
  const { user } = use(AuthContext);
  const [orders, setOrders] = useState([]);
  console.log(user.email);
  useEffect(() => {
    if (user && user.email) {
      axios
        .get(`http://localhost:3000/orders?email=${user.email}`)
        .then((res) => setOrders(res.data))
        .catch((err) => console.error("Failed to fetch orders:", err));
    }
  }, [user]);
  console.log(orders);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-green-700">My Orders</h2>
      <div className="overflow-x-auto rounded-xl shadow-lg bg-gradient-to-br from-green-50 via-white to-green-100 p-4">
        <table className="min-w-full text-sm md:text-base border border-green-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-green-200 text-green-900 uppercase tracking-wide">
              <th className="py-3 px-4 border border-green-300">
                Transaction ID
              </th>
              <th className="py-3 px-4 border border-green-300">
                Product Name
              </th>
              <th className="py-3 px-4 border border-green-300">
                Payment Status
              </th>
              <th className="py-3 px-4 border border-green-300">Amount ($)</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order.transactionId}
                  className="hover:bg-green-100 transition-all duration-200"
                >
                  <td className="py-2 px-4 border border-green-200 text-green-800 font-mono">
                    {order.transactionId}
                  </td>
                  <td className="py-2 px-4 border border-green-200 text-green-700 font-semibold">
                    {order.ProductName}
                  </td>
                  <td className="py-2 px-4 border border-green-200">
                    <span className="text-green-600 font-bold italic">
                      {order.payment_status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border border-green-200 text-green-900 font-semibold">
                    ${order.amount.toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="py-4 px-4 text-center border border-green-200 text-gray-500"
                  colSpan="4"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
