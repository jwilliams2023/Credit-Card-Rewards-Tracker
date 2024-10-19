import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { useIsMobile } from '../utils/screenUtils';
import MobileThemeToggle from './mobile/MobileThemeToggle';

export default function NavBar() {

    const isMobile = useIsMobile(); // Check if the screen is mobile from utlis/screenUtils.js

    const closeDropdown = () => {
        const dropdown = document.activeElement;
        dropdown?.blur(); // Unfocus the dropdown label/button to close the dropdown
    };

    return (
        <div className="navbar bg-base-100 text-base-content bg-opacity-70 backdrop-blur duration-100 [transform:translate3d(0,0,0)] rounded-box shadow-sm fixed top-0 left-0 w-full z-50">
            {/* Start - Hamburger Menu, always visible */}
            <div className="navbar-start">
                <div className="dropdown">
                    <label 
                        tabIndex={0} 
                        className="btn btn-primary m-1"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-5 w-5 stroke-current"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-base-300 rounded-box w-52 mt-4"
                    >
                        <li><Link to="/signupbonuscalc" onClick={closeDropdown}>Sign Up Bonus Calculator</Link></li>
                        <li><Link to="/" onClick={closeDropdown}>About</Link></li>
                    </ul>
                </div>
            </div>

            {/* Center - Always show title/logo */}
            <div className="navbar-center">
                <Link to="/" className="btn btn-ghost normal-case md:text-2xl text-xl font-bold">Credit Card Rewards</Link>
            </div>

            {/* End - Theme Toggle */}
            <div className="navbar-end">
                {isMobile ? <MobileThemeToggle/> : <ThemeToggle />}
            </div>
        </div>
    );
}

export function ThemeToggle() {
    const { theme, setTheme } = useContext(ThemeContext);

    function handleTheme() {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    return (
        
        <label className="flex cursor-pointer gap-2 items-center px-4">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="swap-off w-6 h-6"
            >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
            <input type="checkbox" checked={theme === 'dark'} onChange={handleTheme} className="toggle toggle-md theme-controller" />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="swap-on w-6 h-6"
            >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
        </label>
    );
}

