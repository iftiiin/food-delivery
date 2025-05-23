import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Route, Routes, useLocation } from 'react-router'
import Home from './pages/Home'
import Order from './pages/Order'
import Contact from './pages/Contact'
import SignUp from './pages/SignUp'
import { Toaster } from 'react-hot-toast'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import { AuthProvider } from './context/AuthContext'
import UnAuthenticatedRoute from './context/UnAuthenticatedRoute'
import ProtectedRoute from './context/ProtectedRoute'
import Overview from './pages/dashboard/Overview'
import OrderList from './pages/dashboard/OrderList'
import CustomerList from './pages/dashboard/CustomerList'
import ProductList from './pages/dashboard/ProductList'
import CategoryList from './pages/dashboard/CategoryList'
import PaymentList from './pages/dashboard/PaymentList'
import UserList from './pages/dashboard/UserList'
import DashboardLayout from './pages/dashboard/DashboardLayout'
import CustomerForm from './pages/dashboard/CustomerForm'
import CategoryForm from './pages/dashboard/CategoryForm'
import ProductForm from './pages/dashboard/ProductForm'
import OrderForm from './pages/dashboard/OrderForm'
import ProductDetails from './components/ProductDetails'
import CartItems from './components/CartItems'
import { OrderProvider } from './context/OrderContext'
const App = () => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/dashboard');
  return (
    <AuthProvider>
      <OrderProvider>
        <Header/>
          <main className='pt-16'>
            {/* routes */}
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/order' element={<Order />}/>
                <Route path='/contact' element={<Contact />}/>
                <Route path='/product-details/:id' element={<ProductDetails />}/>
                <Route path='/cart' element={<CartItems />}/>
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
                  <Route path='orders/create' element={<OrderForm/>}/>
                  <Route path='orders/:id' element={<OrderForm/>}/>
                  <Route path='customers' element={<CustomerList/>}/>
                  <Route path='customers/create' element={<CustomerForm/>}/>
                  <Route path='customers/:id' element={<CustomerForm/>}/>
                  <Route path='categories' element={<CategoryList/>}/>
                  <Route path='categories/create' element={<CategoryForm/>}/>
                  <Route path='categories/:id' element={<CategoryForm/>}/>
                  <Route path='products' element={<ProductList/>}/>
                  <Route path='products/create' element={<ProductForm/>}/>
                  <Route path='products/:id' element={<ProductForm/>}/>
                  <Route path='payments' element={<PaymentList/>}/>
                  <Route path='users' element={<UserList/>}/>
                </Route>
            </Routes>
          </main>
          {/* Conditionally render Footer only when not on dashboard */}
          {!isDashboardRoute && <Footer />}
          <Toaster />
      </OrderProvider>
    </AuthProvider>
  )
}

export default App
