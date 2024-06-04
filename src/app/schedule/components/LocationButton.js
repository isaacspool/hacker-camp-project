"use client";

import styles from "@/styles/Home.module.css";
import { usePopupContext } from "./PopupProvider";

export default function LocationButton({ children, presentationMode }) {
    const { displayValue, _ } = usePopupContext();
    return (
        <div
            className={[
                styles.location,
                presentationMode ? "" : styles.locationInteractive,
            ].join(" ")}
        >
            <img
                src="/icons/location.svg"
                alt="location"
                width={30}
                height={30}
                className={presentationMode ? "" : styles.locationButton}
            />
            <p style={{ fontSize: 24, margin: "1%" }}>
                {displayValue || children || "The Void"}
            </p>
        </div>
    );
}
