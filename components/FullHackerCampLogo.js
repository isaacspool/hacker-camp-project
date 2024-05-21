import styles from "../styles/Form.module.css";

export function FullHackerCampLogo() {
    return (
        <div style={{ width: "65%", margin: "auto" }}>
            <img
                src="/logo/full_hacker_logo_hexagons.svg"
                width="100%"
                height="100%"
                className={styles.hexagonsLogo}
            />
            <img
                src="/logo/hacker_brain.png"
                width="28%"
                height="28%"
                className={styles.smallHackerBrain}
            />
        </div>
    );
}
