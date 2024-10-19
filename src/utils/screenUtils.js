// utils/screenUtils.js
import { useEffect, useState } from 'react';

export function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Set the initial value
        handleResize();

        // Add resize event listener
        window.addEventListener('resize', handleResize);

        // Clean up event listener
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile;
}