"use client";

import { createContext, useContext, useState } from "react";

const YearContext = createContext({});
export const useYearContext = () => useContext(YearContext);

export default function YearProvider({ children, defaultYear }) {
    const [year, setYear] = useState(defaultYear);
    return (
        <YearContext.Provider value={{ year, setYear }}>
            {children}
        </YearContext.Provider>
    );
}
