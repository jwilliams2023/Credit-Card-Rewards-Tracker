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
        const target = parseFloat(spendingTarget) || 0;
        const monthly = parseFloat(monthlySpend) || 0;

        if (monthly > 0 && target > 0) {
            const calculatedTime = target / monthly;
            setTimeToGoal(calculatedTime);
        } else {
            setTimeToGoal(undefined);
        }
    }

    const contextValues = {
        spendingTarget,
        setSpendingTarget,
        monthlySpend,
        setMonthlySpend,
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
