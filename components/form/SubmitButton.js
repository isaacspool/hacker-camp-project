import styles from "../../styles/Form.module.css";
import { translate } from "../../pages/index.js";

export function SubmitButton({ language, formAnswers }) {
    return (
        <div style={{ width: "40%" }}>
            <button
                className={[styles.box, styles.submitButton].join(" ")}
                onClick={() => {
                    if (projectName == "") {
                        setFormPage(0);
                    } else {
                        console.log(formAnswers);
                        router.push("/", { scroll: false });
                    }
                }}
            >
                {translate("form.submit", language)}
            </button>
        </div>
    );
}
