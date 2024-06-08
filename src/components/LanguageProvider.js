"use client";

import { createContext, useContext, useState, useLayoutEffect } from "react";

const LanguageContext = createContext("en");
export const useLanguageContext = () => useContext(LanguageContext);

export default function LanguageProvider({ children }) {
    const [language, setLanguage] = useState("en");
    useLayoutEffect(() => {
        setLanguage(localStorage.getItem("language") || "en");
    }, []);
    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}
