import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import FormBuilder from "./pages/FormBuilder";
import FormView from "./pages/FormView";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Templates from "./pages/Templates";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Apply dark mode to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<FormBuilder />} />
        <Route path="/form/:id" element={<FormView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/templates" element={<Templates />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
