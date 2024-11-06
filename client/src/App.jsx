import { useState, useEffect } from 'react'
import Login from './components/auth/Login'
import './App.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
          <Route path="/" element={<Home />} />
            <Route path='/jobs/newJob' element={<NewJobForm />} />
          </Routes>
        </>) :
        (
          <>
            <Routes>
              <Route path='/' element={<Login />} />
            </Routes>
          </>
        )}

      <Routes>
        
      </Routes>
      <ToastContainer/>
    </div>

  )
}

export default App
