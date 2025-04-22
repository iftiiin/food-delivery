import React, { useEffect, useState } from 'react'
import { getCustomers } from '../../lib/customers'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
import { FaEdit, FaTrash } from 'react-icons/fa';

const CustomerList = () => {

    const [customers, setCustomers] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    

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
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b border-slate-200 bg-white hover:bg-slate-50 transition">
                  <td className="px-4 py-3 text-slate-700">{customer.name}</td>
                  <td className="px-4 py-3 text-slate-700">{customer.email}</td>
                  <td className="px-4 py-3 text-slate-700">{customer.phone}</td>
                  <td className="px-4 py-3 text-slate-700">{customer.address}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800"> <FaEdit size={18} /></button>
                      <button className="text-red-600 hover:text-red-800 ml-2"> <FaTrash size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
}

export default CustomerList;