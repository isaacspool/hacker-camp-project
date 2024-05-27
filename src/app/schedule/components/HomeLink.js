"use client";

import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { translate, isHebrew } from "@/lib/translation";
import { useParams } from "next/navigation";
import { useLanguageContext } from "@/components/LanguageProvider";

export default function HomeLink() {
    const language = useLanguageContext();

    const params = useParams();
    const id = params.id;
    let linkText = [translate("week", language), id];
    if (isHebrew(language)) {
        linkText = linkText.reverse();
    }
    return (
        <>
            <div
                className={styles.weekTitle}
                style={{ opacity: 0, position: "relative" }}
            >
                {linkText.join(" ")}
            </div>
            <Link href="/" className={styles.weekTitle}>
                {linkText.join(" ")}
            </Link>
        </>
    );
}
