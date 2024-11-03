import { useState, useEffect } from 'react'
import Login from './components/auth/Login'
import './App.css'
import { useAuth } from './ContextApi';



function App() {
const {userId} = useAuth()
  return (
    <div className="app">
      {userId? (
        <>
          <h1>CareerChase</h1>
        </>) :
        (
          <>
            <Login />
          </>
        )}


    </div>

  )
}

export default App
