import styles from "../styles/Home.module.css";

export function Project({ name, location, staff, types }) {
    let colors = types.map((type) => {
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
            <h2 style={{ fontSize: 26 }}>{name}</h2>
            <div style={{ borderTop: "5px solid", padding: "1rem" }}>
                <div className={styles.location}>
                    <img
                        src="/location_pin.svg"
                        alt="location"
                        width={24}
                        height={24}
                    />
                    <p>{location}</p>
                </div>
                <ul className={styles.staffList}>
                    {staff.map((person) => (
                        <p
                            className={[styles.thinBorder, styles.pill].join(
                                " "
                            )}
                            style={{ padding: "10px 3rem", margin: "0.3rem" }}
                        >
                            {person}
                        </p>
                    ))}
                </ul>
            </div>
        </div>
    );
}
