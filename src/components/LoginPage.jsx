import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../style.css"

import {
  getUsersFromLocalStorage,
  saveLoggedInUser,
} from "../utils/localStorageUtils"
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Label,
  Button,
  CardBody,
  CardHeader,
  InputGroup,
  InputGroupText,
} from "reactstrap"
import { Mail, Lock, Eye, EyeOff } from "react-feather"

function LoginPage() {
  // State for managing user input fields and validation
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false) // Toggle visibility of password
  const [error, setError] = useState("") // Error message for login issues
  const [errorValidation, setErrorValidation] = useState("") // Error message for password validation
  const navigate = useNavigate() // Navigation hook for redirection

  // Function to validate password using regex for strength requirements
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/
    return regex.test(password)
  }

  // Handle login form submission
  const handleLogin = (e) => {
    e.preventDefault()
    const users = getUsersFromLocalStorage() // Fetch stored users

    // Check password strength before proceeding
    if (!validatePassword(password)) {
      setErrorValidation(
        "Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character."
      )
      return
    }

    // Find user by email in the local storage data
    const user = users.find((user) => user.email === email)

    if (user && user.password === password) {
      saveLoggedInUser(user) // Save logged-in user to local storage
      navigate("/account") // Redirect to account page
    } else if (!user) {
      setError("Please register first") // Handle case where user is not registered
    } else {
      setError("Invalid password") // Handle incorrect password scenario
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card className="w-50 shadow">
        <CardHeader>
          <h4 className="text-center">Login</h4>
        </CardHeader>
        <CardBody>
          {/* Display error messages for login issues */}
          {error && <div className="alert alert-danger">{error}</div>}
          <Form onSubmit={handleLogin}>
            {/* Email input field */}
            <Row className="mb-3">
              <Label sm="3">Email</Label>
              <Col sm="9">
                <InputGroup>
                  <InputGroupText>
                    <Mail size={16} />
                  </InputGroupText>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </InputGroup>
              </Col>
            </Row>
            {/* Password input field with show/hide functionality */}
            <Row className="mb-3">
              <Label sm="3">Password</Label>
              <Col sm="9">
                <InputGroup>
                  <InputGroupText>
                    <Lock size={16} />
                  </InputGroupText>
                  <Input
                    type={showPassword ? "text" : "password"} // Toggle between text and password
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <InputGroupText
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: "pointer" }}
                  >
                    {/* Toggle password visibility icon */}
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </InputGroupText>
                </InputGroup>
                {/* Display validation error for weak passwords */}
                {errorValidation && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {errorValidation}
                  </p>
                )}
              </Col>
            </Row>
            {/* Login button */}
            <Row>
              <Col className="text-center">
                <Button color="primary" type="submit">
                  Login
                </Button>
              </Col>
            </Row>
            {/* Redirect link to the registration page */}
            <p className="text-center mt-3">
              Don't have an account?{" "}
              <Link to="/register" className="bold-blue-link">
                Register
              </Link>
            </p>
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}

export default LoginPage
