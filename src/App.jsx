import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ChildSafety from './pages/ChildSafety';
import DeleteAccount from './pages/DeleteAccount';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/child-safety" element={<ChildSafety />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
      </Routes>
    </Router>
  );
}

export default App;
