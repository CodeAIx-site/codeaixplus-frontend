"use client"

import { useContext, useState, useRef, useEffect } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { FaGithub, FaStar, FaCube } from "react-icons/fa"
import { Context } from "../Data/Context"
import GitHubImporter from "./GitHubImporter"

const Navbar = () => {
  const { dispatch } = useContext(Context)
  const navigate = useNavigate()
  const location = useLocation()
  const [showGitHubImporter, setShowGitHubImporter] = useState(false)

  // Model selector state
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false)
  const [selectedModel, setSelectedModel] = useState("CodeAIx+")
  const dropdownRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        titleRef.current &&
        !titleRef.current.contains(event.target)
      ) {
        setIsModelDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleFileSelect = (fileData) => {
    if (window.handleFileImport) {
      window.handleFileImport(fileData)
    }
  }

  const selectModel = (model) => {
    setSelectedModel(model)
    setIsModelDropdownOpen(false)

    if (model === "CodeAIx+") {
      if (location.pathname !== "/codearea") {
        navigate("/codearea")
      }
    } else if (model === "CodeAIx") {
      const token = localStorage.getItem("token")
      window.location.href = `http://localhost:3000/?token=${token}`
    }
  }

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" })
    window.location.href = "http://localhost:3000/signup"
  }

  return (
    <>
      <nav className="navbar">
        <div
          ref={titleRef}
          className={`navbar-title cursor-pointer flex items-center ${isModelDropdownOpen ? "menu-open" : ""}`}
          onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
        >
          Code<span className="highlight-text">AI</span>x
          {selectedModel === "CodeAIx+" && <span className="plus-highlight">+</span>}
          <span className={`dropdown-indicator ml-1 ${isModelDropdownOpen ? "rotate-180" : ""}`}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </div>

        {isModelDropdownOpen && (
          <div className="model-dropdown-navbar wider-dropdown" ref={dropdownRef}>
            <div className="p-3">
                <div className="flex justify-start items-start px-3 py-1.5 mb-2">
                <h4 className="text-white/80 text-xs font-semibold text-left">SELECT MODEL</h4>
                </div>
              <div className="model-options-container">
                {/* CodeAIx+ Option */}
                <div
                  className={`model-option ${selectedModel === "CodeAIx+" ? "selected" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    selectModel("CodeAIx+")
                  }}
                >
                  <div className="model-icon premium">
                    <FaStar />
                  </div>
                  <div className="model-info">
                    <h3>
                      CodeAIx<span className="plus-highlight">+</span>
                    </h3>
                    <p className="description-text">
                      Advanced features including code quality analysis, debugging, and language conversion.
                    </p>
                  </div>
                  {selectedModel === "CodeAIx+" && (
                    <div className="check-icon">
                      <div className="check-circle">
                        <svg viewBox="0 0 20 20" fill="black" className="w-3 h-3">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                {/* CodeAIx Option */}
                <div
                  className={`model-option ${selectedModel === "CodeAIx" ? "selected" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    selectModel("CodeAIx")
                  }}
                >
                  <div className="model-icon basic">
                    <FaCube />
                  </div>
                  <div className="model-info">
                    <h3>CodeAIx</h3>
                    <p className="description-text">
                      Basic coding functionality including compile and execute operations.
                    </p>
                  </div>
                  {selectedModel === "CodeAIx" && (
                    <div className="check-icon">
                      <div className="check-circle">
                        <svg viewBox="0 0 20 20" fill="black" className="w-3 h-3">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="navbar-buttons">
          {location.pathname === "/codearea" && (
            <button onClick={() => setShowGitHubImporter(true)} className="navbar-button github-button">
              <FaGithub className="github-icon" /> Import
            </button>
          )}
            <a href="http://localhost:3000/account" className="navbar-button navbar-link">Account</a>
          <button onClick={handleLogout} className="navbar-button">
            Logout
          </button>
        </div>
      </nav>

      {showGitHubImporter && (
        <GitHubImporter onFileSelect={handleFileSelect} onClose={() => setShowGitHubImporter(false)} />
      )}
    </>
  )
}

export default Navbar