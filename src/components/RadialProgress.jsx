import React from 'react';

export const RadialProgress = ({ value, label, isComplete }) => {
  // Ensure the value is within the range 0-100
  const progressValue = Math.max(0, Math.min(value, 100)).toFixed(2);

  return (
    <div className="flex flex-col items-center">
      <div 
         className={`radial-progress text-primary ${isComplete ? "text-gold" : "text-primary"}`} 
        style={{ "--value": progressValue, "--size": "8rem", "--thickness": ".7rem" }} 
        role="progressbar" 
        aria-valuenow={progressValue}
      >
        {progressValue}%
      </div>
      {label && <p>{label}</p>}
    </div>
  );
};
