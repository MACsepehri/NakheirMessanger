import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import NotFoundPage from './pages/Notfound'
import MainPage from './pages/Mainpage'
import { SignUpPage } from './pages/SignupPage'
import { FuncContextProviderManager } from './Context/MessengerContext'

function App() {

  return (
    <FuncContextProviderManager>
    <Router>
      <Routes>
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage/>} />
      </Routes>
    </Router>
    </FuncContextProviderManager>
  )
}

export default App
