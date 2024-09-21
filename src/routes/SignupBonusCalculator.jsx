import React, { useContext, useEffect } from 'react';
import { 
    SignupBonusCalculatorProvider, 
    SignupBonusCalculatorContext 
    } from '../context/SignupBonusCalculatorContext';
import NumberInputBox from '../components/NumberInputBox';


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
    
    useEffect(() => {
        calculateTimeToGoal();
    }, [spendingTarget, monthlySpend]);

    return (
        <div className='flex items-center justify-center'>
            <div className='flex-col space-y-4'>
                <h1 className='text-2xl font-bold mb-4'>Signup Bonus Calculator</h1>
                <NumberInputBox label='Spending Target' value={spendingTarget} setFn={setSpendingTarget} />
                <NumberInputBox label='Monthly Spend' value={monthlySpend} setFn={setMonthlySpend} />
                <p>Time to goal: {timeToGoal} months</p>
                <button className='btn' onClick={resetContext}>Reset</button>
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