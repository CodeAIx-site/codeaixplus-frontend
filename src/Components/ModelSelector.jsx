import React, { useState, useRef, useEffect } from 'react';
import { FaStar, FaCube, FaChevronDown } from 'react-icons/fa';

const ModelSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState('CodeAIx');
  const dropdownRef = useRef(null);

  // Close dropdown if click occurs outside of component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectModel = (model) => {
    setSelectedModel(model);
    setIsOpen(false);
    // Redirect based on selection
    if (model === 'CodeAIx+') {
      window.location.href = 'http://localhost:5173/codearea';
    } else if (model === 'CodeAIx') {
      window.location.href = 'http://localhost:3000/';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Refined dropdown button */}
      <div
        className="navbar-title cursor-pointer flex items-center"
        onClick={toggleDropdown}
      >
        <span>Code<span className="highlight-text">AI</span>x</span>
        {selectedModel === 'CodeAIx+' && <span className="plus-highlight">+</span>}
        
        {/* Better aligned dropdown indicator */}
        <FaChevronDown 
          className={`ml-2 text-xs opacity-70 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>

      {/* Enhanced dropdown with better visibility */}
      {isOpen && (
        <div className="premium-dropdown">
          <div className="dropdown-header">
            <h4 className="header-text">SELECT MODEL</h4>
          </div>
          
          <div className="model-options">
            {/* CodeAIx+ Option */}
            <div
              className={`model-option ${selectedModel === 'CodeAIx+' ? 'selected' : ''}`}
              onClick={() => selectModel('CodeAIx+')}
            >
              <div className="icon-container premium">
                <FaStar />
              </div>
              
              <div className="content">
                <div className="title">
                  CodeAIx<span className="plus-highlight">+</span>
                </div>
                <div className="description">
                  Advanced features including code quality analysis, debugging,
                  and language conversion.
                </div>
              </div>
              
              {selectedModel === 'CodeAIx+' && (
                <div className="checkmark">
                  <div className="circle">
                    <svg viewBox="0 0 20 20" fill="black" className="check-icon">
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
              className={`model-option ${selectedModel === 'CodeAIx' ? 'selected' : ''}`}
              onClick={() => selectModel('CodeAIx')}
            >
              <div className="icon-container basic">
                <FaCube />
              </div>
              
              <div className="content">
                <div className="title">CodeAIx</div>
                <div className="description">
                  Basic coding functionality including compile and execute operations.
                </div>
              </div>
              
              {selectedModel === 'CodeAIx' && (
                <div className="checkmark">
                  <div className="circle">
                    <svg viewBox="0 0 20 20" fill="black" className="check-icon">
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
      )}
    </div>
  );
};

export default ModelSelector;