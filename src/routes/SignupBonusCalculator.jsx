import React, { useState, useContext } from 'react';
import { SignupBonusCalculatorState } from '../context/SignupBonusCalculator/SignupBonusCalculatorState';
import { SignupBonusCalculatorContext } from '../context/SignupBonusCalculator/SignupBonusCalculatorContext';

export default function SignupBonusCalculator() {
    const {
        spendingTarget,
        setSpendingTarget,
        monthlySpend,
        setMonthlySpend,
        timeToGoal,
        calculateTimeToGoal,
        resetContext
    } = useContext(SignupBonusCalculatorContext);

    return (
        <div>
            <h1>Signup Bonus Calculator</h1>
            <label>
                Spending Target:
                <input
                    type="number"
                    value={spendingTarget}
                    onChange={(e) => setSpendingTarget(e.target.value)}
                />
            </label>
            <label>
                Monthly Spend:
                <input
                    type="number"
                    value={monthlySpend}
                    onChange={(e) => setMonthlySpend(e.target.value)}
                />
            </label>
            <button onClick={calculateTimeToGoal}>Calculate</button>
            <button onClick={resetContext}>Reset</button>
            <p>Time to goal: {timeToGoal} months</p>
       </div>
    )
}