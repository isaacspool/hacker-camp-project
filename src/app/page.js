import Link from "next/link";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { isHebrew, translate } from "@/lib/translation";
import HomeLink from "./schedule/components/HomeLink";

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
                {[...Array.from(Array(7).keys())]
                    .map((week) => week + 1)
                    .map((week) => {
                        return (
                            <HomeLink
                                url={`/schedule/?week=${week}&year=${new Date().getFullYear()}`}
                                week={week}
                                css={styles.weekButton}
                                hasHidden={false}
                                key={week}
                            />
                        );
                    })}
            </div>
        </div>
    );
}
