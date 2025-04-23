import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { createOrder, getOrderById, updateOrder } from "../../lib/orders";
import { getCustomers } from "../../lib/customers";
import { getProducts } from "../../lib/products";

const OrderForm = () => {
    const { id } = useParams();
    const isEditMode = Boolean(id);

    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        selectedCustomer: "",
        orderDate: "",
        status: "pending",
    });

    const [orderLines, setOrderLines] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
        try {
            const { customers } = await getCustomers();
            const { products } = await getProducts();
            setCustomers(customers);
            setProducts(products);

            if (isEditMode) {
            const order = await getOrderById(id);
            setFormData({
                selectedCustomer: order.customer_id,
                orderDate: order.date || "",
                status: order.status,
            });
            const lines = order.order_lines.map((line) => ({
                id: line.id,
                productId: line.product_id,
                quantity: line.quantity,
                price: line.price,
            }));
            setOrderLines(lines);
            }
        } catch (error) {
            toast.error("Failed to load data");
            console.error(error);
        }
        };

        fetchData();
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLineChange = (index, field, value) => {
        const newLines = [...orderLines];
        if (field === "productId") {
            const selected = products.find((p) => p.id === value);
            newLines[index].productId = value;
            newLines[index].price = selected?.price || 0;
        } else {
            newLines[index][field] = value;
        }
        setOrderLines(newLines);
    };

    const addLine = () => {
        setOrderLines([...orderLines, { productId: "", quantity: 1, price: 0 }]);
    };

    const removeLine = (index) => {
        const updated = [...orderLines];
        updated.splice(index, 1);
        setOrderLines(updated);
    };

    const calculateSubtotal = (line) => line.quantity * line.price;
    const calculateTotal = () =>
        orderLines.reduce((sum, line) => sum + calculateSubtotal(line), 0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { selectedCustomer, orderDate, status } = formData;

        if (!selectedCustomer || !orderDate || orderLines.length === 0) {
            toast.error("Please complete all fields.");
            return;
        }

        const linesWithSubtotals = orderLines.map((line) => ({
            id: line.id,
            product_id: line.productId,
            quantity: line.quantity,
            price: line.price,
            subtotal: calculateSubtotal(line),
        }));

        const orderData = {
            customer_id: selectedCustomer,
            status,
            total: calculateTotal(),
            date: orderDate,
        };

        try {

        if (isEditMode) {
            await updateOrder(id, orderData, linesWithSubtotals);
            toast.success("Order Updated Successfully");
        } else {
            await createOrder(orderData, linesWithSubtotals);
            toast.success("Order Created Successfully");
        }

        navigate("/dashboard/orders")
        setOrderLines([]);
        } catch (error) {
            toast.error("Failed to submit order");
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen p-6">
            <div className="bg-white border border-gray-300 w-full p-10">
                <h2 className="text-xl font-semibold mb-4">
                {isEditMode ? "Edit Order" : "Create Order"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                        Select Customer
                        </label>
                        <select
                        name="selectedCustomer"
                        className="w-full px-4 py-2 border border-gray-300"
                        value={formData.selectedCustomer}
                        onChange={handleChange}
                        >
                        <option value="">-- Select Customer --</option>
                        {customers.map((c) => (
                            <option key={c.id} value={c.id}>
                            {c.name}
                            </option>
                        ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Order Date
                            </label>
                            <input
                                name="orderDate"
                                type="date"
                                className="w-full px-3 py-2 border border-gray-300"
                                value={formData.orderDate}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Status</label>
                            <select
                                name="status"
                                className="w-full px-3 py-2 border border-gray-300"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="pending">Pending</option>
                                <option value="delivered">Delivered</option>
                                <option value="canceled">Canceled</option>
                            </select>
                        </div>
                    </div>

                    {orderLines.length > 0 && (
                        <h1 className="text-lg font-semibold mt-6 mb-2">Order Lines</h1>
                    )}

                    {orderLines.map((line, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end"
                            >
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1">
                                    Product
                                </label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300"
                                    value={line.productId}
                                    onChange={(e) =>
                                        handleLineChange(index, "productId", e.target.value)
                                    }
                                    >
                                    <option value="">-- Select Product --</option>
                                    {products.map((p) => (
                                        <option key={p.id} value={p.id}>
                                        {p.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Quantity
                                    </label>
                                    <input
                                    type="number"
                                    min="1"
                                    className="w-full px-3 py-2 border border-gray-300"
                                    value={line.quantity}
                                    onChange={(e) =>
                                        handleLineChange(index, "quantity", parseInt(e.target.value))
                                    }
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Price</label>
                                    <input
                                    type="number"
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 bg-gray-100"
                                    value={line.price}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                Subtotal
                                </label>
                                <div className="w-full px-3 py-2 border border-gray-300 bg-gray-100">
                                {calculateSubtotal(line).toFixed(2)}
                                </div>
                            </div>

                            <div>
                                <button
                                    type="button"
                                    className="text-red-600 font-bold text-sm"
                                    onClick={() => removeLine(index)}
                                    >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addLine}
                        className="mt-4 px-4 py-2  text-orange-500 font-semibold cursor-pointer"
                    >
                        Add Line
                    </button>

                    <div className="text-right text-xl font-semibold mt-6">
                        Total: ${calculateTotal().toFixed(2)}
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-6 py-3 bg-orange-600 text-white font-bold text-lg rounded-md cursor-pointer"
                    >
                        {isEditMode ? "Update Order" : "Create Order"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OrderForm;
