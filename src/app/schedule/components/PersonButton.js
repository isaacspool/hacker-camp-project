"use client";

import Image from "next/image";
import { usePopupContext } from "./popup/PopupProvider";

export default function PersonButton({ children, icon, canDelete, canEdit }) {
    const { displayValue, _ } = usePopupContext();
    return (
        <div
            className={`flex grow center-all small-text big-gap-px medium-border pill ${
                canEdit ? "hover-darken" : ""
            }`}
            style={{
                padding: "0.65rem 2.5rem",
                margin: "0.3rem",
            }}
        >
            <div
                className="flex center"
                style={canDelete ? { minHeight: 21 } : { minHeight: 30 }}
            >
                <Image
                    src={icon}
                    width={canDelete ? 21 : 30}
                    height={canDelete ? 21 : 30}
                    alt="person icon"
                />
            </div>
            <p>{displayValue || children}</p>
        </div>
    );
}
