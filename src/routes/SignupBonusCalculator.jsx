import React, { useContext, useEffect, useState } from 'react';
import { SignupBonusCalculatorProvider, SignupBonusCalculatorContext } from '../context/SignupBonusCalculatorContext';
import NumberInputBox from '../components/NumberInputBox';
import { RadialProgress } from '../components/RadialProgress';

function SignupBonusCalculatorContent() {
    const {
        spendingTarget,
        setSpendingTarget,
        monthlySpend,
        setMonthlySpend,
        timeToGoal,
        calculateTimeToGoal,
        resetContext
    } = useContext(SignupBonusCalculatorContext);

    const [monthlyProgress, setMonthlyProgress] = useState([]);

    // Ensure calculateTimeToGoal runs only after both spendingTarget and monthlySpend are updated
    useEffect(() => {
        if (spendingTarget > 0 && monthlySpend > 0) {
            console.log("Calculating timeToGoal with:", spendingTarget, monthlySpend);
            calculateTimeToGoal();  // Trigger calculation when both values are updated
        }
    }, [spendingTarget, monthlySpend]);  // Run when either spendingTarget or monthlySpend changes

    useEffect(() => {
        if (timeToGoal > 0) {
            calculateMonthlyProgress();  // Only calculate monthly progress if timeToGoal is valid
        }
    }, [timeToGoal]);  // Recalculate monthly progress when timeToGoal changes

    const calculateMonthlyProgress = () => {
        if (spendingTarget <= 0 || monthlySpend <= 0) {
            setMonthlyProgress([]);  // If invalid input, clear the progress
            return;
        }

        const totalMonths = Math.ceil(timeToGoal);  // Calculate total months required to reach the goal
        const progressArray = [];

        for (let month = 1; month <= totalMonths; month++) {
            const cumulativeSpend = monthlySpend * month;
            const progressPercentage = Math.min(
                (cumulativeSpend / spendingTarget) * 100,
                100
            );
            progressArray.push(progressPercentage);
        }

        setMonthlyProgress(progressArray);  // Set the progress array for rendering
    };

    return (
        <div className='flex items-center justify-center'>
            <div className='flex-col space-y-4'>
                <h1 className='text-2xl font-bold mb-4'>Signup Bonus Calculator</h1>
                <NumberInputBox label='Spending Target' value={spendingTarget} setFn={setSpendingTarget} />
                <NumberInputBox label='Monthly Spend' value={monthlySpend} setFn={setMonthlySpend} />
                <p>Time to goal: {timeToGoal} months</p>
                <button className='btn' onClick={resetContext}>Reset</button>
                {/* Display radial progress bars for each month */}
                <div className='flex flex-wrap justify-center space-x-4'>
                    {monthlyProgress.map((progress, index) => (
                        <RadialProgress key={index} value={progress.toFixed(2)} label={`Month ${index + 1}`} />
                    ))}
                </div>     
            </div>
        </div>
    );
};

export default function SignupBonusCalculator() {
    return (
        <SignupBonusCalculatorProvider>
            <SignupBonusCalculatorContent />
        </SignupBonusCalculatorProvider>
    );
}
