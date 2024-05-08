import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Customers from './components/Customers';
import Trainings from './components/Trainings';
import './App.css';  

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Customers</Link> | 
          <Link to="/trainings">Trainings</Link>
        </nav>
        <div className="container">
          <Routes>
            <Route path="/" element={<Customers />} />
            <Route path="/trainings" element={<Trainings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
