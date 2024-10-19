import React, { useContext, useEffect, useState } from 'react';
import { SignupBonusCalculatorProvider, SignupBonusCalculatorContext } from '../context/SignupBonusCalculatorContext';
import NumberInputBox from '../components/NumberInputBox';
import TextInputBox from '../components/TextInputBox';
import { RadialProgress } from '../components/RadialProgress';
import useDebounce from '../hooks/useDebounce';
import DropDownBox from '../components/DropDownBox';

function SignupBonusCalculatorContent() {
    const {
        spendingTarget,
        setSpendingTarget,
        monthlySpend,
        setMonthlySpend,
        timeToGoal,
        setTimeToGoal,
        calculateTimeToGoal,
        resetContext,
        monthlyProgress,
        setMonthlyProgress
    } = useContext(SignupBonusCalculatorContext);

    const [cardCount, setCardCount] = useState(1);
    const [customCardName, setCustomCardName] = useState('');
    const [cards, setCards] = useState([]);

    const addCard = (card) => { // Add a card to the list
        const cardName = customCardName || `Card ${cardCount}`;
        const newCard = { 
            cardName, 
            spendingTarget, 
            monthlySpend, 
            timeToGoal 
        };

        let updatedCards = [...cards, newCard];
        localStorage.setItem('cards', JSON.stringify(updatedCards));
        
        setCards(updatedCards);
        setCardCount(cardCount + 1);
        setCustomCardName('');
    };

    useEffect(() => {
        const storedCards = JSON.parse(localStorage.getItem('cards'));
        if (storedCards) {
            setCards(storedCards);
        }
    }, []);

    const handleCardSelect = (card) => {   // Select a card from the list
        setCustomCardName(card.cardName);
        setSpendingTarget(card.spendingTarget);
        setMonthlySpend(card.monthlySpend);
        setLocalMonthlySpend(card.monthlySpend);
        setLocalSpendingTarget(card.spendingTarget);
        calculateTimeToGoal();
    }

    // Local states for input to apply debouncing
    const [localSpendingTarget, setLocalSpendingTarget] = useState(spendingTarget);
    const [localMonthlySpend, setLocalMonthlySpend] = useState(monthlySpend);

    // Debounced values
    const debouncedSpendingTarget = useDebounce(localSpendingTarget, 300);
    const debouncedMonthlySpend = useDebounce(localMonthlySpend, 300);

    // Trigger calculations after debounced values are ready
    useEffect(() => {
        if (debouncedSpendingTarget > 0 && debouncedMonthlySpend > 0) {
            setSpendingTarget(debouncedSpendingTarget);
            setMonthlySpend(debouncedMonthlySpend);
        } else {
            setTimeToGoal(undefined);
        }
    }, [debouncedSpendingTarget, debouncedMonthlySpend]);

    useEffect(() => {
        if (spendingTarget > 0 && monthlySpend > 0) {
            calculateTimeToGoal();
        }
    }, [spendingTarget, monthlySpend]);

    useEffect(() => {
        if (timeToGoal > 0) {
            calculateMonthlyProgress();
        }
    }, [timeToGoal]);

    const calculateMonthlyProgress = () => {
        if (spendingTarget <= 0 || monthlySpend <= 0) {
            setMonthlyProgress([]);
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

    const getMonthLabel = (monthsFromNow) => {
        const today = new Date();
        today.setMonth(today.getMonth() + monthsFromNow);
        const options = { month: 'short', year: 'numeric' };
        return today.toLocaleDateString('en-US', options);
    };

    return (
        <div className="flex flex-col items-center justify-center p-12 space-y-8">
            <h1 className="text-2xl font-bold ">Sign Up Bonus Calculator</h1>

            <div className="bg-base-300 p-8 rounded-lg shadow-md w-full max-w-lg space-y-6 text-left">
                {/* Input for custom card name */}
                <div className="flex flex-col">
                    <label className="label text-sm font-semibold">Card Name</label>
                    <TextInputBox
                        value={customCardName}
                        onChange={(e) => setCustomCardName(e.target.value)}
                        className="input input-bordered text-xl w-full"
                    />
                </div>
                {/* Spending target input */}
                <div className="flex flex-col">
                    <label className="label text-sm font-semibold">Spending Target</label>
                    <NumberInputBox
                        value={localSpendingTarget}
                        setFn={setLocalSpendingTarget}
                        className="input input-bordered text-xl w-full"
                    />
                </div>
                {/* Monthly spend input */}
                <div className="flex flex-col">
                    <label className="label text-sm font-semibold">Monthly Spend</label>
                    <NumberInputBox
                        value={localMonthlySpend}
                        setFn={setLocalMonthlySpend}
                        className="input input-bordered text-xl"
                    />
                </div>

                {/* Time to goal */}
                <p className="text-sm font-semibold mt-6">
                    <span className="mr-4">Time to goal:</span>
                    {spendingTarget > 0 && monthlySpend > 0 && timeToGoal > 0 ? (
                        <span className="font-bold text-xl"> {timeToGoal} {timeToGoal < 2 ? 'month' : 'months'}</span>
                    ) : (
                        <span className="font-bold text-2xl">---</span>
                    )}
                </p>

                {/* Add card button */}
                <button className="btn btn-primary mt-4 w-full text-xl" onClick={() => {
                    addCard({
                        cardName: customCardName || `Card ${cardCount}`,
                        spendingTarget,
                        monthlySpend,
                        timeToGoal
                    });
                }}>
                    Add Card
                </button>
                {/* Reset button */}
                <button className="btn btn-primary mt-4 w-full text-xl" onClick={() => {
                    resetContext();
                    setLocalSpendingTarget(''); 
                    setLocalMonthlySpend(''); 
                    setCustomCardName('');  
                }}>
                    Reset Values
                </button>

                {/* Dropdown button for saved cards */}
                <DropDownBox
                    buttonLabel="Saved Cards"
                    dropdownItems={cards.map((card) => ({ label: card.cardName, value: card }))}
                    onItemSelect={(item) => handleCardSelect(item.value)}
                />
            </div>

            {/* Heading for Visual Progress */}
            {spendingTarget > 0 && monthlySpend > 0 && timeToGoal > 0 && (
                <>
                    <h2 className="text-2xl font-bold">Visual Progress</h2>
                    {/* Display radial progress radials for each month */}
                    <div className="flex flex-wrap justify-center mt-8">
                        {monthlyProgress.map((progress, index) => (
                            <div className="progress-container bg-base-300 rounded-lg shadow-md w-1/3 m-2 p-8 flex flex-col items-center justify-between" key={index}>
                                <RadialProgress
                                    key={index}
                                    value={progress.toFixed(2)}
                                    label={getMonthLabel(index)}
                                    isComplete={index === monthlyProgress.length - 1}
                                />
                            </div>
                        ))}
                    </div>
                </>
            )}
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
