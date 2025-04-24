import React, { useState } from 'react';
import { Link } from 'react-router';

const ProductList = () => {
    const [selectCategory, setSelectCategory] = useState("All");

    const categories = [
        "All", "Categ1", "Categ2", "Categ3",
        "Categ4", "Categ5", "Categ6", "Categ7", "Categ8"
    ];

    const products = [
        { id: 1, name: "Product 1", description: "Description 1", price: 10.0, image: "https://fakeimg.pl/250x250/?text=Product+1", category: "Categ1" },
        { id: 2, name: "Product 2", description: "Description 2", price: 20.0, image: "https://fakeimg.pl/250x250/?text=Product+2", category: "Categ2" },
        { id: 3, name: "Product 3", description: "Description 3", price: 30.0, image: "https://fakeimg.pl/250x250/?text=Product+3", category: "Categ3" },
        { id: 4, name: "Product 4", description: "Description 4", price: 40.0, image: "https://fakeimg.pl/250x250/?text=Product+4", category: "Categ1" },
        { id: 5, name: "Product 5", description: "Description 5", price: 50.0, image: "https://fakeimg.pl/250x250/?text=Product+5", category: "Categ2" },
    ];

    const filteredProducts = selectCategory === "All"
        ? products
        : products.filter(product => product.category === selectCategory);

    return (
        <>
            {/* Category Buttons */}
            <div className="overflow-x-auto whitespace-nowrap px-4 py-3 flex gap-3">
                {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setSelectCategory(cat)}
                    className={`px-6 py-2 rounded-full text-sm transition 
                    ${selectCategory === cat ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                >
                    {cat}
                </button>
                ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {filteredProducts.map((product) => (
                <Link
                    key={product.id}
                    className="overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200 ease-in rounded-t-lg"
                >
                    <img
                    className="w-full h-48 object-cover"
                    src={product.image}
                    alt={product.name}
                    />
                    <div className="p-4">
                    <h2 className="font-bold text-xl">{product.name}</h2>
                    <p className="text-gray-600 mb-4 truncate">{product.description}</p>
                    <span className="text-orange-600 font-semibold">
                        ${product.price.toFixed(2)}
                    </span>
                    </div>
                </Link>
                ))}
            </div>
        </>
    );
};

export default ProductList;
