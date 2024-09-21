import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

export default function NavBar() {
  return (
        <div className="navbar bg-base-100">

            <div className="navbar-start">
                <a className="btn-ghost text-xl">CC Rewards</a>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/signupbonuscalc">Sign Up Bonus Calculator</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </div>

            <div className="navbar-end">
                <ThemeToggle />
            </div>
        </div>
    );
}

export function ThemeToggle() {
    const {
        theme,
        setTheme
    } = useContext(ThemeContext);

    function handleTheme() {
        console.log('theme before:', theme);
        setTheme(theme === 'light' ? 'dark' : 'light');
        console.log('theme after:', theme);
    };

    return (
        <label className="flex cursor-pointer gap-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
            <input type="checkbox" value="light" className="toggle theme-controller" onChange={() => handleTheme()} />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path
                d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
        </label>
    )
}