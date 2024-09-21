import React from 'react';

export default function NumberInputBox({label, value, setFn}) {
    return (
        <div className='flex intems-center space-x-4'>
            <label className="block mb-2">{label}</label>
            <input
                type="number"
                value={value}
                onChange={(e) => setFn(e.target.value)}/>
        </div>
    );
};