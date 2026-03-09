import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ChildSafety from './pages/ChildSafety';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/child-safety" element={<ChildSafety />} />
      </Routes>
    </Router>
  );
}

export default App;
