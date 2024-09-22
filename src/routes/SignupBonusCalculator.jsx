import React, { useContext, useEffect, useState } from 'react';
import { SignupBonusCalculatorProvider, SignupBonusCalculatorContext } from '../context/SignupBonusCalculatorContext';
import NumberInputBox from '../components/NumberInputBox';
import { RadialProgress } from '../components/RadialProgress';
import useDebounce from '../hooks/useDebounce';

function SignupBonusCalculatorContent() {
    const {
        spendingTarget,
        setSpendingTarget,
        monthlySpend,
        setMonthlySpend,
        timeToGoal,
        calculateTimeToGoal,
        resetContext,
        monthlyProgress,
        setMonthlyProgress
    } = useContext(SignupBonusCalculatorContext);

    //const [monthlyProgress, setMonthlyProgress] = useState([]);

    // Local states for input to apply debouncing
    const [localSpendingTarget, setLocalSpendingTarget] = useState(spendingTarget);
    const [localMonthlySpend, setLocalMonthlySpend] = useState(monthlySpend);

    // Debounced values
    const debouncedSpendingTarget = useDebounce(localSpendingTarget, 500);
    const debouncedMonthlySpend = useDebounce(localMonthlySpend, 500);

    // Trigger calculations after debounced values are ready
    useEffect(() => {
        if (debouncedSpendingTarget > 0 && debouncedMonthlySpend > 0) {
            setSpendingTarget(debouncedSpendingTarget);
            setMonthlySpend(debouncedMonthlySpend);
        }
    }, [debouncedSpendingTarget, debouncedMonthlySpend]);

    useEffect(() => {
        if (spendingTarget > 0 && monthlySpend > 0) {
            calculateTimeToGoal();
        }
    }, [spendingTarget, monthlySpend]);

    useEffect(() => {
        if (timeToGoal > 0) {
            calculateMonthlyProgress(); // Only calculate if timeToGoal is valid
        }
    }, [timeToGoal]);

    const calculateMonthlyProgress = () => {
        if (spendingTarget <= 0 || monthlySpend <= 0) {
            setMonthlyProgress([]); // Clear progress if invalid inputs
            return;
        }

        const totalMonths = Math.ceil(timeToGoal);
        const progressArray = [];

        for (let month = 1; month <= totalMonths; month++) {
            const cumulativeSpend = monthlySpend * month;
            const progressPercentage = Math.min((cumulativeSpend / spendingTarget) * 100, 100);
            progressArray.push(progressPercentage);
        }

        setMonthlyProgress(progressArray);
    };

    return (
        <div className="flex flex-col items-center justify-center p-12 space-y-8">
            <h1 className="text-5xl font-bold">Signup Bonus Calculator</h1>

            <div className="bg-base-200 p-8 rounded-lg shadow-md w-full max-w-lg space-y-6 text-left">
                <NumberInputBox
                    label='Spending Target'
                    value={localSpendingTarget}
                    setFn={setLocalSpendingTarget}
                    className="text-2xl"
                />
                <NumberInputBox
                    label='Monthly Spend'
                    value={localMonthlySpend}
                    setFn={setLocalMonthlySpend}
                    className="text-2xl"
                />

                {/* Time to goal with increased emphasis */}
                <p className="text-xl font-semibold mt-6">
                    <span className="mr-4">Time to goal:</span>
                    <span className="font-bold text-2xl">{timeToGoal} months</span>
                </p>

                <button className="btn btn-primary mt-4 w-full" onClick={() => {
                    resetContext();
                    setLocalSpendingTarget(''); // Reset local state
                    setLocalMonthlySpend('');   // Reset local state
                }}>
                    Reset
                </button>
            </div>

            {/* Display radial progress bars for each month */}
            <div className="flex flex-wrap justify-center space-x-4 mt-8">
                {monthlyProgress.map((progress, index) => (
                    <RadialProgress key={index} value={progress.toFixed(2)} label={`Month ${index + 1}`} />
                ))}
            </div>
        </div>
    );
}

export default function SignupBonusCalculator() {
    return (
        <SignupBonusCalculatorProvider>
            <SignupBonusCalculatorContent />
        </SignupBonusCalculatorProvider>
    );
}
