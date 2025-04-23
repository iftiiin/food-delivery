import React, { useEffect, useState, useTransition, useOptimistic } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router';
import toast from 'react-hot-toast';
import { deleteProduct, getProducts } from '../../lib/products';
import { getCategories, getCategoryById } from '../../lib/categories';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [productToDelete, setProductToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [optimisticProducts, updateOptimisticProducts] = useOptimistic(
    products,
    (state, idToRemove) => state.filter(product => product.id !== idToRemove)
  );
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    
    fetchProductsList();
  }, []);

  const fetchProductsList = async () => {
    try {
      setLoading(true);
      const { categories } = await getCategories();
      setCategories(categories);
      const { products } = await getProducts(); 
      setProducts(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load your products');
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (product) => {
    setProductToDelete(product);
  };

  const handleDelete = async () => {
    if (!productToDelete) return;

    try {
      setIsDeleting(true);
      startTransition(() => updateOptimisticProducts(productToDelete.id));
      await deleteProduct(productToDelete.id);
      setProducts(prev => prev.filter(p => p.id !== productToDelete.id));
      setProductToDelete(null);
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete product');
      fetchProductsList();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <button
        className="text-orange-500 bg-white border border-orange-200 p-3 mb-5 cursor-pointer"
        onClick={() => navigate('/dashboard/products/create')}
      >
        + New Product
      </button>

      <div className="overflow-x-auto">
        <table className="w-full overflow-hidden shadow-sm">
          <thead className="bg-gray-100 text-black sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {optimisticProducts.length > 0 ? (
              optimisticProducts.map(product => (
                <tr
                  key={product.id}
                  className="border-b border-slate-200 bg-white hover:bg-slate-50 transition"
                >
                  <td className="px-4 py-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-3 text-slate-700">{product.name}</td>
                  <td className="px-4 py-3 text-slate-700"> {categories.find(cat => cat.id === product.category_id)?.name || 'Unknown'}</td>
                  <td className="px-4 py-3 text-slate-700">${product.price}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link
                        to={`/dashboard/products/${product.id}`}
                        className="p-2 text-blue-600 hover:text-blue-800 rounded-full hover:bg-orange-50"
                        title="Edit Product"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        className="text-red-600 hover:text-red-800 ml-2"
                        title="Delete Product"
                        onClick={() => confirmDelete(product)}
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
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {productToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded shadow-lg max-w-md w-full overflow-hidden">
            <div className="flex justify-between items-start px-6 pt-5 pb-3 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Confirm Delete</h3>
              <button
                onClick={() => setProductToDelete(null)}
                className="text-gray-500 hover:text-gray-800 text-xl"
              >
                ×
              </button>
            </div>
            <div className="px-6 py-4 text-sm text-gray-700">
              Are you sure you want to delete "{productToDelete.name}"?
            </div>
            <div className="px-6 py-4 border-t flex justify-end space-x-2">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 text-sm"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
              <button
                onClick={() => setProductToDelete(null)}
                disabled={isDeleting}
                className="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
