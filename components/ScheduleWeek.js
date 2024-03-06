import { ScheduleDay } from "../components/ScheduleDay";
import styles from "../styles/Home.module.css";

export function ScheduleWeek(props) {
    return (
        <div className={styles.week}>
            {props.days.map((day) => (
                <ScheduleDay
                    day={day}
                    projects={props.projects}
                    satellites={["Satellite 1", "Satellite 2"]}
                    rundown={["Rundown 1", "Rundown 2"]}
                />
            ))}
        </div>
    );
}
