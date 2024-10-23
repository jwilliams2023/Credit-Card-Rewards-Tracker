import React from 'react';

export const RadialProgress = ({ value, label, isComplete }) => {
  // Ensure the value is within the range 0-100
  const progressValue = Math.max(0, Math.min(value, 100));
  return (
    <div className="flex flex-col items-center">
      <div 
        className={`radial-progress text-primary ${isComplete ? "text-green" : "text-primary"}`} 
        style={{ "--value": progressValue, "--size": "8rem", "--thickness": ".7rem" }} 
        role="progressbar" 
        aria-valuenow={progressValue}
      >
        {/* If progressValue is an integer, display without decimals; otherwise, use two decimal places */}
        {Number.isInteger(progressValue) ? progressValue : progressValue.toFixed(2)}%
      </div>
      {label && <p className="mt-4">{label}</p>}
    </div>
  );
};
