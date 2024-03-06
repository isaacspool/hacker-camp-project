import styles from "../../styles/Form.module.css";

export function ProjectDescriptionPage({
    children,
    title,
    subtitle,
    value,
    setValue,
}) {
    let inputPart = (
        <div className={styles.descriptionPage}>
            <h1 style={{ fontSize: 40, textAlign: "center" }}>{title}</h1>
            <p style={{ fontSize: 24, textAlign: "center" }}>{subtitle}</p>
            <div className={styles.textBox}>
                <textarea
                    style={{
                        overflowY: "auto",
                        borderRadius: 30,
                        outline: "none",
                        border: "none",
                        backdropFilter: "none",
                        borderRadius: 0,
                        padding: 0,
                    }}
                    placeholder="..."
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    className={styles.textBox}
                />
            </div>
        </div>
    );
    if (children) {
        return (
            <div
                style={
                    window.innerWidth < window.innerHeight
                        ? {
                              display: "flex",
                              gap: "1%",
                              width: "100%",
                              height: "100%",
                              flexDirection: "column",
                          }
                        : {
                              display: "flex",
                              gap: "1%",
                              width: "100%",
                              height: "100%",
                          }
                }
            >
                {inputPart}
                {children}
            </div>
        );
    } else {
        return inputPart;
    }
}
