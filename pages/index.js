import Link from "next/link";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { ScheduleWeek } from "../components/ScheduleWeek";
import { useState } from "react";
import { LanguageButton } from "../components/LanguageButton";

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

export default function Home() {
    const [language, setLanguage] = useState("en");
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
                <Link href="/form" className={styles.newProjectButton}>
                    <img src="/form_button.svg" />
                </Link>
                <LanguageButton language={language} setLanguage={setLanguage} />
                <ScheduleWeek
                    days={language == "hebrew" ? daysHebrew : days}
                    projects={exampleProjects}
                />
            </main>
        </div>
    );
}
