import styles from "../styles/Home.module.css";
import { Project } from "./Project";
import { Person } from "./Person";

export function ScheduleDay({ day, projects, satellites, rundown }) {
    return (
        <div className={styles.day}>
            <h1>{day}</h1>
            <div className={styles.detailsList}>
                {satellites.map((satellite) => (
                    <Person icon="/SatelliteIcon.svg">{satellite}</Person>
                ))}
                {rundown.map((rundownPerson) => (
                    <Person icon="/RundownIcon.svg">{rundownPerson}</Person>
                ))}
            </div>
            <div className={[styles.border, styles.projectList].join(" ")}>
                {projects.map((project) => (
                    <Project
                        projectName={project.name}
                        location={project.location}
                        staff={project.staff}
                        types={project.types}
                    />
                ))}
            </div>
        </div>
    );
}
