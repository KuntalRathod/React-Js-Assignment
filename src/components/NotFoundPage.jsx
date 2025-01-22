import React from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "reactstrap"

function NotFoundPage() {
  const navigate = useNavigate() // Hook for navigation

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center">
        <h1 className="display-3 text-danger">404</h1>
        <h4 className="mb-3">Oops! Page Not Found</h4>
        <p className="text-muted mb-4">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button color="primary" onClick={() => navigate("/")}>
          Go to Home
        </Button>
      </div>
    </div>
  )
}

export default NotFoundPage
