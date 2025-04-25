import React from 'react'
import { Link } from 'react-router';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 ">
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

    </div>
  );
}

export default Home