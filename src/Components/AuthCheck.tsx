"use client"

import type React from "react"
import { useEffect, useState } from "react"

interface AuthCheckProps {
  children: React.ReactNode
}

const AuthCheck: React.FC<AuthCheckProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isChecking, setIsChecking] = useState<boolean>(true)

  useEffect(() => {
    // Check for token in URL params first
    const queryParams = new URLSearchParams(window.location.search)
    let token = queryParams.get("token")

    // If token is in URL, save it to localStorage and clean URL
    if (token) {
      localStorage.setItem("token", token)
      // Clean URL by removing token parameter
      const newUrl =
        window.location.pathname + window.location.search.replace(/[?&]token=[^&]+/, "").replace(/^\?$/, "")
      window.history.replaceState({}, document.title, newUrl)
    } else {
      // If not in URL, check localStorage
      token = localStorage.getItem("token")
    }

    if (token) {
      setIsAuthenticated(true)
    } else {
      // Redirect to CodeAIx if no token found
      window.location.href = "http://localhost:3000"
    }

    setIsChecking(false)
  }, [])

  // Show loading while checking authentication
  if (isChecking) {
    return (
      <div className="auth-check-loading">
        <div className="loading-spinner"></div>
        <p>Verifying authentication...</p>
      </div>
    )
  }

  // If not authenticated, this will never render because of the redirect
  return <>{children}</>
}

export default AuthCheck

