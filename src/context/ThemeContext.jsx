import React, { useState, createContext } from 'react';

export const ThemeContext = createContext(null);

export function ThemeProvider(props) {
    const [theme, setTheme] = useState('dark');

    const contextValues = {
        theme,
        setTheme
    };

    return (
        <ThemeContext.Provider value={contextValues}>
            {props.children}
        </ThemeContext.Provider>
    );
};