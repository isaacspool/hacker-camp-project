import styles from "../../styles/Form.module.css";

export function NamePage({ value, setValue, language }) {
    return (
        <input
            type="text"
            placeholder={language == "hebrew" ? "שם הפרוייקט" : "Project Name"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={styles.thickBorder}
            style={{
                padding: 20,
                fontSize: 40,
                width: "100%",
                background: "transparent",
                backdropFilter: "blur(5px)",
            }}
        />
    );
}
