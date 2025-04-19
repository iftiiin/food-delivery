import React from 'react'
import { Link } from 'react-router'

const Footer = () => {
  return (
    <footer className=" text-gray-800 py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    
        <div>
          <h2 className="text-xl font-bold mb-2 flex items-center gap-1">
            Let’s Food <span>🍜</span>
          </h2>
          <p className="text-sm"> &copy; {new Date().getFullYear()} Food Delivery.
          </p>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
            <span className="w-3 h-3 bg-orange-400 rounded-full inline-block"></span>
            Company
          </h3>
          <ul className="text-sm space-y-1">
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>


        {/* Contact */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Get In Touch</h3>
          <p className="text-sm mb-1">+252 61 7663423</p>
          <p className="text-sm">food@example.com</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer