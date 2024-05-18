import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import { ScheduleWeek } from "../../components/ScheduleWeek";
import { useEffect, useState } from "react";
import { LanguageButton } from "../../components/LanguageButton";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
const daysHebrew = ["ראשון", "שני", "שלישי", "רביעי", "המשי"];

const exampleProjects = [
    {
        name: "Project 1",
        location: "Location",
        staff: ["Person 1", "Person 2", "Person 3", "Person 4"],
        types: ["Analytical"],
    },
    {
        name: "Project 2",
        location: "Location",
        staff: ["Person 1", "Person 2", "Person 3"],
        types: ["Analytical", "Creative"],
    },
    {
        name: "Project 3",
        location: "Location",
        staff: ["Person 1", "Person 2"],
        types: ["Analytical", "Engineering"],
    },
    {
        name: "Project 4",
        location: "Location",
        staff: ["Person 1", "Person 2"],
        types: ["Creative", "Engineering"],
    },
    {
        name: "Project 5",
        location: "Location",
        staff: ["Person 1", "Person 2"],
        types: ["Analytical", "Creative", "Engineering"],
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
    return (
        <div className={[styles.container, styles.blackScroll].join(" ")}>
            <Head>
                <title>{title}</title>
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
                <Link href="/" className={styles.weekTitle}>
                    Week {id}
                </Link>
                <LanguageButton language={language} setLanguage={setLanguage} />
                <div>
                    <ScheduleWeek
                        language={language}
                        days={language == "hebrew" ? daysHebrew : days}
                        projects={exampleProjects}
                    />
                </div>
            </main>
        </div>
    );
}
