import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { createCategory, getCategoryById, updateCategory } from "../../lib/categories";

const CategoryForm = () => {
    const [formData, setFormData] = useState({
        name: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);

    useEffect(() => {
        if (isEditMode) {
        const fetchCategory = async () => {
            try {
            const category = await getCategoryById(id);
            setFormData(category);
            } catch {
            toast.error("Failed to fetch category");
            }
        };
        fetchCategory();
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
        if (isEditMode) {
            await updateCategory(id, formData);
            toast.success("Category updated successfully");
        } else {
            await createCategory(formData);
            toast.success("Category created successfully");
        }
        navigate("/dashboard/categories");
        } catch (error) {
        toast.error("Failed to save category");
        } finally {
        setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-6">
            <div className="bg-white border border-gray-300 w-full p-10">
                <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                        <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
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

export default CategoryForm;
