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
        <div className="grow-mobile">
            {submittedProject ? (
                <div className="flex-cols center huge-text big-gap fill-height">
                    <h1>Success!</h1>
                    <Link
                        className="large-text medium-border blur input-padding margin-2 rounded"
                        href={`/project/${submittedProject?.id}`}
                    >
                        View Project
                    </Link>
                    <Link
                        className="large-text medium-border blur input-padding margin-2 rounded"
                        href="/"
                    >
                        Home
                    </Link>
                </div>
            ) : (
                <button
                    className="thick-border rounded-30 padding-3 hover-darken huge-text center fill blur transparent"
                    onClick={handleSubmit}
                >
                    {translate("form.submit", language)}
                </button>
            )}
        </div>
    );
}
