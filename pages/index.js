import Link from "next/link";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { LanguageButton } from "../components/LanguageButton";
import hebrewTranslation from "../public/lang/he-il.json";
import englishTranslation from "../public/lang/en-us.json";

export function translate(key, language) {
    return language === "he" ? hebrewTranslation[key] : englishTranslation[key];
}

export function isHebrew(language) {
    return language === "he";
}

export default function Home() {
    const [language, setLanguage] = useState("en");
    useEffect(() => {
        setLanguage(localStorage.getItem("language") || "en");
    }, []);
    return (
        <div className={styles.container}>
            <Head>
                <title>Hacker Schedule</title>
                <link rel="icon" href="/logo/hacker_brain.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossorigin
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Serif+Hebrew:wght@100..900&display=swap"
                    rel="document"
                />
            </Head>

            <main>
                <LanguageButton language={language} setLanguage={setLanguage} />
                <img
                    src="/logo/hacker_brain.png"
                    alt="logo"
                    className={styles.bigLogo}
                    width="92%"
                    height="92%"
                />

                <h1 className={styles.grandTitle}>Hacker Camp 2024</h1>
                <Link href="/form" className={styles.newProjectButton}>
                    <img src="/icons/form.svg" />
                </Link>
                <div className={styles.weekList}>
                    {[1, 2, 3, 4, 5, 6, 7].map((week) => {
                        let link = [translate("week", language), week];
                        if (isHebrew(language)) {
                            link = link.reverse();
                        }
                        return (
                            <Link
                                href={`/week/${week}`}
                                className={styles.weekButton}
                                key={week}
                            >
                                {link.join(" ")}
                            </Link>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
