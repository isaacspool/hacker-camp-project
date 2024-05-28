"use client";

import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { translate, isHebrew } from "@/lib/translation";
import { useParams } from "next/navigation";
import { useLanguageContext } from "@/components/LanguageProvider";

export default function HomeLink({ url, week, css, hasHidden }) {
    const language = useLanguageContext();
    let linkText = [translate("week", language), week];
    if (isHebrew(language)) {
        linkText = linkText.reverse();
    }
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
            <Link href={url} className={css}>
                {linkText.join(" ")}
            </Link>
        </>
    );
}
