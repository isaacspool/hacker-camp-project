import styles from "../styles/Form.module.css";

export function Checkbox({ children, checked, setChecked }) {
    const handleClick = () => setChecked();
    return (
        <label className={styles.checkbox}>
            <button type="button" onClick={handleClick}>
                {checked ? (
                    <img src="/check.svg" style={{ pointerEvents: "none" }} />
                ) : (
                    " "
                )}
            </button>
            {children}
        </label>
    );
}
