import styles from "../../styles/Form.module.css";
import { translate } from "../../pages/index.js";

export function NamePage({ value, setValue, language }) {
    return (
        <input
            type="text"
            placeholder={translate("form.project_name", language)}
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
