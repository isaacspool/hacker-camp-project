import { ScheduleDay } from "../components/ScheduleDay";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { translate } from "../pages/index.js";

export function ScheduleWeek({ projects, language }) {
    const [editingProject, setEditingProject] = useState(null);
    const days = [
        translate("day.sunday", language),
        translate("day.monday", language),
        translate("day.tuesday", language),
        translate("day.wednesday", language),
        translate("day.thursday", language),
    ];
    return (
        <div className={styles.week} id="week">
            {days.map((day, i) => (
                <ScheduleDay
                    day={day}
                    index={i}
                    originalProjects={JSON.parse(JSON.stringify(projects))}
                    satellites={["Satellite", "Satellite"]}
                    rundown={["Rundown", "Rundown"]}
                    language={language}
                    editingProject={editingProject}
                    setEditingProject={setEditingProject}
                    key={i}
                />
            ))}
        </div>
    );
}
