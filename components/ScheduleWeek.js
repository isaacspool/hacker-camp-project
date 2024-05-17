import { ScheduleDay } from "../components/ScheduleDay";
import styles from "../styles/Home.module.css";

export function ScheduleWeek(props) {
    return (
        <div className={styles.week}>
            {props.days.map((day, i) => (
                <ScheduleDay
                    day={day}
                    originalProjects={props.projects}
                    satellites={["Satellite", "Satellite"]}
                    rundown={["Rundown", "Rundown"]}
                    language={props.language}
                    key={i}
                />
            ))}
        </div>
    );
}
