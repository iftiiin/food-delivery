import React from 'react'
import Sidebar from '../../components/Sidebar'
import { Outlet } from 'react-router'

const DashboardLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4 max-sm:ml-0">
        <Outlet />
      </main>
  </div>
  )
}

export default DashboardLayout