import styles from "@/styles/Form.module.css";
import { translate } from "@/lib/translation";
import { useFormPageContext } from "./FormPageProvider";
import { useRouter } from "next/navigation";

export default function SubmitButton({ language, formAnswers, submitAction }) {
    const { formPage, setFormPage } = useFormPageContext();
    const router = useRouter();
    return (
        <div style={{ width: "40%" }}>
            <button
                className={[styles.box, styles.submitButton].join(" ")}
                onClick={async () => {
                    if (formAnswers.projectName == "") {
                        setFormPage(0);
                    } else {
                        await submitAction(formAnswers).then((_) =>
                            router.push("/", { scroll: false })
                        );
                    }
                }}
            >
                {translate("form.submit", language)}
            </button>
        </div>
    );
}
