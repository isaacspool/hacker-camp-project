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
            <Link href={url + `year=${year}`} className={css}>
                {linkText.map((t) => (
                    <div key={t}>
                        <span>{t}</span>{" "}
                    </div>
                ))}
            </Link>
        </>
    );
}
