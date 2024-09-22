import React from 'react';

export const RadialProgress = ({ value, label }) => {
  // Ensure the value is within the range 0-100
  const progressValue = Math.max(0, Math.min(value, 100)).toFixed(2);

  return (
    <div className="flex flex-col items-center">
      <div className="radial-progress" style={{ "--value": progressValue }} role="progressbar" aria-valuenow={progressValue}>
        {progressValue}%
      </div>
      {label && <p>{label}</p>}
    </div>
  );
};
