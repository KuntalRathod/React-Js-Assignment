import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginPage from "./components/LoginPage"
import RegistrationPage from "./components/RegistrationPage"
import AccountPage from "./components/AccountPage"
import EditAccountPage from "./components/EditAccountPage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/edit-account" element={<EditAccountPage />} />
      </Routes>
    </Router>
  )
}

export default App
