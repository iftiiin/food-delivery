import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { getProductById, createProduct, updateProduct } from "../../lib/products";
import { getCategories } from "../../lib/categories";
import supabase from "../../lib/supabase";
import { FiCamera } from 'react-icons/fi';
const ProductForm = () => {
    
    const [formData, setFormData] = useState({ name: "", category: "", price: "" });
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);

    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);

    useEffect(() => {
        const fetchCategories = async () => {
        const { categories } = await getCategories();
        setCategories(categories);
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (!isEditMode) return;
        const fetchProduct = async () => {
        try {
            const product = await getProductById(id);
            setFormData({
            name: product.name,
            category: product.category_id,
            price: product.price,
            });
            setAvatarUrl(product.image);
        } catch {
            toast.error("Failed to fetch product");
        }
        };
        fetchProduct();
    }, [id, isEditMode]);

    const handleChange = (e) => {
        setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
        }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
        toast.error("File size too large (max 2MB)");
        return;
        }

        setAvatar(file);
        setAvatarUrl(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            let payload = { ...formData };

            if (avatar) {
                const ext = avatar.name.split(".").pop();
                const filename = `product-${Date.now()}-${Math.random().toString(36).substr(2)}.${ext}`;
                const path = `products/${filename}`;

                const { error: uploadError } = await supabase.storage.from("products").upload(path, avatar);
                if (uploadError) throw uploadError;

                const { data } = supabase.storage.from("products").getPublicUrl(path);
                if (!data?.publicUrl) throw new Error("Failed to retrieve public URL");

                payload.image = data.publicUrl;
            }

            if (isEditMode) {
                await updateProduct(id, payload);
                toast.success("Product updated successfully");
            } else {
                await createProduct(payload);
                toast.success("Product created successfully");
            }

            navigate("/dashboard/products");
        } catch (error) {
            toast.error("Failed to save product");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-6">
            <div className="bg-white border border-gray-300 w-full p-10">
                <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto space-y-6">
                    {/* Image Upload */}
                    <div className="relative group flex flex-col items-start">
                        <label className="block text-sm font-medium text-gray-600 mb-2">Image</label>
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                        <img
                            src={
                            avatarUrl ||
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAhPstiZOKC6d6LfaJZuVQs8pEHERFZKFMAQ&s"
                            }
                            alt="Product"
                            className="w-full h-full object-cover"
                        />
                        </div>
                        <label
                            htmlFor="avatar-upload"
                            className="absolute bottom-0 left-24 bg-white rounded-full p-2 shadow-md cursor-pointer transform transition-transform duration-200 hover:scale-110"
                            title="Upload image"
                            >
                            <FiCamera className="w-5 h-5 text-black" />
                        </label>
                        <input type="file" id="avatar-upload" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                        <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
                        <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        >
                        <option value="">Select category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                            {cat.name}
                            </option>
                        ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Price</label>
                        <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>
                    <div className="flex justify-center pt-4">
                        <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 shadow-sm transition duration-200"
                        >
                        {isLoading ? (isEditMode ? "Updating..." : "Creating...") : isEditMode ? "Update" : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
