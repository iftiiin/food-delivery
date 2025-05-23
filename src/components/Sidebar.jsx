
import { NavLink } from "react-router";
import {
  HiHome,
  HiClipboardList,
  HiShoppingBag,
  HiUsers,
  HiMenu,
} from "react-icons/hi";
import { MdCategory } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

export default function Sidebar() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
 
    return (
        <>
        {/* Hamburger Button  */}
        <button
            className="fixed top-6 left-6 z-50 text-2xl text-gray-700 sm:hidden"
            onClick={() => setIsMenuOpen(true)}
        >
            <HiMenu />
        </button>
        {/* Sidebar */}
        <aside
        className={`
            fixed top-15 left-0 h-screen w-60 bg-white border-r border-slate-300
            transition-transform duration-300
            z-50 sm:z-0
            ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            sm:translate-x-0
        `}
        >
            {/* Close button */}
            <div className="sm:hidden flex justify-end p-2">
                <button onClick={() => setIsMenuOpen(false)} className="text-xl">
                    <IoClose />
                </button>
            </div>

            <nav onClick={()=>setIsMenuOpen(false)} className="p-4 overflow-y-auto">
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
                    to="categories"
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
                    to="products"
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
                    to="orders"
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
                    
                </div>
                {/* Customer Management */}
                <div className="mb-6" >
                    <p className="text-xs uppercase mb-2">Customer Management</p>
                    <NavLink
                        to="customers"
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
                
            </nav>
        </aside>
        </>
    );
}
