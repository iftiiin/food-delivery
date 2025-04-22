import React, {  useEffect, useOptimistic, useState, useTransition } from 'react'
import { deleteCustomer, getCustomers } from '../../lib/customers'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router'
import { FaEdit, FaTrash } from 'react-icons/fa';

const CustomerList = () => {

    const [customers, setCustomers] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const [customerToDelete, setCustomerToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false)
    const [isPending, startTransition] = useTransition()
    // useOptimistic for local update
    const [optimisticCustomers, updateOptimisticCustomers] = useOptimistic(
      customers,
      (state, idToRemove) => state.filter(customer => customer.id !== idToRemove)
    );
    

    useEffect(() => {

          fetchCustomersList()

    }, [])

    const fetchCustomersList = async () => {

        try {
            setLoading(true)
            const { customers, count } = await getCustomers()

            setCustomers(customers)

        } catch (error) {

            console.error('Error fetching customers:', error)
            toast.error('Failed to load your customers')

        } finally {
            setLoading(false)
        }

    }
   
    const confirmDelete = (customer) => {
      setCustomerToDelete(customer);
    };
    
    const handleDelete = async () => {
      if (!customerToDelete) return;
    
      try {
        setIsDeleting(true);
        console.log('Starting deletion process for customer:', customerToDelete.id);
    
        startTransition(() => updateOptimisticCustomers(customerToDelete.id));
        await deleteCustomer(customerToDelete.id);
    
        // Update local state after successful deletion
        setCustomers(prevCustomers =>
          prevCustomers.filter(customer => customer.id !== customerToDelete.id)
        );
    
        // Close the modal
        setCustomerToDelete(null);
      } catch (error) {
        console.error('Error deleting customer in component:', error);
        toast.error(`Failed to delete customer: ${error.message || 'Unknown error'}`);

        fetchCustomersList();
      } finally {
        setIsDeleting(false);
      }
    };
    
      
    return (
      <div className="p-6 min-h-screen">
        <button 
          className="text-orange-500 bg-white border border-orange-200 p-3 mb-5 cursor-pointer o"
          onClick={()=>  navigate("/dashboard/customers/create")}
          >
          + New Customer
        </button>

        <div className="overflow-x-auto">
          <table className="w-full  overflow-hidden shadow-sm">
            <thead className="bg-gray-100 text-black sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Address</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {optimisticCustomers.length > 0 ? (
                optimisticCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b border-slate-200 bg-white hover:bg-slate-50 transition">
                    <td className="px-4 py-3 text-slate-700">{customer.name}</td>
                    <td className="px-4 py-3 text-slate-700">{customer.email}</td>
                    <td className="px-4 py-3 text-slate-700">{customer.phone}</td>
                    <td className="px-4 py-3 text-slate-700">{customer.address}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link
                          to={`/dashboard/customers/${customer.id}`}
                          className="p-2 text-blue-600 hover:text-blue-800 rounded-full hover:bg-orange-50"
                          title="Edit Customer"
                        >
                          <FaEdit />
                        </Link>
                        <button 
                          className="text-red-600 hover:text-red-800 ml-2" 
                          onClick={() => confirmDelete(customer)}
                          title="Delete Customer"
                        > 
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-slate-500 py-4">
                      No customers found.
                    </td>
                  </tr>
              )}

            </tbody>
          </table>
        </div>

        {customerToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded shadow-lg max-w-md w-full overflow-hidden">
              
              {/* Header */}
              <div className="flex justify-between items-start px-6 pt-5 pb-3 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  Bye-bye, record!
                </h3>
                <button
                  onClick={() => setCustomerToDelete(null)}
                  className="text-gray-500 hover:text-gray-800 text-xl"
                >
                  ×
                </button>
              </div>

              {/* Body */}
              <div className="px-6 py-4 text-sm text-gray-700">
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete "{customerToDelete.name || 'Unknown customer'}"?
                  This action cannot be undone.
                </p>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t flex justify-end space-x-2">
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded hover:bg-red-800 transition"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
                <button
                  onClick={() => setCustomerToDelete(null)}
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
    )
}

export default CustomerList;