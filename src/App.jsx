import React, { useContext  } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AboutRoute from './routes/About';
import SignupBonusCalculatorRoute from './routes/SignupBonusCalculator';
import NavBar from './components/NavBar';
import { ThemeContext } from './context/ThemeContext';
import MainContent from './components/MainContent';

export default function App({}) {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div data-theme={theme} className='min-h-screen'>
      <Router>
        <NavBar />
        <MainContent>
        <Routes>
          <Route path="/about" element={<AboutRoute />} />
          <Route path="/" element={<SignupBonusCalculatorRoute />} />
        </Routes>
        </MainContent>
      </Router>
      <footer className="footer bg-base-200 text-base-content" ></footer>
    </div>
  );
};
