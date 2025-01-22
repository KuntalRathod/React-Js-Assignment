import React, { useEffect, useState } from "react"
import {
  getLoggedInUser,
  getUsersFromLocalStorage,
  saveLoggedInUser,
  saveUsersToLocalStorage,
} from "../utils/localStorageUtils"
import { useNavigate } from "react-router-dom"
import {
  Card,
  CardBody,
  CardHeader,
  Form,
  Row,
  Col,
  Input,
  Label,
  Button,
  InputGroup,
  InputGroupText,
} from "reactstrap"
import { Eye, EyeOff } from "react-feather"

function EditAccountPage() {
  const [username, setUsername] = useState("") // State for username
  const [email, setEmail] = useState("") // State for email
  const [password, setPassword] = useState("") // State for password
  const [showPassword, setShowPassword] = useState(false) // State to toggle password visibility
  const [errorValidation, setErrorValidation] = useState("") // State for validation error messages
  const navigate = useNavigate() // Hook to navigate between pages

  // Function to validate password strength
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/ // At least 1 lowercase, 1 uppercase, 8+ characters
    return regex.test(password)
  }

  useEffect(() => {
    const loggedInUser = getLoggedInUser() // Retrieve logged-in user data from local storage
    if (loggedInUser) {
      // If user is logged in, populate the form fields with user data
      setUsername(loggedInUser.username)
      setEmail(loggedInUser.email)
      setPassword(loggedInUser.password)
    } else {
      // If no user is logged in, navigate to login page
      navigate("/login")
    }
  }, [navigate]) // Dependency on navigate to avoid stale closure

  // Function to handle saving changes to user account
  const handleSaveChanges = (e) => {
    e.preventDefault() // Prevent default form submission
    const users = getUsersFromLocalStorage() // Get all users from local storage
    if (!validatePassword(password)) {
      // Validate the new password
      setErrorValidation(
        "Password must be at least 8 characters long, with at least one uppercase and one lowercase letter."
      )
      return // Exit if validation fails
    }
    const updatedUser = { username, email, password } // Create updated user object

    // Update the user in the users array
    const updatedUsers = users.map((user) =>
      user.email === getLoggedInUser().email ? updatedUser : user
    )

    saveUsersToLocalStorage(updatedUsers) // Save updated users back to local storage
    saveLoggedInUser(updatedUser) // Update logged-in user data
    navigate("/account") // Navigate back to account page after saving
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card className="w-50 shadow">
        <CardHeader>
          <h4 className="text-center">Edit Account</h4>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSaveChanges}>
            <Row className="mb-3">
              <Label sm="3">Username</Label>
              <Col sm="9">
                <Input
                  type="text"
                  value={username} // Bind input value to username state
                  onChange={(e) => setUsername(e.target.value)} // Update username state on input change
                  required
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Label sm="3">Email</Label>
              <Col sm="9">
                <Input
                  type="email"
                  value={email} // Bind input value to email state
                  onChange={(e) => setEmail(e.target.value)} // Update email state on input change
                  required
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Label sm="3">Password</Label>
              <Col sm="9">
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"} // Toggle password visibility
                    value={password} // Bind input value to password state
                    onChange={(e) => setPassword(e.target.value)} // Update password state on input change
                    required
                  />
                  <InputGroupText
                    onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state on icon click
                    style={{ cursor: "pointer" }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </InputGroupText>
                </InputGroup>
                {errorValidation && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {errorValidation} // Display validation error if any
                  </p>
                )}
              </Col>
            </Row>
            <div className="text-center">
              <Button color="primary" className="me-2" type="submit">
                Save Changes
              </Button>
              <Button color="danger" onClick={() => navigate("/account")}>
                Close
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}

export default EditAccountPage
