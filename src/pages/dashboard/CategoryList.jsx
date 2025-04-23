import React, {  useEffect, useOptimistic, useState, useTransition } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router'
import { FaEdit, FaTrash } from 'react-icons/fa';
import { getCategories } from '../../lib/categories';

const CategoryList = () => {

    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    
    

    useEffect(() => {

          fetchCategoriesList()

    }, [])

    const fetchCategoriesList = async () => {

        try {
            setLoading(true)
            const { categories, count } = await getCategories()

            setCategories(categories)

        } catch (error) {

            console.error('Error fetching categories:', error)
            toast.error('Failed to load your categories')

        } finally {
            setLoading(false)
        }

    }
   
    return (
      <div className="p-6 min-h-screen">
        <button 
          className="text-orange-500 bg-white border border-orange-200 p-3 mb-5 cursor-pointer o"
          
          >
          + New Category
        </button>

        <div className="overflow-x-auto">
          <table className="w-full  overflow-hidden shadow-sm">
            <thead className="bg-gray-100 text-black sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((Category) => (
                  <tr key={Category.id} className="border-b border-slate-200 bg-white hover:bg-slate-50 transition">
                    <td className="px-4 py-3 text-slate-700">{Category.name}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link
                          className="p-2 text-blue-600 hover:text-blue-800 rounded-full hover:bg-orange-50"
                          title="Edit Category"
                        >
                          <FaEdit />
                        </Link>
                        <button 
                          className="text-red-600 hover:text-red-800 ml-2" 
                          title="Delete Category"
                        > 
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-slate-500 py-4">
                      No categories found.
                    </td>
                  </tr>
              )}

            </tbody>
          </table>
        </div>
      </div>
    )
}

export default CategoryList;