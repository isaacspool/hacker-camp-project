import Link from "next/link";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Hacker Schedule</title>
                <link rel="icon" href="/hacker_brain.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossorigin
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Serif+Hebrew:wght@100..900&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <main>
                {/* <LanguageButton language={language} setLanguage={setLanguage} /> */}
                <img
                    src="/hacker_brain.png"
                    alt="logo"
                    className={styles.bigLogo}
                    width="92%"
                    height="92%"
                />

                <h1 className={styles.grandTitle}>Hacker Camp 2024</h1>
                <Link href="/form" className={styles.newProjectButton}>
                    <img src="/form_button.svg" />
                </Link>
                <div className={styles.weekList}>
                    {[1, 2, 3, 4, 5, 6, 7].map((week) => (
                        <Link
                            href={`/week/${week}`}
                            className={styles.weekButton}
                            key={week}
                        >
                            Week {week}
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
