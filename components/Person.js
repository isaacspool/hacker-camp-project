import styles from "../styles/Home.module.css";

export function Person({ children, icon }) {
    // Usage: <Person>text here</Person>
    // children is used because the text is passed as a child of the component

    return (
        <div
            className={[styles.thinBorder, styles.pill, styles.person].join(
                " "
            )}
        >
            <img src={icon} width={23} height={23} />
            <p style={{ margin: 0 }}>{children}</p>
        </div>
    );
}
