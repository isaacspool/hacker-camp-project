"use client";

import { usePopupContext } from "./PopupProvider";

export default function PersonButton({ children, icon, canDelete, canEdit }) {
    const { displayValue, _ } = usePopupContext();
    return (
        <div
            className={`flex grow center-all small-text medium-gap-px medium-border pill ${
                canEdit ? "hover-darken" : ""
            }`}
            style={{
                padding: "0.65rem 2.5rem",
                margin: "0.3rem",
            }}
        >
            <img src={icon} width={canDelete ? 21 : 30} height={21} />
            <p>{displayValue || children}</p>
        </div>
    );
}
