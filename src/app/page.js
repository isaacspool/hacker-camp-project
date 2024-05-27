import Link from "next/link";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { isHebrew, translate } from "@/lib/translation";

export default function Home() {
    return (
        <div className={styles.container}>
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
                {[...Array.from(Array(7).keys())].map((week) => {
                    let link = [translate("week", language), week];
                    if (isHebrew(language)) {
                        link = link.reverse();
                    }
                    return (
                        <Link
                            href={`/schedule/?week=${week}&year={year}`}
                            className={styles.weekButton}
                            key={week}
                        >
                            {link.join(" ")}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
