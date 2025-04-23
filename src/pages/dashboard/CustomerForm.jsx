
import React, { useEffect, useState } from "react";
import { createCustomer, getCustomerById, updateCustomer } from "../../lib/customers";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";



const CustomerForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const { id } = useParams();
    const isEditMode = Boolean(id)
    

    // Fetch customer data if editing
    useEffect(() => {
        if (isEditMode) {
        const fetchCustomer = async () => {
            try {
            const customer = await getCustomerById(id);
            console.log("........................cstomer data ,,,,,,,,,,", customer)
            setFormData(customer);
            console.log(formData)
            } catch {
            toast.error("Failed to fetch customer");
            }
        };
        fetchCustomer();
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        setFormData(prev => ({
          ...prev,
          [e.target.name]: e.target.value,
        }));
      };
    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if(isEditMode){
                await updateCustomer(id, formData)
                toast.success('Customer updated successfully');
            }
            else{
                await createCustomer(formData);
                toast.success('Customer created successfully')
            }
       
            navigate("/dashboard/customers")
        } catch (error) {
            toast.error('Failed to create customer');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-6">
            <div className="bg-white border border-gray-300 w-full p-10">
                <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                            <input
                                type="text"
                                required="1"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                            <input
                                type="text"
                                required="1"
                                value={formData.phone}
                                name="phone"
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center mt-8">
                        <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 shadow-sm transition duration-200"
                        >
                           {
                           isLoading
                            ? isEditMode ? 'Updating...' : 'Creating...'
                            : isEditMode ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CustomerForm;
