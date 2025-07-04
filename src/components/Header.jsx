import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { FaUser } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi";
import { IoMdMenu } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import { useAuth } from '../context/AuthContext';
import useOrder from '../context/OrderContext';
const Header = () => {
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const {isLoggedIn, profile, logout} = useAuth()
  const avatar_url = profile?.profile.avatar_url 
  const { products } = useOrder()
  return (
      <header className='fixed top-0 left-0 right-0 bg-white shadow z-50 h-16'>
          <div className='max-w-7xl mx-auto px-4 md:px-6 lg:px-8'>
              <div className='flex justify-between h-16'>
                <div></div>
                {/* Logo */}
                <div className='flex-shrink-0 flex items-center '>
                    <Link className='text-2xl font-bold text-orange-600' to="/">Food</Link>
                </div>
                <div className='flex'> 
                    {/* nav */}
                    <nav className='hidden sm:ml-6 sm:flex sm:space-x-8'>
                      <Link to="/" className='flex items-center px-1 pt-1  text-sm font-medium text-gray-500 hover:text-orange-600'>Home</Link>
                      <Link to="/order" className='inline-flex justify-center items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-orange-600'>Order</Link>
                      <Link to="/contact" className='inline-flex justify-center items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-orange-600'>Contact</Link>
                      {
                        isLoggedIn && profile?.profile.is_admin &&(
                        <Link to="/dashboard" className='inline-flex justify-center items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-orange-600'>Dashboard</Link>
                        )
                      }  
                    </nav>
                </div>
                {/* Profile and cart  */}
                <div className='flex items-center space-x-4'>
                <Link to="/cart" className="relative">
                      <div className="relative">
                        <HiShoppingCart className="text-2xl hover:text-orange-600" />
                        <span className="absolute -top-2 -right-2 bg-orange-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                          {products.length}
                        </span>
                      </div>
                </Link>
                {isLoggedIn? (
                    <>
                    

                    <div className='relative' >
                      <button className='flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 focus:outline-none cursor-pointer'
                        onMouseEnter={()=> setIsDropdownOpen(true)}
                        onClick={()=> setIsDropdownOpen(!isDropdownOpen)}
                        >
                          {
                            avatar_url ? 
                              <img className='w-8 h-8 rounded-full' src={avatar_url} />:
                              <FaUser />
                            
                          }
                        </button>
                        {/* dropdown menu */}
                        {
                          isDropdownOpen && (
                            <div className='absolute right-0 w-48 mt-3 rounded-md shadow-lg z-10'
                            onMouseLeave={()=> setIsDropdownOpen(false)}
                            >
                            
                              <Link to="/profile" className='block px-4 py-2 text-md text-gray-700 hover:bg-orange-100 transition'>Your Profile</Link>
                              <button  onClick={logout} className='w-full px-4 py-2 text-left text-gray-700 hover:bg-orange-100 transition cursor-pointer'>Sign Out</button>
                            </div>
                          )
                        }
                    </div>
                    </>
                  ):
                  ( /* Signin Button */
                    <div>
                      <Link to="/signin" className='inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 '>SignIn</Link>
                      
                    </div>
                  )
                }
                </div>
                    {/* humberger */}
                    <div className='mr-2 flex items-center sm:hidden'>
                      <button onClick={()=> setIsMenuOpen(!isMenuOpen)} className='inline-flex items-center justify-center p-2 rounded-md text-gray-400'>
                      {isMenuOpen ? <IoIosClose /> : <IoMdMenu />}
                      </button>

                    </div>
                    
               
              </div>
          </div>
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1 bg-white hover:bg-orange-50">
              <Link to="/" className="block pl-3 pr-4 py-2  text-base font-medium text-gray-600 hover:text-orange-700 hover:bg-orange-50">
                Home
              </Link>
              <Link to="/order" className="block pl-3 pr-4 py-2  border-transparent text-base font-medium text-gray-600 hover:text-orange-700 hover:bg-orange-50 ">
                Order
              </Link>
              <Link to="/contact" className="block pl-3 pr-4 py-2  border-transparent text-base font-medium text-gray-600 hover:text-orange-700 hover:bg-orange-50 ">
                Contact
              </Link>
              {isLoggedIn && (
                <>
                  <Link to="/dashboard" className="block pl-3 pr-4 py-2  border-transparent text-base font-medium text-gray-600 hover:text-orange-700 hover:bg-orange-50 ">
                    Dashboard
                  </Link>
                  <Link to="/profile" className='block pl-3 pr-4 py-2  border-transparent text-base font-medium text-gray-600 hover:text-orange-700 hover:bg-orange-50'>Your Profile</Link>
                  <button  onClick={logout} className='block-inline pl-3 pr-4 py-2  border-transparent text-base font-medium text-gray-600 hover:text-orange-700 hover:bg-orange-50 cursor-pointer'>Sign Out</button>
                </>
              )}
              {!isLoggedIn && (
                <>
                  <Link to="/signin" className="block pl-3 pr-4 py-2 border-transparent text-base font-medium text-gray-600 hover:text-orange-700 hover:bg-orange-50">
                    SignIn
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>
  )
}

export default Header