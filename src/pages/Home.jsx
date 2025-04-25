import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';
import ProductItem from '../components/ProductItem';
import { getProducts } from '../lib/products';

const Home = () => {
  const [products, setProducts] = useState([])
  useEffect(()=> {
        const fetchData = async() => {
            try {
                const { products } = await  getProducts()
                setProducts(products.slice(0,3))
            } catch (error) {
                console.error("Failed", error)
            } 
            

        }
        fetchData()
    }, [])
  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Order Your Favourite Food here </h1>
            <p className="text-xl mb-8">Order your favorite meals anytime, anywhere.</p>
            <div className="flex space-x-4">
              <Link 
                className="bg-white text-orange-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
                to="/order"
                >
                Order Now
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Popular Items */}
      <div className='max-w-4xl mx-auto mt-24'>
        <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Popular Items</h2>
              <Link 
                to="/order"
                className="text-orange-500 font-semibold"
              >
              View All</Link>
            </div>
            
            <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {products.map((product)=> (
                <ProductItem key={product.id} product={product}/>
              ))}
          </div>
      </div>
    </div>
  );
}

export default Home