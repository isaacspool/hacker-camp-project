"use client";

import Link from "next/link";
import { translate, reverseIfHebrew } from "@/lib/translation";
import { useLanguageContext } from "@/components/LanguageProvider";
import { useYearContext } from "@/components/YearProvider";

export default function WeekLink({ url, week, css, hasHidden }) {
    const { language, _ } = useLanguageContext();
    const { year, __ } = useYearContext();
    let linkText = [translate("week", language), week];
    if (hasHidden) {
        linkText = [year, ...linkText];
    }
    linkText = reverseIfHebrew(linkText, language);
    const modifiedUrl = {
        ...url,
        query: {
            ...url.query,
            year,
        },
    };
    return (
        <>
            {hasHidden && (
                <div
                    className={[css, "hide-mobile"].join(" ")}
                    style={{
                        opacity: 0,
                        position: "relative",
                    }}
                >
                    {linkText.join(" ")}
                </div>
            )}
            <Link href={modifiedUrl} className={css}>
                {linkText.map((t) => (
                    <div key={t}>
                        <span>{t}</span>{" "}
                    </div>
                ))}
            </Link>
        </>
    );
}
