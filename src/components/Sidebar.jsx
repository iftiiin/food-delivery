
import { NavLink } from "react-router";
import {
  HiHome,
  HiClipboardList,
  HiShoppingBag,
  HiUsers,
} from "react-icons/hi";
import { MdCategory, MdPayment } from "react-icons/md";

export default function Sidebar() {
 
    return (
        <>
        {/* Sidebar */}
        <aside
            className={`fixed z-40 h-screen w-60 border-r border-slate-300 transition-transform duration-300
            ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 sm:static sm:z-0`}
        >

            <nav className="p-4 overflow-y-auto">
                {/* Main */}
                <div className="mb-6">
                    <p className="text-xs uppercase mb-2">Main</p>
                    <NavLink
                    to="/dashboard"
                    end
                    className={({ isActive }) =>
                        `flex items-center gap-2 p-2 rounded transition-colors duration-200 ${
                        isActive
                            ? "bg-orange-100 text-orange-600"
                            : "hover:bg-slate-100"
                        }`
                    }
                    >
                        <HiHome className="text-lg" />
                        <span>Overview</span>
                    </NavLink>
                </div>

                {/* Product Management */}
                <div className="mb-6">
                    <p className="text-xs uppercase mb-2">Product Management</p>
                    <NavLink
                    to="dashboard/categories"
                    className={({ isActive }) =>
                        `flex items-center gap-2 p-2 rounded transition-colors duration-200 ${
                        isActive
                            ? "bg-orange-100 text-orange-600"
                            : "hover:bg-slate-100"
                        }`
                    }
                    >
                        <MdCategory className="text-lg" />
                        <span>Categories</span>
                    </NavLink>
                    <NavLink
                    to="dashboard/products"
                    className={({ isActive }) =>
                        `flex items-center gap-2 p-2 rounded transition-colors duration-200 ${
                        isActive
                            ? "bg-orange-100 text-orange-600"
                            : "hover:bg-slate-100"
                        }`
                    }
                    >
                        <HiShoppingBag className="text-lg" />
                        <span>Products</span>
                    </NavLink>
                </div>

                {/* Sales */}
                <div className="mb-6">
                    <p className="text-xs uppercase mb-2">Sales</p>
                    <NavLink
                    to="/dashboard/orders"
                    className={({ isActive }) =>
                        `flex items-center gap-2 p-2 rounded transition-colors duration-200 ${
                        isActive
                            ? "bg-orange-100 text-orange-600"
                            : "hover:bg-slate-100"
                        }`
                    }
                    >
                        <HiClipboardList className="text-lg" />
                        <span>Orders</span>
                    </NavLink>
                    <NavLink
                    to="dashboard/payments"
                    className={({ isActive }) =>
                        `flex items-center gap-2 p-2 rounded transition-colors duration-200 ${
                        isActive
                            ? "bg-orange-100 text-orange-600"
                            : "hover:bg-slate-100"
                        }`
                    }
                    >
                        <MdPayment className="text-lg" />
                        <span>Payments</span>
                    </NavLink>
                </div>
                {/* Customer Management */}
                <div className="mb-6">
                    <p className="text-xs uppercase mb-2">Customer Management</p>
                    <NavLink
                        to="dashboard/customers"
                        className={({ isActive }) =>
                        `flex items-center gap-2 p-2 rounded transition-colors duration-200 ${
                            isActive
                            ? "bg-orange-100 text-orange-600"
                            : "hover:bg-slate-100"
                        }`
                        }
                    >
                        <HiUsers className="text-lg" />
                        <span>Customers</span>
                    </NavLink>
                </div>
                {/* Users */}
                <div>
                    <p className="text-xs uppercase mb-2">Users</p>
                    <NavLink
                    to="dashoard/users"
                    className={({ isActive }) =>
                        `flex items-center gap-2 p-2 rounded transition-colors duration-200 ${
                        isActive
                            ? "bg-orange-100 text-orange-600"
                            : "hover:bg-slate-100"
                        }`
                    }
                    >
                        <HiUsers className="text-lg" />
                        <span>Users</span>
                    </NavLink>
                </div>
            </nav>
        </aside>
        </>
    );
}
