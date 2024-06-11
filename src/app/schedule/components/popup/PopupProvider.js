"use client";

import { createContext, useContext, useState, useEffect } from "react";

const PopupContext = createContext({});
export const usePopupContext = () => useContext(PopupContext);

export default function PopupProvider({ children, initValue }) {
    const [displayValue, setDisplayValue] = useState(initValue);
    useEffect(() => {
        setDisplayValue(initValue);
    }, [initValue]);
    return (
        <PopupContext.Provider value={{ displayValue, setDisplayValue }}>
            {children}
        </PopupContext.Provider>
    );
}
