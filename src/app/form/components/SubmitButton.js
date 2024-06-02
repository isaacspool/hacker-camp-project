import styles from "@/styles/Form.module.css";
import { translate } from "@/lib/translation";
import { useFormPageContext } from "./FormPageProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function SubmitButton({ language, formAnswers, submitAction }) {
    const { formPage, setFormPage } = useFormPageContext();
    const router = useRouter();
    const [submittedProject, setSubmittedProject] = useState(null);
    const handleSubmit = async () => {
        if (formAnswers.name) {
            await submitAction(formAnswers).then((project) =>
                setSubmittedProject(project)
            );
        } else {
            console.log(formAnswers);
            setFormPage(0);
        }
    };
    const returnToHome = () => {
        router.push("/", { scroll: false });
    };

    const handleKeyPress = (e) => {
        if (e.key == "Enter") {
            handleSubmit();
        }
    };
    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, []);
    return (
        <div style={{ width: "40%" }}>
            {submittedProject ? (
                <div className={styles.submitDoneContainer}>
                    <h1>Success!</h1>
                    <Link
                        className={styles.submitDoneLink}
                        href={`/project/${submittedProject?.id}`}
                    >
                        View Project
                    </Link>
                    <Link className={styles.submitDoneLink} href="/">
                        Home
                    </Link>
                </div>
            ) : (
                <button
                    className={[styles.box, styles.submitButton].join(" ")}
                    onClick={handleSubmit}
                >
                    {translate("form.submit", language)}
                </button>
            )}
        </div>
    );
}
