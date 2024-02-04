import Link from "next/link";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { ScheduleDay } from "../components/ScheduleDay";

export default function Home() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
    return (
        <div className={styles.container}>
            <Head>
                <title>Hacker Schedule</title>
                <link rel="icon" href="/hacker_brain.png" />
            </Head>

            <main style={{ minHeight: "100vh" }}>
                <Link href="/form" className={styles.newProjectButton}>
                    <img src="/form_button.svg" />
                </Link>
                <div className={styles.week}>
                    {days.map((day) => (
                        <ScheduleDay
                            day={day}
                            projects={[
                                {
                                    name: "Project 1",
                                    location: "Location",
                                    staff: [
                                        "Person 1",
                                        "Person 2",
                                        "Person 3",
                                        "Person 4",
                                    ],
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
                                    types: [
                                        "Analytical",
                                        "Creative",
                                        "Engineering",
                                    ],
                                },
                            ]}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}
