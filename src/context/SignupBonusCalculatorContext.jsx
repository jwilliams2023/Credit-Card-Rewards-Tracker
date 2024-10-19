import React, { useState, createContext } from 'react';

const SignupBonusCalculatorContext = createContext(null);

function SignupBonusCalculatorProvider(props) {
    const [spendingTarget, setSpendingTarget] = useState("");
    const [monthlySpend, setMonthlySpend] = useState("");
    const [timeToGoal, setTimeToGoal] = useState(undefined);
    const [monthlyProgress, setMonthlyProgress] = useState([]);
    const [customCardName, setCustomCardName] = useState('');


    function resetContext(){
        setSpendingTarget('');
        setMonthlySpend('');
        setTimeToGoal(undefined);
        setMonthlyProgress([]);
        setCustomCardName('');
    }

    function calculateTimeToGoal() {
        // Convert empty strings to 0 for calculation purposes
        const target = parseFloat(spendingTarget) || 0;
        const monthly = parseFloat(monthlySpend) || 0;

        // Log the values of spendingTarget and monthlySpend to debug the issue
        console.log("spendingTarget:", spendingTarget);
        console.log("monthlySpend:", monthlySpend);

        if (monthly > 0 && target > 0) {
            // Log the result of the division before setting the state
            console.log("Calculated timeToGoal:", target / monthly);
            const calculatedTime = target / monthly;
            setTimeToGoal(calculatedTime);  // Ensure division is correct here 
        } else {
            setTimeToGoal(undefined);
        }
    }

    // Log when the spending target or monthly spend is updated
    const handleSpendingTargetChange = (value) => {
        console.log("Setting spendingTarget to:", value);
        setSpendingTarget(value);
    }

    const handleMonthlySpendChange = (value) => {
        console.log("Setting monthlySpend to:", value);
        setMonthlySpend(value);
    }

    const contextValues = {
        spendingTarget,
        setSpendingTarget: handleSpendingTargetChange,  // Use wrapper to log changes
        monthlySpend,
        setMonthlySpend: handleMonthlySpendChange,  // Use wrapper to log changes
        timeToGoal,
        setTimeToGoal,
        calculateTimeToGoal,
        resetContext,
        monthlyProgress,
        setMonthlyProgress,
        customCardName,
        setCustomCardName
    };

    return (
        <SignupBonusCalculatorContext.Provider value={contextValues}>
            {props.children}
        </SignupBonusCalculatorContext.Provider>
    );
}

export { SignupBonusCalculatorProvider, SignupBonusCalculatorContext };
