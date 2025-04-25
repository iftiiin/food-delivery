import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getProducts } from '../lib/products';
import { getCategories } from '../lib/categories';
import ProductSkeleton from './productSkeleton';
import ProductItem from './ProductItem';

const ProductList = () => {
    const [selectCategory, setSelectCategory] = useState("All");
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(()=> {
        const fetchData = async() => {
            try {
                setLoading(true)
                const { categories } = await getCategories()
                setCategories([{ id: "All", name: "All" }, ...categories])
                console.log(";;;;;;;;;;;;;;;;;;;;", categories)
                const {products } = await  getProducts()
                setProducts(products)
            } catch (error) {
                setLoading(false)
                console.error("Failed", error)
            } finally {
                setLoading(false);
            }
            

        }
        fetchData()
    }, [])
    
    const filteredProducts = selectCategory === "All"
        ? products
        : products.filter(product => product.category_id === selectCategory);

    if (loading) return <ProductSkeleton />
    return (
        <>
            {/* Category Buttons */}
            <div className="overflow-x-auto whitespace-nowrap px-4 py-3 flex gap-3">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectCategory(cat.id)}
                        className={`px-6 py-2 rounded-full text-sm transition 
                        ${selectCategory === cat.id ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 p-4 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {filteredProducts.map((product) => (
                    <ProductItem key={product.id} product={product}/>
                ))}
            </div>
        </>
    );
};

export default ProductList;
