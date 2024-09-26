import React from 'react';

export default function TextInputBox({label, value, onChange}) {
    return (
        <div className='flex items-center space-x-4'>
            <label className="block mb-2 text-nowrap">{label}</label>
            <input
                className="input input-bordered input-primary w-full max-w-xs"
                type="text"
                value={value}
                onChange={onChange}
                />
            
        </div>
    );
};