import styles from "../styles/Home.module.css";
import { Project } from "./Project";

export function ScheduleDay({ day, projects }) {
    return (
        <div className={styles.day}>
            <h1>{day}</h1>
            <ul className={[styles.border, styles.projectList].join(" ")}>
                {projects.map((project) => (
                    <li key={project.id}>
                        <Project
                            name={project.name}
                            location={project.location}
                            staff={project.staff}
                            types={project.types}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
