import React from 'react';

export default function About() {
    return (
        <div className="flex flex-col items-center justify-center p-12 space-y-10">
            <h1 className="md:text-xl text-lg font-bold text-center">
                Welcome to Credit Card Rewards Tracker!
            </h1>
            
            <p className="text-lg max-w-3xl leading-relaxed">
                Currently focused on tracking sign-up bonuses. 
                The tool calculates how long it will take to meet spending requirements for rewards, such as cashback, points, or miles. Future updates will include a 
                <strong> credit score calculator</strong>, enhanced <strong>UI/UX improvements</strong>, and backend support for tracking multiple bonuses across different cards.
            </p> 

            <div className="flex flex-col items-center space-y-6">
                <ul className="list-disc text-lg max-w-3xl space-y-3">
                    <li>
                        <strong>Sign Up Bonus Tracker</strong>: Input your target and monthly spend to see how long it will take to achieve your goal.
                    </li>
                    <li>
                        <strong>Progress Visualization</strong>: View your monthly progress with easy-to-understand radial progress bars.
                    </li>
                    <li>
                        <strong>Dark Mode</strong>: Enjoy a customizable user experience with light and dark mode options.
                    </li>
                </ul>

                <button className="btn btn-primary mt-8 md:text-lg text-md" onClick={() => window.location.href='/'}>
                    Try out the Credit Card Bonus Calculator
                </button>
            </div>
        </div>
    );
}
