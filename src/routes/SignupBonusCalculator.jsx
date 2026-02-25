import React, { useContext, useEffect, useState } from 'react';
import { SignupBonusCalculatorProvider, SignupBonusCalculatorContext } from '../context/SignupBonusCalculatorContext';
// import NumberInputBox from '../components/NumberInputBox';
// import TextInputBox from '../components/TextInputBox';
import { RadialProgress } from '../components/RadialProgress';
import useDebounce from '../hooks/useDebounce';
import Modal from '../components/Modal';
// import HelperDropdown from '../components/DropDownHelper';
import { ThemeContext } from '../context/ThemeContext';

function SignupBonusCalculatorContent() {
    const { theme } = useContext(ThemeContext);
    const isDarkMode = theme === 'dark';

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

    const [isModalOpen, setIsModalOpen] = useState(false);

    const addCard = (card) => {
        const cardName = customCardName || `Card ${cardCount}`;
        const newCard = {
            cardName,
            spendingTarget,
            monthlySpend,
            timeToGoal : Number(timeToGoal) || 0,
        };

        let updatedCards = [...cards, newCard];
        localStorage.setItem('cards', JSON.stringify(updatedCards));

        setCards(updatedCards);
        setCardCount(cardCount + 1);
        setCustomCardName('');
    };

    useEffect(() => {
        const storedCards = JSON.parse(localStorage.getItem('cards') || '[]');
        if (storedCards && storedCards.length > 0) {
            setCards(storedCards);
        }
    }, []);

    const handleCardSelect = (card) => {
        setCustomCardName(card.cardName);
        setSpendingTarget(card.spendingTarget);
        setMonthlySpend(card.monthlySpend);
        setLocalMonthlySpend(card.monthlySpend);
        setLocalSpendingTarget(card.spendingTarget);
        calculateTimeToGoal();
    }

    const handleDeleteCard = (index) => {
        const updatedCards = cards.filter((_, i) => i !== index);
        setCards(updatedCards);
        localStorage.setItem('cards', JSON.stringify(updatedCards));
    };

    // Local states for input to apply debouncing
    const [localSpendingTarget, setLocalSpendingTarget] = useState(spendingTarget);
    const [localMonthlySpend, setLocalMonthlySpend] = useState(monthlySpend);

    // Debounced values
    const debouncedSpendingTarget = useDebounce(localSpendingTarget, 300);
    const debouncedMonthlySpend = useDebounce(localMonthlySpend, 300);

    useEffect(() => {
        if (debouncedSpendingTarget > 0 && debouncedMonthlySpend > 0) {
            setSpendingTarget(debouncedSpendingTarget);
            setMonthlySpend(debouncedMonthlySpend);
            calculateTimeToGoal();
        } else {
            setTimeToGoal(0);
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
        const options = { month: 'long', year: 'numeric' };
        return today.toLocaleDateString('en-US', options);
    };

    // Safe formatting function to avoid errors with undefined values
    const formatCurrency = (value) => {
        if (value === undefined || value === null) return "$0";
        return `$${Number(value).toLocaleString()}`;
    };

    return (
        <div className={`min-h-screen p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
            {/* Modal pop up */}
            <Modal
                title="Welcome to the Sign Up Bonus Calculator!"
                content="This tool helps you track your spending progress toward earning credit card bonuses. 
                Enter your spending target and monthly spend to calculate how long it will take to reach your goal."
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            <h1 className="text-2xl font-bold mb-6 text-center">Sign Up Bonus Calculator</h1>

            {/* Calculator */}
            <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 bg-opacity-60' : 'bg-white'} max-w-lg mx-auto`}>
                <div className="grid gap-8">
                    {/* Input for custom card name */}
                    <div>
                        <label className={`text-sm mb-1 block ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Card Name</label>
                        <input
                            type="text"
                            value={customCardName}
                            onChange={(e) => setCustomCardName(e.target.value)}
                            placeholder="e.g. Chase Sapphire Preferred"
                            className={`w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-900 text-white border-gray-700' : 'bg-gray-100 text-gray-800 border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                    </div>

                    {/* Spending target input */}
                    <div>
                        <label className={`text-sm mb-1 block ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Spending Target</label>
                        <input
                            type="text"
                            value={localSpendingTarget}
                            onChange={(e) => setLocalSpendingTarget(e.target.value)}
                            placeholder="e.g. 4000"
                            className={`w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-900 text-white border-gray-700' : 'bg-gray-100 text-gray-800 border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                    </div>

                    {/* Monthly spend input */}
                    <div>
                        <label className={`text-sm mb-1 block ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Monthly Spend</label>
                        <input
                            type="text"
                            value={localMonthlySpend}
                            onChange={(e) => setLocalMonthlySpend(e.target.value)}
                            placeholder="e.g. 1000"
                            className={`w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-900 text-white border-gray-700' : 'bg-gray-100 text-gray-800 border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                    </div>

                    {/* Buttons row - just Add Card and Reset */}
                    <div className="flex justify-between items-stretch mt-4 w-full gap-4">
                        <button 
                            className="flex-1 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-md md:text-lg"
                            style={{ backgroundColor: '#6366F1' }}
                            onClick={() => {
                                addCard({
                                    cardName: customCardName || `Card ${cardCount}`,
                                    spendingTarget,
                                    monthlySpend,
                                    timeToGoal,
                                });
                            }}
                        >
                            Add Card
                        </button>
                        
                        <button 
                            className="flex-1 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-md md:text-lg"
                            style={{ backgroundColor: '#6366F1' }}
                            onClick={() => {
                                resetContext();
                                setLocalSpendingTarget(''); 
                                setLocalMonthlySpend(''); 
                                setCustomCardName('');  
                            }}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            {/* Time to Goal Box */}
            {spendingTarget > 0 && monthlySpend > 0 && timeToGoal > 0 && (
                <div className={`mt-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-lg max-w-lg mx-auto`}>
                    <div className="flex justify-between items-center">
                        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Time to Goal</div>
                        <div className="text-2xl font-bold text-green-500">
                            {Number.isInteger(timeToGoal) ? timeToGoal : timeToGoal.toFixed(1)} {timeToGoal === 1 ? 'month' : 'months'}
                        </div>
                    </div>
                </div>
            )}

            {/* Visual Progress */}
            {spendingTarget > 0 && monthlySpend > 0 && timeToGoal > 0 && (
                <div className="mt-8">
                    <h2 className={`text-xl font-semibold ml-2 mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Visual Progress</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {monthlyProgress.map((progress, index) => (
                            <div 
                                key={index} 
                                className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg flex flex-col items-center justify-between`}
                            >
                                <RadialProgress
                                    value={progress.toFixed(2)}
                                    label={`By ${getMonthLabel(index)}`}
                                    isComplete={index === monthlyProgress.length - 1}
                                    className="my-2"
                                />
                                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-2`}>
                                    {formatCurrency(monthlySpend * (index + 1))} of {formatCurrency(spendingTarget)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Saved Cards */}
            {cards.length > 0 && (
                <div className="mt-8">
                    <h2 className={`text-xl font-semibold ml-2 mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Saved Cards</h2>
                    <div className="w-full overflow-hidden">
                        {cards.map((card, index) => (
                            <div key={index} className={`mb-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
                                <div className="grid grid-cols-6 w-full">
                                    <div className="p-4 col-span-2">
                                        <div className="font-semibold">{card.cardName || 'Unnamed Card'}</div>
                                    </div>
                                    <div className="p-4">
                                        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Target</div>
                                        <div className="text-green-500">{formatCurrency(card.spendingTarget)}</div>
                                    </div>
                                    <div className="p-4">
                                        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Monthly</div>
                                        <div>{formatCurrency(card.monthlySpend)}</div>
                                    </div>
                                    <div className="p-4 col-span-2 flex items-center justify-end gap-2">
                                        <button 
                                            onClick={() => handleCardSelect(card)} 
                                            className="py-2 px-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg"
                                            style={{ backgroundColor: '#6366F1' }}
                                        >
                                            Load
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteCard(index)} 
                                            className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
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