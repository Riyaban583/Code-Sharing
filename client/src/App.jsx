import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import GalleryPage from './pages/GalleryPage';
import ViewCode from "./pages/ViewCode";

import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ToastContainer from './components/Toast';

function App() {
  return (
    <Router>

      <div className="relative">

        <Routes>

          {/* Welcome Page */}
          <Route path="/welcome" element={<Welcome />} />

          {/* Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Existing Routes */}
          <Route path="/" element={<Home />} />
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