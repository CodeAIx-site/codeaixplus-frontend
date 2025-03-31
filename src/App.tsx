import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import CodeArea from "./Components/CodeArea";
import { Box, useMediaQuery } from "@chakra-ui/react";

function App() {
  const [isBelow480px] = useMediaQuery("(max-width: 480px)");
  const [isBelow768px] = useMediaQuery("(max-width: 768px)");

  return (
    <Router>
      <Box id="App">
        <Navbar isBelow768px={isBelow768px} isBelow480px={isBelow480px} />
        <Routes>
          <Route path="/" element={<Navigate to="/codearea" replace />} />
          <Route path="/codearea" element={<CodeArea isBelow480px={isBelow480px} isBelow768px={isBelow768px} />} />
          <Route path="*" element={<Navigate to="/codearea" replace />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;