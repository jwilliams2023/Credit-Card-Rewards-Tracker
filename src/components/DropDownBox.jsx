import React, { useState } from 'react';

const DropDownBox = ({ buttonLabel = "Dropdown", dropdownItems = [], onItemSelect }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleItemClick = (item) => {
        onItemSelect(item);
        setIsDropdownOpen(false); // Close dropdown after selection
    };

    return (
        <div className="dropdown dropdown-hover mb-4 relative">
            <button
                onClick={toggleDropdown}
                className="btn btn-primary m-1 flex items-center text-lg"
            >
                {buttonLabel}
                <svg
                    width="12px"
                    height="12px"
                    className="inline-block h-2 w-2 fill-current opacity-60 ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 2048 2048"
                >
                    <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                </svg>
            </button>
            {isDropdownOpen && (
                <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-300 rounded-box shadow-md p-3 z-[1] w-64 mt-4 "
                >
                    {dropdownItems.length > 0 ? (
                        dropdownItems.map((item, index) => (
                            <li key={index} onClick={() => handleItemClick(item)}>
                                <a className="whitespace-nowrap">{item.label}</a>
                            </li>
                        ))
                    ) : (
                        <li>
                            <a>No items available</a>
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default DropDownBox;
