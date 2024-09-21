import React, { useState, createContext } from 'react';

const SignupBonusCalculatorContext = createContext(null);

function SignupBonusCalculatorProvider(props) {
    const [spendingTarget, setSpendingTarget] = useState(0);
    const [monthlySpend, setMonthlySpend] = useState(0);
    const [timeToGoal, setTimeToGoal] = useState(0);

    function resetContext(){
        setSpendingTarget(0);
        setMonthlySpend(0);
        setTimeToGoal(0);
    }

    function calculateTimeToGoal() {
        if (monthlySpend > 0) {
            setTimeToGoal(spendingTarget / monthlySpend);
        } else {
            setTimeToGoal(0);
        };
    };

    const contextValues = {
        spendingTarget,
        setSpendingTarget,
        monthlySpend,
        setMonthlySpend,
        timeToGoal,
        calculateTimeToGoal,
        resetContext
    };

    return (
        <SignupBonusCalculatorContext.Provider value={contextValues}>
            {props.children}
        </SignupBonusCalculatorContext.Provider>
    );
}

export { SignupBonusCalculatorProvider, SignupBonusCalculatorContext };