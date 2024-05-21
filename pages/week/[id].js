import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import { ScheduleWeek } from "../../components/ScheduleWeek";
import { useEffect, useState } from "react";
import { LanguageButton } from "../../components/LanguageButton";
import { translate, isHebrew } from "../index.js";

const exampleProjects = [
    {
        id: 5,
        location: "Location",
        staff: ["Person 1", "Person 2", "Person 3", "Person 4"],
    },
    {
        id: 6,
        location: "Location",
        staff: ["Person 1", "Person 2", "Person 3"],
    },
    {
        id: 7,
        location: "Location",
        staff: ["Person 1", "Person 2"],
    },
    {
        id: 8,
        location: "Location",
        staff: ["Person 1", "Person 2"],
    },
    {
        id: 9,
        location: "Location",
        staff: ["Person 1", "Person 2"],
    },
];

const staff = [
    "Alex",
    "AmTal",
    "Ariel",
    "Hadaria",
    "Isaac",
    "Matan",
    "Maya",
    "Daniel",
    "Rafi",
    "Ranon",
    "Sapir",
    "Shai",
    "Shaiel",
    "Shayna",
    "Yehoshua",
    "Zev",
    "Option 42",
];

export default function SchedulePage() {
    const [language, setLanguage] = useState("en");
    useEffect(() => {
        setLanguage(localStorage.getItem("language") || "en");
    }, []);
    const router = useRouter();
    const { id } = router.query;
    const title = `Hacker Schedule - Week ${id}`;
    // run on first render
    // useEffect(() => {
    //     const day = new Date().getDay();
    //     if (day <= 4) {
    //         // During the week
    //         // scrollLeft until the current day
    //         const vmax = Math.max(window.innerWidth, window.innerHeight);
    //         const gap = vmax * 0.02;

    //         const dayElement = document.getElementById("day_" + day);
    //         const dayX = dayElement.getBoundingClientRect().x;
    //         const htmlElement = document.querySelector("html");
    //         htmlElement.scrollLeft = dayX - gap;
    //     }
    // }, []);
    let weeksLink = [translate("week", language), id];
    if (isHebrew(language)) {
        weeksLink = weeksLink.reverse();
    }
    return (
        <div className={[styles.container, styles.blackScroll].join(" ")}>
            <Head>
                <title>{title}</title>
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
                <Link href="/" className={styles.weekTitle}>
                    {weeksLink.join(" ")}
                </Link>
                <LanguageButton language={language} setLanguage={setLanguage} />
                <div>
                    <ScheduleWeek
                        language={language}
                        projects={exampleProjects}
                    />
                </div>
            </main>
        </div>
    );
}
