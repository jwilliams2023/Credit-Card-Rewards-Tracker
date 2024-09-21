import React from 'react';

export default function NumberInputBox({label, value, setFn}) {
    return (
        <div className='flex items-center space-x-4'>
            <label className="block mb-2 text-nowrap">{label}</label>
            <input
                className="input input-bordered input-primary w-full max-w-xs"
                type="number"
                value={value}
                onChange={(e) => setFn(e.target.value)}
                />
            
        </div>
    );
};