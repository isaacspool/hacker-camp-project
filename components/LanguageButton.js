export function LanguageButton({ language, setLanguage }) {
    const handleChangeLanguage = () => {
        setLanguage(language === "en" ? "hebrew" : "en");
    };
    return (
        <button
            onClick={handleChangeLanguage}
            style={{
                position: "fixed",
                right: "3%",
                top: "6%",
                background: "transparent",
                border: "none",
                cursor: "pointer",
            }}
        >
            <img src="/language_button.svg" />
        </button>
    );
}
