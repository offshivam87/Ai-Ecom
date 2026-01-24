import { useEffect, useState } from "react";
import Admin from "../Admin";
import axios from "axios";



const AdminOrders = () => {
  const [order, Setorder] = useState([])
  const [loading, Setloading] = useState(false)

  const updateStatus = async (id, status) => {
    Setloading(true)
    const res = await axios.post(`http://localhost:3000/api/updateorder/${id}`, {
      status
    }, {
      withCredentials: true
    })
    Setloading(false)
  }


  useEffect(() => {
    try {
      const fetchAllOrders = async () => {
        const AllOrders = await axios.get('http://localhost:3000/api/product/adminOrders',
          { withCredentials: true }
        )
        console.log(AllOrders.data.AllPendingOrders);
        Setorder(AllOrders.data.AllPendingOrders)
      }
      fetchAllOrders()
    } catch (error) {

    }

  }, []);
  return (
    <Admin>
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">User</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {order.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="p-3 text-xs">
                  {order._id.slice(-6)}
                </td>

                <td className="p-3">
                  {order.Address?.name || "User"}
                </td>

                <td className="p-3 font-medium">
                  ₹{order.totalAmount}
                </td>

                <td className="p-3">
                  <select
                    defaultValue={order.status}
                    className="border rounded px-2 py-1"
                    disabled={loading===true}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </Admin>
  );
};

export default AdminOrders;
