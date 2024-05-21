import styles from "../styles/Home.module.css";

export function LanguageButton({ language, setLanguage }) {
    const handleChangeLanguage = () => {
        const newLanguage = language === "en" ? "he" : "en";
        setLanguage(newLanguage);
        localStorage.setItem("language", newLanguage);
    };

    return (
        <button
            onClick={handleChangeLanguage}
            className={styles.languageButton}
        >
            <img src="/icons/languages.svg" width="40" height="40" />
        </button>
    );
}
