import React from 'react'
import { Link } from 'react-router'

const Header = () => {
  return (
      <header className='bg-white shadow'>
          <div className='max-w-7xl mx-auto px-4 md:px-6 lg:px-8'>
              <div className='flex justify-between h-16'>
                {/* Logo */}
                <div className='flex-shrink-0 flex items-center'>
                    <Link className='text-2xl font-bold text-orange-600' to="/">Food</Link>
                </div>
                <div className='flex'> 
                    {/* nav */}
                    <nav className='hidden sm:ml-6 sm:flex sm:space-x-8'>
                      <Link to="/" className='flex items-center px-1 pt-1  text-sm font-medium text-gray-500 hover:text-orange-600'>Home</Link>
                      <Link to="/order" className='inline-flex justify-center items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-orange-600'>Order</Link>
                      <Link to="/about" className='inline-flex justify-center items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-orange-600'>About</Link>
                      <Link to="/contact" className='inline-flex justify-center items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-orange-600'>Contact</Link>
                      <Link to="/dashboard" className='inline-flex justify-center items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-orange-600'>Dashboard</Link>
                        
                    </nav>
                </div>
                
                <div className='flex items-center space-x-4'>
                  <div>
                    <Link to="/signin" className='inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 '>SignIn</Link>
                    
                  </div>
                </div>
              </div>
          </div>
      </header>
  )
}

export default Header