"use client";

import { useLanguageContext } from "@/components/LanguageProvider";
import { translate } from "@/lib/translation";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import styles from "@/styles/Login.module.css";

export default function LoginInput({ handleLogin }) {
    const [state, formAction] = useFormState(handleLogin, { message: null });
    const { pending } = useFormStatus();

    const language = useLanguageContext();

    return (
        <form
            action={formAction}
            className={styles.formContainer}
            style={{ gap: "5%" }}
        >
            <div className={styles.formContainer}>
                <label className={styles.formLabel} htmlFor="name_input">
                    {translate("login.request.name", language)}
                </label>
                <input
                    className={styles.formInput}
                    type="text"
                    name="name"
                    id="name_input"
                    autoComplete="false"
                    required
                />
            </div>
            <div className={styles.formContainer}>
                <label className={styles.formLabel} htmlFor="secret_input">
                    {translate("login.request.secret", language)}
                </label>
                <input
                    className={styles.formInput}
                    type="password"
                    name="secret"
                    id="secret_input"
                    required
                />
            </div>
            <button
                className={styles.submit}
                type="submit"
                aria-disabled={pending}
            >
                Login
            </button>
            <p role="status">{state?.message}</p>
        </form>
    );
}
