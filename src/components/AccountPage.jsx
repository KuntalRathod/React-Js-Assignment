import React, { useEffect, useState } from "react"
import { getLoggedInUser, clearLoggedInUser } from "../utils/localStorageUtils"
import { useNavigate } from "react-router-dom"
import { Card, CardBody, CardHeader, Button, Row, Col } from "reactstrap"

function AccountPage() {
  const [user, setUser] = useState(null) // State to hold logged-in user information
  const navigate = useNavigate() // Hook to navigate between pages

  useEffect(() => {
    const loggedInUser = getLoggedInUser() // Retrieve logged-in user data from local storage
    if (loggedInUser) {
      // If user is logged in, set user state with user data
      setUser(loggedInUser)
    } else {
      // If no user is logged in, navigate to login page
      navigate("/login")
    }
  }, [navigate]) // Dependency on navigate to avoid stale closure

  const handleLogout = () => {
    clearLoggedInUser() // Clear logged-in user data from local storage
    navigate("/login") // Navigate to login page after logout
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card className="w-50 shadow">
        <CardHeader>
          <h4 className="text-center">Account Information</h4>
        </CardHeader>
        <CardBody>
          {user && ( // Render user information if user state is not null
            <>
              <Row className="mb-3">
                <Col sm="4">
                  <strong>Username:</strong>
                </Col>
                <Col sm="8">{user.username}</Col> {/* Display username */}
              </Row>
              <Row className="mb-3">
                <Col sm="4">
                  <strong>Email:</strong>
                </Col>
                <Col sm="8">{user.email}</Col> {/* Display email */}
              </Row>
            </>
          )}
          <div className="text-center">
            <Button
              color="primary"
              className="me-2"
              onClick={() => navigate("/edit-account")} // Navigate to edit account page
            >
              Edit Account
            </Button>
            <Button color="danger" onClick={handleLogout}>
              {" "}
              {/* Logout button */}
              Logout
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default AccountPage
