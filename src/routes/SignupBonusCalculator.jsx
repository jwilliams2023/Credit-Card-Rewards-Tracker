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
        localStorage.setItem('cards', JSON.stringify([...cards, newCard]));
        
        setCards(updatedCards);
        setCardCount(cardCount + 1);
        //e.preventDefault();
        setCustomCardName('');
        //setSpendingTarget(localSpendingTarget);
        //setMonthlySpend(localMonthlySpend);
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
        calculateTimeToGoal();
    }


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

    const getMonthLabel = (monthsFromNow) => {
        const today = new Date();
        today.setMonth(today.getMonth() + monthsFromNow); // Increment by monthsFromNow
        const options = { month: 'short', year: 'numeric' }; // Format: "Jan 2024"
        return today.toLocaleDateString('en-US', options);
    };


    return (
        <div className="flex flex-col items-center justify-center p-12 space-y-8">
            <h1 className="text-5xl font-bold">Signup Bonus Calculator</h1>

           
            <div className="bg-base-200 p-8 rounded-lg shadow-md w-full max-w-lg space-y-6 text-left">
                
                {/* Input for custom card name */}
                <div className="flex flex-col">
                    <label className="label text-lg font-semibold">Card Name</label>
                    <TextInputBox
                        value={customCardName}
                        onChange={(e) => setCustomCardName(e.target.value)}
                        className="input input-bordered text-xl w-full" // Ensuring uniform input style
                    />
                </div>
                
                <div className="flex flex-col">
                    <label className="label text-lg font-semibold">Spending Target</label>
                    <NumberInputBox
                        value={(localSpendingTarget)}
                        setFn={setLocalSpendingTarget}
                        className="input input-bordered text-xl w-full" // Consistent input style
                    />
                </div>
                
                <div className="flex flex-col">
                    <label className="label text-lg font-semibold">Monthly Spend</label>
                    <NumberInputBox
                        value={localMonthlySpend}
                        setFn={setLocalMonthlySpend}
                        className="input input-bordered text-xl w-full" // Consistent input style
                    />
                </div>

                {/* Time to goal with increased emphasis */}
                <p className="text-xl font-semibold mt-6">
                    <span className="mr-4">Time to goal:</span>
                    <span className="font-bold text-2xl">{timeToGoal} months</span>
                </p>
    
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
    
                <button className="btn btn-primary mt-4 w-full text-xl" onClick={() => {
                    resetContext();
                    setLocalSpendingTarget(''); 
                    setLocalMonthlySpend(''); 
                    setCustomCardName('');  
                }}>
                    Reset
                </button>
            </div>
                
            <div className="bg-base-200 p-8 rounded-lg shadow-md w-full max-w-lg space-y-6 text-center">
                 {/* Dropdown to select a card */}
                 <DropDownBox cards={cards} onSelectCard={handleCardSelect} />
            </div> 

            {/* Heading for Visual Progress */}
            <h2 className="text-2xl font-semibold mt-8">Visual Progress</h2>   

            {/* Display radial progress bars for each month */}
            <div className="flex flex-wrap justify-center space-x-6 mt-8">
                {monthlyProgress.map((progress, index) => (
                    <div className="bg-base-200 rounded-lg shadow-md w-1/4 m-2 p-10" key={index}>
                    <RadialProgress 
                        key={index} 
                        value={progress.toFixed(2)} 
                        label={getMonthLabel(index)} 
                        isComplete = { index === monthlyProgress.length - 1 }
                    />
                    </div>
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
