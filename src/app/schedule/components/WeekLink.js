"use client";

import Link from "next/link";
import { translate, isHebrew } from "@/lib/translation";
import { useLanguageContext } from "@/components/LanguageProvider";
import { useYearContext } from "@/components/YearProvider";
import styles from "@/styles/Home.module.css";

export default function WeekLink({ url, week, css, hasHidden }) {
    const language = useLanguageContext();
    const { year, _ } = useYearContext();
    let linkText = [translate("week", language), week];
    if (hasHidden) {
        linkText = [year, ...linkText];
    }
    if (isHebrew(language)) {
        linkText = linkText.reverse();
    }
    return (
        <>
            {hasHidden && (
                <div
                    className={[css, styles.hideOnMobile].join(" ")}
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
