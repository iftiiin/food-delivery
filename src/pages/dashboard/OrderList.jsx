import React, { useEffect, useOptimistic, useState, useTransition } from 'react';
import { deleteOrder, getOrders } from '../../lib/orders';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { getCustomers } from '../../lib/customers';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [customers, setCustomers] = useState([])
  const [optimisticOrders, updateOptimisticOrders] = useOptimistic(
    orders,
    (state, idToRemove) => state.filter(order => order.id !== idToRemove)
  );

  useEffect(() => {
    fetchOrderList();
  }, []);

  const fetchOrderList = async () => {
    try {
      setLoading(true);
      const { customers } = await getCustomers()
      setCustomers(customers)
      const { orders, count } = await getOrders();
      setOrders(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load your orders');
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (order) => {
    setOrderToDelete(order);
  };

  const handleDelete = async () => {
    if (!orderToDelete) return;

    try {
      setIsDeleting(true);
      startTransition(() => updateOptimisticOrders(orderToDelete.id));
      await deleteOrder(orderToDelete.id);

      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderToDelete.id));
      setOrderToDelete(null);
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error(`Failed to delete order: ${error.message || 'Unknown error'}`);
      fetchOrderList();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <button
        className="text-orange-500 bg-white border border-orange-200 p-3 mb-5 cursor-pointer"
        onClick={() => navigate("/dashboard/orders/create")}
      >
        + New Order
      </button>

      <div className="overflow-x-auto">
        <table className="w-full overflow-hidden shadow-sm">
          <thead className="bg-gray-100 text-black sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {optimisticOrders.length > 0 ? (
              optimisticOrders.map((order) => (
                <tr key={order.id} className="border-b border-slate-200 bg-white hover:bg-slate-50 transition">
                  <td className="px-4 py-3 text-slate-700">{order.date}</td>
                  <td className="px-4 py-3 text-slate-700">{customers.find(cust => cust.id === order.customer_id)?.name || 'Unknown'}</td>
                  <td className="px-4 py-3 text-slate-700">${order.total}</td>
                  <td className="px-4 py-3 text-slate-700">{order.status}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link
                        to={`/dashboard/orders/${order.id}`}
                        className="p-2 text-blue-600 hover:text-blue-800 rounded-full hover:bg-orange-50"
                        title="Edit Order"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        className="text-red-600 hover:text-red-800 ml-2"
                        onClick={() => confirmDelete(order)}
                        title="Delete Order"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-slate-500 py-4">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {orderToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded shadow-lg max-w-md w-full overflow-hidden">
            <div className="flex justify-between items-start px-6 pt-5 pb-3 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                Confirm Deletion
              </h3>
              <button
                onClick={() => setOrderToDelete(null)}
                className="text-gray-500 hover:text-gray-800 text-xl"
              >
                ×
              </button>
            </div>
            <div className="px-6 py-4 text-sm text-gray-700">
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete Order #{orderToDelete.id}? This action cannot be undone.
              </p>
            </div>
            <div className="px-6 py-4 border-t flex justify-end space-x-2">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded hover:bg-red-800 transition"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
              <button
                onClick={() => setOrderToDelete(null)}
                disabled={isDeleting}
                className="bg-gray-100 text-gray-800 text-sm font-medium px-4 py-2 rounded hover:bg-gray-200 transition"
              >
                No, keep it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
