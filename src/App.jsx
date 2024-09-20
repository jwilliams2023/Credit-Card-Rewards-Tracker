import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomeRoute from './routes/Home';
import SignupBonusCalculatorRoute from './routes/SignupBonusCalculator';

export default function App() {
  return (
    <Router>
      {/* Navigation */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signupbonuscalc">Sign Up Bonus Calculator</Link>
          </li>
        </ul>
      </nav>
      {/* Navigation */}

      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/signupbonuscalc" element={<SignupBonusCalculatorRoute />} />
      </Routes>
    </Router>
  )
}
