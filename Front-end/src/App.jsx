import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/Notfound'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </Router>
  )
}

export default App
