"use client";

import { useLanguageContext } from "@/components/LanguageProvider";
import { translate } from "@/lib/translation";
import styles from "@/styles/Home.module.css";

export default function DayTitle({ dayKey }) {
    const language = useLanguageContext();
    return <h1 className={styles.dayTitle}>{translate(dayKey, language)}</h1>;
}
