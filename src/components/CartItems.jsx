import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import useOrder from "../context/OrderContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { getCustomerById, getCustomerByUserId } from "../lib/customers";
import { createOrder } from "../lib/orders";

const Cartproducts = () => {
  const { products, updateQuantity, removeItemFromCart, clearCart } = useOrder();
  const [customer , setCustomer] = useState("")
  const { user } = useAuth()
  const navigate = useNavigate()

  const deliveryFee = 1;
  const subtotal = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const total = subtotal + deliveryFee;
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const data = await getCustomerByUserId(user.id);
        setCustomer(data);
      } catch (err) {
        console.error("Failed to fetch customer:", err);
      }
    };

    if (user) fetchCustomer();
  }, [user]);

  const handleCheckout = async () => {
    if (!customer) {
      toast.error("Customer not found.");
      return;
    }
    console.log(",,,,,,,,,,,,,,,", customer)
    const orderData = {
      customer_id: customer.id,
      date: new Date().toISOString(),
      status: "pending",
      total,
      delivery_fee: 1
    };

    const orderLines = products.map((product) => ({
      product_id: product.id,
      quantity: product.quantity,
      price: product.price,
      subtotal: product.price * product.quantity,
    }));

    try {
      await createOrder(orderData, orderLines);
      clearCart(); 
      toast.success("Thanks for your order!");
      navigate("/");
    } catch (err) {
      toast.error("Failed to create order. Try again.");
      console.error("Checkout error:", err);
    }
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-20 text-gray-600 text-xl min-h-screen">
        🛒 Your cart is empty.
      </div>
    );
  }
  

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto min-h-screen">
      {/* Cart Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[640px]">
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
            {products.map((product) => (
              <tr
                key={product.id}
                className="text-black border-b border-gray-200"
              >
                <td className="py-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>
                  <input
                    type="number"
                    className="w-16 border border-gray-200 rounded-md p-1 text-center"
                    value={product.quantity}
                    onChange={(e) => updateQuantity(product, e.target.value)}
                  />
                </td>
                <td>${(product.price * product.quantity).toFixed(2)}</td>
                <td className="text-red-500 cursor-pointer">
                  <FaTrash onClick={() => removeItemFromCart(product)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cart Totals */}
      <div className="mt-10 w-full md:w-1/2">
        <h2 className="text-xl font-semibold mb-4">Cart Totals</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <hr />
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>
          <hr />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <hr />
        </div>
        <button 
          className="mt-6 bg-orange-600 text-white px-6 py-3 rounded hover:bg-orange-700 transition cursor-pointer w-full sm:w-auto"
          onClick={handleCheckout}
          >
          PROCEED TO CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default Cartproducts;
