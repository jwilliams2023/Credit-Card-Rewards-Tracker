import React, { useContext  } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomeRoute from './routes/Home';
import SignupBonusCalculatorRoute from './routes/SignupBonusCalculator';
import NavBar from './components/NavBar';
import { ThemeContext } from './context/ThemeContext';

export default function App({}) {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div data-theme={theme} className='min-h-screen'>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/signupbonuscalc" element={<SignupBonusCalculatorRoute />} />
        </Routes>
      </Router>
      <footer className="footer bg-base-200 text-base-content" ></footer>
    </div>
  );
};
