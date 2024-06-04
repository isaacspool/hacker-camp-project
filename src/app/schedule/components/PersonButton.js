"use client";

import styles from "@/styles/Home.module.css";
import { usePopupContext } from "./PopupProvider";

export default function PersonButton({ children, icon, canDelete, canEdit }) {
    const { displayValue, _ } = usePopupContext();
    return (
        <div
            className={[
                styles.thinBorder,
                styles.pill,
                styles.person,
                canEdit ? styles.personHoverable : "",
            ].join(" ")}
        >
            <img src={icon} width={canDelete ? 21 : 30} height={21} />
            <p style={{ margin: 0, color: "black" }}>
                {displayValue || children}
            </p>
        </div>
    );
}
