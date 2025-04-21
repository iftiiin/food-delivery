import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { Outlet } from 'react-router'

const DashboardLayout = () => {

  return (
    <div >
      <Sidebar  />
      <div className="sm:ml-60 ">
        <main className="p-4 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout