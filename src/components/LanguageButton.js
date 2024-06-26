"use client";

import Image from "next/image";
import { useLanguageContext } from "./LanguageProvider";

export default function LanguageButton({ scale }) {
    const { language, setLanguage } = useLanguageContext();

    const handleChangeLanguage = () => {
        const newLanguage = language === "en" ? "he" : "en";
        setLanguage(newLanguage);
        localStorage.setItem("language", newLanguage);
    };

    return (
        <Image
            onClick={handleChangeLanguage}
            className="hover-scale clickable"
            src="/icons/languages.svg"
            width={scale}
            height={scale}
            alt="language button"
        />
    );
}
