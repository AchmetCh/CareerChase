import { useState, useEffect } from 'react'
import Login from './components/auth/Login'
import './App.css'
import Header from './components/pages/Header'
import { useAuth } from './ContextApi';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NewJobForm from './components/jobs/NewJobForm';
import Home from './components/pages/Home'



function App() {
  const { userId, token } = useAuth()
  return (
    <div className="app">
      <Header />
      {token ? (
        <>
          <Routes>
            <Route path='/jobs/newJob' element={<NewJobForm />} />
          </Routes>
        </>) :
        (
          <>
            <Routes>
              <Route path='/login' element={<Login />} />
            </Routes>
          </>
        )}

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>

  )
}

export default App
