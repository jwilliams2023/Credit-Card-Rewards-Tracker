import React, { useEffect, useRef } from 'react';

const Modal = ({ title, content, isOpen, onClose }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        if (modalRef.current) {
            if (isOpen) {
                modalRef.current.showModal(); // Show the modal when isOpen is true
            } else {
                modalRef.current.close(); // Close the modal when isOpen is false
            }
        }
    }, [isOpen]);

    const handleBackdropClick = (event) => {
        if (event.target === modalRef.current) {
            onClose();
        }
    };

    return (
        <dialog
            ref={modalRef}
            className="modal"
            onClick={handleBackdropClick}
        >
            <div className="modal-box">
                {title && <h3 className="font-bold text-lg">{title}</h3>}
                {content && <p className="py-4">{content}</p>}
                <button
                    className="btn btn-primary mt-4 md:text-lg text-md"
                    onClick={onClose}
                >
                    Try out the Sign Up Bonus Calculator
                </button>
            </div>
        </dialog>
    );
};

export default Modal;
