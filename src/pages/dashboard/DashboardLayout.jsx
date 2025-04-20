import React from 'react'
import Sidebar from '../../components/Sidebar'
import { Outlet } from 'react-router'

const DashboardLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1  max-sm:ml-0 bg-gray-50 border-t  border-slate-300">
        <Outlet />
      </main>
  </div>
  )
}

export default DashboardLayout