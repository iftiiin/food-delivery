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
const App = () => {
  return (
    <>
      <Header/>
      <main>
        {/* routes */}
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/order' element={<Order />}/>
            <Route  path='/about' element={<About />}/>
            <Route  path='/contact' element={<Contact />}/>
            <Route  path='/dashboard' element={<Dashboard />}/>
            <Route  path='/signup' element={<SignUp />}/>
            <Route  path='/signin' element={<SignIn />}/>
        </Routes>
      </main>
      <Footer/>
      <Toaster />
    </>
  )
}

export default App
