import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import DropDownBox from '../components/DropDownBox';  // Importing the reusable dropdown component

export default function NavBar() {
    // Define the menu items for the dropdown in the navbar
    const menuItems = [
        { label: 'Sign Up Bonus Calculator', link: '/signupbonuscalc' },
        { label: 'About', link: '/' }
    ];

    const handleMenuItemSelect = (item) => {
        window.location.href = item.link; // Redirect to the selected link
    };

    return (
        <div className="navbar bg-base-100 rounded-box shadow">
            {/* Start - Hamburger Menu, always visible */}
            <div className="navbar-start">
                <DropDownBox
                    buttonLabel="☰"
                    dropdownItems={menuItems}
                    onItemSelect={handleMenuItemSelect}
                />
            </div>

            {/* Center - Always show title/logo */}
            <div className="navbar-center">
                <Link to="/" className="btn btn-ghost normal-case text-3xl font-bold">Credit Card Rewards</Link>
            </div>

            {/* End - Theme Toggle */}
            <div className="navbar-end">
                <ThemeToggle />
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
                className="swap-off w-6 h-6">
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
                className="swap-on w-6 h-6">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
        </label>
    );
}
