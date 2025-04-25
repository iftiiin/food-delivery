import React from 'react'
import { Link } from 'react-router'

const ProductItem = ({product}) => {
    return (
        <Link
            to={`/product-details/${product.id}`}
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
                    <strong>${product.price.toFixed(2)}</strong>
                </span>
            </div>
        </Link>
   )
}

export default ProductItem