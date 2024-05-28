"use client";

import { useLanguageContext } from "@/components/LanguageProvider";
import { translate } from "@/lib/translation";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

export default function DayTitle({ dayKey, dayInfo, presentationMode }) {
    const language = useLanguageContext();
    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1 className={styles.dayTitle}>{translate(dayKey, language)}</h1>
            {!presentationMode && (
                <Link
                    href={`/schedule/?week=${dayInfo.week}&year=${dayInfo.year}&day=${dayInfo.day}`}
                    target="_blank"
                    style={{ display: "flex", alignItems: "center" }}
                >
                    <img src="/icons/new_window.svg" height="30" width="30" />
                </Link>
            )}
        </div>
    );
}
