import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/home/Home'
import Navbar from './components/Navbar'
import LogIn from './components/auth/Login'
import SignUp from './components/auth/Register'
import Section1 from './components/home/Section1'
import ProtectedRoute from './components/ProtectedRoute'



function App() {

  return (
    <>
     <div className=''>
     
      

      <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route
          path="/services"
          element={
            <ProtectedRoute>
              <Section1 />
            </ProtectedRoute>
          }
        />

      
      </Routes>
     </div>
    </>
  )
}

export default App
