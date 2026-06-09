import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import GalleryPage from "./pages/GalleryPage";
import ViewCode from "./pages/ViewCode";

import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ToastContainer from "./components/Toast";

function App() {
  return (
    <Router>
      <div className="relative">
        <Routes>

          {/* Default Route → Login */}
          <Route path="/" element={<Login />} />

          {/* Other Pages */}
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Home / Code Editor */}
          <Route path="/home" element={<Home />} />

          {/* Existing Routes */}
          <Route path="/s/:id" element={<Home />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/code/:id" element={<ViewCode />} />

        </Routes>

        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;