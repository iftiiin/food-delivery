import React, {  useEffect, useOptimistic, useState, useTransition } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router'
import { FaEdit, FaTrash } from 'react-icons/fa';
import { deleteCategory, getCategories } from '../../lib/categories';

const CategoryList = () => {

    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false)
    const [isPending, startTransition] = useTransition()
    const [optimisticCategories, updateOptimisticCategories] = useOptimistic(
      categories,
      (state, idToRemove) => state.filter(category => category.id !== idToRemove)
    );
        

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
    const confirmDelete = (category) => {
      setCategoryToDelete(category);
    };
    
    const handleDelete = async () => {
      if (!categoryToDelete) return;
    
      try {
        setIsDeleting(true);
        console.log('Starting deletion process for category:', categoryToDelete.id);
    
        startTransition(() => updateOptimisticCategories(categoryToDelete.id));
        await deleteCategory(categoryToDelete.id);
        setCategories(prevCategories =>
          prevCategories.filter(category => category.id !== categoryToDelete.id)
        );

        setCategoryToDelete(null);
      } catch (error) {
        console.error('Error deleting category in component:', error);
        toast.error(`Failed to delete category: ${error.message || 'Unknown error'}`);

        fetchCategoriesList();
      } finally {
        setIsDeleting(false);
      }
    };
   
    return (
      <div className="p-6 min-h-screen">
        <button 
          className="text-orange-500 bg-white border border-orange-200 p-3 mb-5 cursor-pointer o"
          onClick={()=>  navigate("/dashboard/categories/create")}
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
                categories.map((category) => (
                  <tr key={category.id} className="border-b border-slate-200 bg-white hover:bg-slate-50 transition">
                    <td className="px-4 py-3 text-slate-700">{category.name}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link
                          to={`/dashboard/categories/${category.id}`}
                          className="p-2 text-blue-600 hover:text-blue-800 rounded-full hover:bg-orange-50"
                          title="Edit Category"
                        >
                          <FaEdit />
                        </Link>
                        <button 
                          className="text-red-600 hover:text-red-800 ml-2" 
                          title="Delete Category"
                          onClick={() => confirmDelete(category)}
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
        {categoryToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded shadow-lg max-w-md w-full overflow-hidden">
              
              {/* Header */}
              <div className="flex justify-between items-start px-6 pt-5 pb-3 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  Bye-bye, record!
                </h3>
                <button
                  onClick={() => setCategoryToDelete(null)}
                  className="text-gray-500 hover:text-gray-800 text-xl"
                >
                  ×
                </button>
              </div>

              {/* Body */}
              <div className="px-6 py-4 text-sm text-gray-700">
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete "{categoryToDelete.name || 'Unknown'}"?
                  This action cannot be undone.
                </p>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t flex justify-end space-x-2">
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded hover:bg-red-800 transition"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
                <button
                  onClick={() => setCategoryToDelete(null)}
                  disabled={isDeleting}
                  className="bg-gray-100 text-gray-800 text-sm font-medium px-4 py-2 rounded hover:bg-gray-200 transition"
                >
                  No, keep it
                </button>
              </div>
              
            </div>
          </div>
        )}
      </div>
    )
}

export default CategoryList;