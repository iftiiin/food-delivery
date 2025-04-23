import React, { useEffect, useState } from "react";
import {
  FaBox,
  FaDollarSign,
  FaUsers,
  FaCreditCard,
} from "react-icons/fa";
import { getCustomers } from "../../lib/customers";
import { getProducts } from "../../lib/products";
import { getOrders } from "../../lib/orders";

const Overview = () => {
  const [counts, setCounts] = useState({
    customers: null,
    products: null,
    orders: null,
    revenue: null,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const { count } = await getProducts();
        const products = count;

        const { count: customerCount } = await getCustomers();
        const customers = customerCount;

        const { count: orderCount, orders: orderss } = await getOrders();
        const orders = orderCount;

        const revenue = orderss.reduce((acc, order) => acc + (order.total || 0), 0);

        setCounts({
          customers,
          products,
          orders,
          revenue,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchCounts();
  }, []);

  const stats = [
    {
      title: "Total Customers",
      value: counts.customers !== null ? counts.customers.toLocaleString() : "0",
      icon: <FaUsers className="text-xl text-orange-500" />,
    },
    {
      title: "Total Products",
      value: counts.products !== null ? counts.products.toLocaleString() : "0",
      icon: <FaBox className="text-xl text-orange-500" />,
    },
    {
      title: "Total Orders",
      value: counts.orders !== null ? counts.orders.toLocaleString() : "0",
      icon: <FaCreditCard className="text-xl text-orange-500" />,
    },
    {
      title: "Total Revenue",
      value: counts.revenue !== null ? `$${counts.revenue.toLocaleString()}` : "$0",
      icon: <FaDollarSign className="text-xl text-orange-500" />,
    },
  ];

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 shadow border border-orange-100"
          >
            <div className="flex items-center space-x-2 text-sm text-gray-700 mb-4">
              <div className="bg-orange-100 rounded p-1">{item.icon}</div>
              <span className="font-medium">{item.title}</span>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;
