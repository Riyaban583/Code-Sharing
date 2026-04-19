import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GalleryPage from './pages/GalleryPage';
import ToastContainer from './components/Toast';
import ViewCode from "./pages/ViewCode";

function App() {
  return (
    <Router>
      <div className="relative">
        <Routes>
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
