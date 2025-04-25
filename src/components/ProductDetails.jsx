import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getProductById } from '../lib/products';
import ProductDetailSkeleton from './ProductDetailSkeleton';
import useOrder from '../context/OrderContext';

const ProductDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const { AddItemToCart } = useOrder()
    useEffect(() => {
        const fetchData = async () => {
        try {
            setLoading(true);
            const data = await getProductById(id);
            setProduct(data);
        } catch (error) {
            console.error("Failed to fetch product:", error);
        } finally {
            setLoading(false);
        }
        };

        fetchData();
    }, [id]);


    if(!product) return <ProductDetailSkeleton />

    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="mb-4 bg-orange-600 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-700 transition-colors duration-200"
            >
                Go Back
            </button>

            {/* Product Info */}
            <div className="md:flex">
                <div className="md:w-1/2 pr-4 mb-6 md:mb-0">
                    <img
                        className="w-full h-96 shadow-lg object-cover"
                        src={product.image}
                        alt={product.name}
                    />
                </div>

                <div className="md:w-1/2 pl-4">
                    <h1 className="text-3xl font-bold mb-4 text-black">{product.name}</h1>
                    <p className="text-gray-600 mb-4">{product.description}</p>

                    <div className="mb-4">
                        <span className="text-orange-700 font-semibold text-2xl">
                        ${product.price.toFixed(2)}
                        </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button
                            className="bg-orange-600 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-700 transition-colors duration-200 cursor-pointer"
                            onClick={() => AddItemToCart(product)}
                            >
                            Add To Cart
                        </button>
                        <button
                            onClick={() => navigate('/cart')}
                            className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-900 transition-colors duration-200"
                            >
                            Go to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
