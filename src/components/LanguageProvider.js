"use client";

import { createContext, useContext, useState, useLayoutEffect } from "react";
import LanguageButton from "./LanguageButton";

const LanguageContext = createContext("en");
export const useLanguageContext = () => useContext(LanguageContext);

export default function LanguageProvider({ children }) {
    const [language, setLanguage] = useState("en");
    useLayoutEffect(() => {
        setLanguage(localStorage.getItem("language") || "en");
    }, []);
    return (
        <LanguageContext.Provider value={language}>
            <LanguageButton language={language} setLanguage={setLanguage} />
            {children}
        </LanguageContext.Provider>
    );
}
