"use client";

import { useLanguageContext } from "@/components/LanguageProvider";
import { translate } from "@/lib/translation";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";

export default function LoginInput({ handleLogin }) {
    const [state, formAction] = useFormState(handleLogin, { message: null });
    const { pending } = useFormStatus();

    const { language, _ } = useLanguageContext();

    return (
        <form
            action={formAction}
            className="flex-cols margin-center center-all medium-gap padding-2 half-height"
            style={{ gap: "5%" }}
        >
            <div className="min-content">
                <label className="medium-text" htmlFor="name_input">
                    {translate("login.request.name", language)}
                </label>
                <input
                    className="input-padding medium-text rounded-10 medium-border"
                    type="text"
                    name="name"
                    id="name_input"
                    autoComplete="false"
                    required
                />
            </div>
            <div className="min-content">
                <label className="medium-text" htmlFor="secret_input">
                    {translate("login.request.secret", language)}
                </label>
                <input
                    className="input-padding medium-text rounded-10 medium-border"
                    type="password"
                    name="secret"
                    id="secret_input"
                    required
                />
            </div>
            <button
                className="input-padding pill margin-1 medium-text medium-border hover-darken"
                type="submit"
                aria-disabled={pending}
            >
                Login
            </button>
            <p role="status">{state?.message}</p>
        </form>
    );
}
