import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { LoginPage, LoginPageFull, AuthPage, Profile, ForgotPassword } from './Pages'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPageFull />} />
        <Route path="/authorisation" element={<AuthPage />} />
        <Route path="/password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
