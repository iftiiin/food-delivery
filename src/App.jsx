import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Order from './pages/Order'
import About from './pages/About'
import Contact from './pages/Contact'
import Dashboard from './pages/Dashboard'
import SignUp from './pages/SignUp'
import { Toaster } from 'react-hot-toast'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import { AuthProvider } from './context/AuthContext'
import UnAuthenticatedRoute from './context/UnAuthenticatedRoute'
import ProtectedRoute from './context/ProtectedRoute'
const App = () => {
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
                  <Dashboard />
              </ProtectedRoute>
              }/>
        </Routes>
      </main>
      <Footer/>
      <Toaster />
    </AuthProvider>
  )
}

export default App
