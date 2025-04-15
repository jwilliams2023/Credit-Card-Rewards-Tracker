import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

export default function About() {
    const { theme } = useContext(ThemeContext);
    const isDarkMode = theme === 'dark';

    return (
        <div className={`min-h-screen p-6 pt-20 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
            <div className="container mx-auto max-w-4xl">
                <h1 className="text-2xl font-bold mb-8 text-center">
                    Welcome to Credit Card Rewards Tracker!
                </h1>
                
                <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 bg-opacity-60' : 'bg-white'} mb-8`}>
                    <p className="text-lg leading-relaxed mb-6">
                        Our application helps you manage your credit cards and track sign-up bonuses. 
                        With our tools, you can easily monitor your progress toward spending requirements 
                        for rewards like cashback, points, or miles.
                    </p>
                    
                    <p className="text-lg leading-relaxed">
                        Future updates will include a <strong>credit score calculator</strong>, 
                        enhanced <strong>UI/UX improvements</strong>, and expanded support for 
                        tracking multiple bonuses across different cards.
                    </p>
                </div>

                <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 bg-opacity-60' : 'bg-white'} mb-8`}>
                    <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        Features
                    </h2>
                    
                    <ul className="space-y-4">
                        <li className="flex items-start">
                            <div className={`mr-3 mt-1 text-green-500`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <strong>Credit Card Tracker</strong>: Store and manage all your credit cards in one place, 
                                including details like annual fees, credit limits, and bonus values.
                            </div>
                        </li>
                        <li className="flex items-start">
                            <div className={`mr-3 mt-1 text-green-500`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <strong>Sign Up Bonus Calculator</strong>: Input your target spending requirement and monthly 
                                spend to visualize how long it will take to achieve your bonus.
                            </div>
                        </li>
                        <li className="flex items-start">
                            <div className={`mr-3 mt-1 text-green-500`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <strong>Visual Progress Tracking</strong>: See your progress with intuitive visualizations 
                                and track important dates like approval and bonus posting.
                            </div>
                        </li>
                        <li className="flex items-start">
                            <div className={`mr-3 mt-1 text-green-500`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <strong>Cloud Storage</strong>: Your card data is securely stored in a database, allowing you to 
                                access your information from any device.
                            </div>
                        </li>
                        <li className="flex items-start">
                            <div className={`mr-3 mt-1 text-green-500`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <strong>Dark Mode</strong>: Customize your experience with light and dark mode options 
                                to reduce eye strain during night usage.
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="flex justify-center mt-8">
                    <Link to="/tracker">
                        <button 
                            className="py-3 px-6 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-lg font-medium"
                            style={{ backgroundColor: '#6366F1' }}
                        >
                            Go to Credit Card Tracker
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}