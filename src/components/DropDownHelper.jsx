import React, { useState, useEffect } from 'react';
import Modal from './Modal';

const HelperDropdown = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Effect to show modal only once per session (initial open)
    useEffect(() => {
        if (!sessionStorage.getItem('modalShown')) {
            setIsModalOpen(true);
            sessionStorage.setItem('modalShown', 'true');
        }
    }, []);

    // Function to open the modal when clicking the helper button
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    return (
        <div>
            {/* Info button for helper */}
            <div className="dropdown dropdown-end">
                <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-circle btn-ghost btn-xs text-info"
                    onClick={handleOpenModal}  // Manually open the modal
                >
                    <svg
                        tabIndex={0}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="h-4 w-4 stroke-current"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                    </svg>
                </div>
            </div>

            {/* Modal */}
            <Modal
                title="About This Calculator"
                content="The Sign Up Bonus Calculator helps you track your spending progress towards earning credit card bonuses. 
                Enter your spending target and monthly spend to calculate how long it will take to reach your goal."
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}  // Close the modal
            />
        </div>
    );
};

export default HelperDropdown;
