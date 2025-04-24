import React from "react";
import { FaTrash } from "react-icons/fa";

const CartItems = () => {
    const cartItems = [
        {
        id: 1,
        title: "Greek salad",
        price: 12,
        quantity: 2,
        image:
            "https://plus.unsplash.com/premium_photo-1669075651831-b7ed6763a9c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dXNlciUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D",
        },
        {
        id: 2,
        title: "Peri Peri Rolls",
        price: 12,
        quantity: 3,
        image: "https://via.placeholder.com/80",
        },
    ];

  
    return (
        <div className="p-6 max-w-5xl mx-auto mb-32">
            {/* Cart Table */}
            <table className="w-full text-left">
                <thead>
                    <tr className="text-gray-500 text-sm border-b">
                        <th className="pb-2">Product Image</th>
                        <th className="pb-2">Title</th>
                        <th className="pb-2">Price</th>
                        <th className="pb-2">Quantity</th>
                        <th className="pb-2">Total</th>
                        <th className="pb-2">Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                        <tr key={item.id} className="text-black border-b border-gray-200">
                            <td className="py-2">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-12 h-12 object-cover rounded"
                                />
                            </td>
                            <td>{item.title}</td>
                            <td>${item.price}</td>
                            <td>
                            <input 
                                type="number" 
                                className='w-16 border border-gray-200 rounded-md p-1 text-center'
                                value={item.quantity}
                                    
                                />
                            </td>
                            <td>${item.price * item.quantity}</td>
                            <td className="text-red-500 cursor-pointer">
                                <FaTrash />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Cart Totals */}
            <div className="mt-10 w-full md:w-1/2">
                <h2 className="text-xl font-semibold mb-4">Cart Totals</h2>
                <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>$65</span>
                </div>
                <hr />
                <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>$2</span>
                </div>
                <hr />
                <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>$67</span>
                </div>
                <hr />
                </div>
                <button className="mt-6 bg-orange-600 text-white px-6 py-3 rounded hover:bg-orange-700 transition">
                    PROCEED TO CHECKOUT
                </button>
            </div>
        </div>
  );
};

export default CartItems;
