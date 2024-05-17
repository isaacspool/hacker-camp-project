export function LanguageButton({ language, setLanguage }) {
    const handleChangeLanguage = () => {
        const newLanguage = language === "en" ? "hebrew" : "en";
        setLanguage(newLanguage);
        localStorage.setItem("language", newLanguage);
    };
    return (
        <button
            onClick={handleChangeLanguage}
            style={{
                position: "fixed",
                right: "0",
                top: "1%",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                zIndex: 100,
            }}
        >
            <img src="/language_button.svg" width="40" height="40" />
        </button>
    );
}
