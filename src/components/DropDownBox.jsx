import React from 'react';

const DropDownBox = ({ cards, onSelectCard}) => {
    return (
        <div className="dropdown dropdown-right mb-4"> {/* Added margin bottom for spacing */}
            <div tabIndex={0} role="button" className="btn btn-primary m-1 flex items-center"> {/* Flex to align items */}
                Saved Cards
                <svg
                    width="12px"
                    height="12px"
                    className="inline-block h-2 w-2 fill-current opacity-60 ml-2" // Add margin left for spacing
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 2048 2048">
                    <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                </svg>
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-full p-2 shadow">
                {cards.length > 0 ? (
                    cards.map((card, index) => (
                        <li key={index} onClick={() => onSelectCard(card)}>
                            <a>{card.cardName}</a>
                        </li>
                    ))
                ) : (
                    <li>
                        <a>No cards available</a>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default DropDownBox;