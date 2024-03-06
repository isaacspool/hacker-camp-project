import styles from "../styles/Home.module.css";
import { Person } from "./Person";

export function Project(props) {
    let colors = props.types.map((type) => {
        switch (type) {
            case "Analytical":
                return "rgba(220, 63, 63, 0.25)";
            case "Creative":
                return "rgba(43, 73, 231, 0.25)";
            case "Engineering":
                return "rgba(251, 170, 11, 0.25)";
        }
    });
    let background = "linear-gradient(180deg, ";
    switch (colors.length) {
        case 0:
            background = "white";
            break;
        case 1:
            background += colors[0] + " 0%, " + colors[0] + " 100%)";
            break;
        case 2:
            background += colors[0] + " 0%, " + colors[1] + " 100%)";
            break;
        case 3:
            background +=
                colors[0] +
                " 0%, " +
                colors[1] +
                " 50%, " +
                colors[2] +
                " 100%)";
            break;
    }
    return (
        <div
            className={[styles.border, styles.project].join(" ")}
            style={{
                background: background,
            }}
        >
            <h2 style={{ fontSize: 26 }}>{props.projectName}</h2>
            <div className={styles.projectBody}>
                <div className={styles.location}>
                    <img
                        src="/location_pin.svg"
                        alt="location"
                        width={30}
                        height={30}
                    />
                    <p style={{ fontSize: 24, margin: "1%" }}>
                        {props.location}
                    </p>
                </div>
                <ul className={styles.staffList}>
                    {props.staff.map((person) => (
                        <Person icon="/PersonIcon.svg">{person}</Person>
                    ))}
                </ul>
            </div>
        </div>
    );
}
