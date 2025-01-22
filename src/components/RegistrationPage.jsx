import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../style.css"

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
import { User, Mail, Lock, Eye, EyeOff } from "react-feather"
import {
  getUsersFromLocalStorage,
  saveUsersToLocalStorage,
} from "../utils/localStorageUtils"

function RegistrationPage() {
  // State variables for managing form inputs and messages
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState("") // To show success/error messages
  const [error, setError] = useState("") // For validation errors
  const navigate = useNavigate()

  // Function to validate password strength
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/ // At least 1 lowercase, 1 uppercase, 1 digit, 1 special character, 8+ characters
    return regex.test(password)
  }

  // Function to handle the registration process
  const handleRegister = (e) => {
    e.preventDefault() // Prevent default form submission
    const users = getUsersFromLocalStorage() // Retrieve existing users

    // Validate the password before proceeding
    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character."
      )
      return
    }

    // Check if the email is already registered
    const userExists = users.some((user) => user.email === email)

    if (userExists) {
      // If the user exists, show an error message
      setMessage("This email is already registered. Please log in !")
    } else {
      // Register the new user by adding them to the users array
      users.push({ username, email, password })
      saveUsersToLocalStorage(users) // Save updated users to local storage
      setMessage("Registration successful!") // Show success message
      navigate("/login") // Redirect to the login page
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card className="w-50 shadow">
        <CardHeader>
          <h4 className="text-center">Register</h4>
        </CardHeader>
        <CardBody>
          {message && <div className="alert alert-info">{message}</div>}

          <Form onSubmit={handleRegister}>
            <Row className="mb-3">
              <Label sm="3">Username</Label>
              <Col sm="9">
                <InputGroup>
                  <InputGroupText>
                    <User size={16} />
                  </InputGroupText>
                  <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </InputGroup>
              </Col>
            </Row>
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
            <Row className="mb-3">
              <Label sm="3">Password</Label>
              <Col sm="9">
                <InputGroup>
                  <InputGroupText>
                    <Lock size={16} />
                  </InputGroupText>
                  <Input
                    type={showPassword ? "text" : "password"} // Toggle password visibility
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <InputGroupText
                    onClick={() => setShowPassword(!showPassword)} // Handle password visibility toggle
                    style={{ cursor: "pointer" }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </InputGroupText>
                </InputGroup>
                {error && (
                  <p style={{ color: "red", fontSize: "12px" }}>{error}</p>
                )}
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <Button color="primary" type="submit">
                  Register
                </Button>
              </Col>
            </Row>
            <p className="text-center mt-3">
              Already have an account?{" "}
              <Link to="/login" className="bold-blue-link">
                Login
              </Link>
            </p>
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}

export default RegistrationPage
