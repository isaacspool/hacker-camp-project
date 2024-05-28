"use client";

import Link from "next/link";
import { translate, isHebrew } from "@/lib/translation";
import { useLanguageContext } from "@/components/LanguageProvider";
import { useYearContext } from "@/components/YearProvider";

export default function HomeLink({ url, week, css, hasHidden }) {
    const language = useLanguageContext();
    let linkText = [translate("week", language), week];
    if (isHebrew(language)) {
        linkText = linkText.reverse();
    }
    const { year, _ } = useYearContext();
    return (
        <>
            {hasHidden && (
                <div
                    className={css}
                    style={{ opacity: 0, position: "relative" }}
                >
                    {linkText.join(" ")}
                </div>
            )}
            <Link href={url + `year=${year}`} className={css}>
                {linkText.join(" ")}
            </Link>
        </>
    );
}
