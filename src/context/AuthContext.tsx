"use client"

import type React from "react"
import { createContext, useState, useEffect, useContext, type ReactNode } from "react"
import { jwtDecode } from "jwt-decode"

interface AuthContextType {
  isAuthenticated: boolean
  token: string | null
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,
  logout: () => {},
})

export const useAuth = () => useContext(AuthContext)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    // Check for token in URL params first
    const queryParams = new URLSearchParams(window.location.search)
    let authToken = queryParams.get("token")

    // If not in URL, check localStorage
    if (!authToken) {
      authToken = localStorage.getItem("token")
    } else {
      // If token was in URL, save it to localStorage and clean URL
      localStorage.setItem("token", authToken)
      window.history.replaceState({}, document.title, window.location.pathname)
    }

    if (authToken) {
      try {
        // Verify token expiration
        const decodedToken = jwtDecode(authToken)
        if (decodedToken.exp && decodedToken.exp * 1000 > Date.now()) {
          setToken(authToken)
          setIsAuthenticated(true)
        } else {
          // Token expired
          localStorage.removeItem("token")
        }
      } catch (error) {
        console.error("Invalid token:", error)
        localStorage.removeItem("token")
      }
    }
  }, [])

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    setIsAuthenticated(false)
    // Redirect to CodeAIx
    window.location.href = "http://localhost:3000"
  }

  return <AuthContext.Provider value={{ isAuthenticated, token, logout }}>{children}</AuthContext.Provider>
}

export default AuthContext

