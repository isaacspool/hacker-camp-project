"use client";

import { useLanguageContext } from "./LanguageProvider";

export default function LanguageButton() {
    const { language, setLanguage } = useLanguageContext();

    const handleChangeLanguage = () => {
        const newLanguage = language === "en" ? "he" : "en";
        setLanguage(newLanguage);
        localStorage.setItem("language", newLanguage);
    };

    return (
        <img
            onClick={handleChangeLanguage}
            className="hover-scale clickable"
            src="/icons/languages.svg"
            width="40"
            height="40"
        />
    );
}
