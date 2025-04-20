import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Route, Routes, useLocation } from 'react-router'
import Home from './pages/Home'
import Order from './pages/Order'
import About from './pages/About'
import Contact from './pages/Contact'
import SignUp from './pages/SignUp'
import { Toaster } from 'react-hot-toast'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import { AuthProvider } from './context/AuthContext'
import UnAuthenticatedRoute from './context/UnAuthenticatedRoute'
import ProtectedRoute from './context/ProtectedRoute'
import Overview from './pages/dashboard/overview'
import OrderList from './pages/dashboard/OrderList'
import CustomerList from './pages/dashboard/CustomerList'
import ProductList from './pages/dashboard/ProductList'
import CategoryList from './pages/dashboard/CategoryList'
import PaymentList from './pages/dashboard/PaymentList'
import UserList from './pages/dashboard/UserList'
import DashboardLayout from './pages/dashboard/DashboardLayout'
const App = () => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/dashboard');
  return (
    <AuthProvider>
      <Header/>
      <main>
        {/* routes */}
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/order' element={<Order />}/>
            <Route path='/about' element={<About />}/>
            <Route path='/contact' element={<Contact />}/>
            {/* unauthenticated routes */}
            <Route path='/signup' element={
              <UnAuthenticatedRoute>
                  <SignUp />
              </UnAuthenticatedRoute>
              }/>
            <Route path='/signin' element={
              <UnAuthenticatedRoute>
                  <SignIn />
              </UnAuthenticatedRoute>
              }/>
            <Route path='/profile' element={<Profile />}/>
            
            {/* protected route */}
            <Route path='/dashboard' element={
              <ProtectedRoute>
                  <DashboardLayout />
              </ProtectedRoute>
              }>
              <Route index element={<Overview/>}/>
              <Route path='orders' element={<OrderList/>}/>
              <Route path='customers' element={<CustomerList/>}/>
              <Route path='categories' element={<CategoryList/>}/>
              <Route path='products' element={<ProductList/>}/>
              <Route path='payments' element={<PaymentList/>}/>
              <Route path='users' element={<UserList/>}/>
            </Route>
        </Routes>
      </main>
      {/* Conditionally render Footer only when not on dashboard */}
      {!isDashboardRoute && <Footer />}
      <Toaster />
    </AuthProvider>
  )
}

export default App
