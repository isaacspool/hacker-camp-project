import styles from "../styles/Project.module.css";

export function ProjectInformation({ children, title }) {
    return (
        <div
            className={styles.projectInfo}
            style={children ? {} : { alignContent: "center" }}
        >
            {title && (
                <div
                    className={styles.titleContainer}
                    style={children ? {} : { border: "none" }}
                >
                    <h1 className={styles.infoTitle}>{title}</h1>
                </div>
            )}
            {children && (
                <div style={{ padding: "5%", height: "100%" }}>{children}</div>
            )}
        </div>
    );
}
